import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.eclipse.jdt.core.compiler.batch.BatchCompiler;

/**
 * Compiles, runs and structurally inspects a learner's Java submission.
 *
 * Lives entirely inside the browser: it is itself compiled by ECJ at page load,
 * then invoked through a single CheerpJ bridge call per attempt. Keeping the
 * work on this side of the bridge matters -- doing the same reflection from
 * JavaScript costs hundreds of async round trips per check.
 *
 * Protocol is deliberately line-based and base64-armoured so that arbitrary
 * learner output (newlines, pipes, unicode) can never corrupt the report.
 *
 *   spec  in : "outdir=..\nmain=..\nsrc=a|b\ncheck=id::type::arg::arg"
 *   report out: "COMPILE|0|1\nDIAG|<b64>\nSTDOUT|<b64>\nCHECK|id|PASS|<b64>"
 */
public class Harness {

    public static String run(String spec) {
        StringBuilder report = new StringBuilder();
        try {
            String outdir = null, mainClass = null;
            List<String> sources = new ArrayList<String>();
            List<String[]> checks = new ArrayList<String[]>();

            for (String raw : spec.split("\n")) {
                String line = raw.trim();
                if (line.length() == 0) continue;
                int eq = line.indexOf('=');
                if (eq < 0) continue;
                String key = line.substring(0, eq);
                String val = line.substring(eq + 1);
                if (key.equals("outdir")) outdir = val;
                else if (key.equals("main")) mainClass = val;
                else if (key.equals("src")) {
                    for (String s : val.split("\\|")) if (s.length() > 0) sources.add(s);
                } else if (key.equals("check")) {
                    checks.add(val.split("::", -1));
                }
            }

            // ---- compile -------------------------------------------------
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            StringBuilder cmd = new StringBuilder("-8 -nowarn -proc:none -d ");
            cmd.append(outdir);
            for (String s : sources) cmd.append(' ').append(s);

            boolean compiled = BatchCompiler.compile(cmd.toString(), pw, pw, null);
            pw.flush();
            report.append("COMPILE|").append(compiled ? "1" : "0").append('\n');
            report.append("DIAG|").append(b64(cleanDiagnostics(sw.toString()))).append('\n');

            if (!compiled) return report.toString();

            // ---- load ----------------------------------------------------
            File dir = new File(outdir);
            URLClassLoader loader = URLClassLoader.newInstance(
                    new URL[]{ dir.toURI().toURL() },
                    Harness.class.getClassLoader());

            // ---- run -----------------------------------------------------
            if (mainClass != null && mainClass.length() > 0) {
                ByteArrayOutputStream buf = new ByteArrayOutputStream();
                PrintStream cap = new PrintStream(buf, true, "UTF-8");
                PrintStream oldOut = System.out;
                PrintStream oldErr = System.err;
                String runtimeError = "";
                try {
                    System.setOut(cap);
                    System.setErr(cap);
                    Class<?> mc = loader.loadClass(mainClass);
                    Method m = mc.getMethod("main", String[].class);
                    m.invoke(null, (Object) new String[0]);
                } catch (InvocationTargetException ite) {
                    Throwable cause = ite.getCause() == null ? ite : ite.getCause();
                    runtimeError = describeThrowable(cause);
                } catch (Throwable t) {
                    runtimeError = describeThrowable(t);
                } finally {
                    cap.flush();
                    System.setOut(oldOut);
                    System.setErr(oldErr);
                }
                report.append("STDOUT|").append(b64(buf.toString("UTF-8"))).append('\n');
                report.append("RUNERR|").append(b64(runtimeError)).append('\n');
            }

            // ---- structural checks --------------------------------------
            for (String[] c : checks) {
                String id = c.length > 0 ? c[0] : "?";
                String type = c.length > 1 ? c[1] : "";
                String[] a = new String[Math.max(0, c.length - 2)];
                for (int i = 2; i < c.length; i++) a[i - 2] = c[i];
                String verdict;
                try {
                    verdict = check(loader, type, a);
                } catch (ClassNotFoundException cnf) {
                    verdict = "FAIL|Class " + cnf.getMessage() + " was not found.";
                } catch (NoSuchFieldException nsf) {
                    verdict = "FAIL|No field named '" + nsf.getMessage() + "'.";
                } catch (Throwable t) {
                    verdict = "FAIL|" + describeThrowable(t);
                }
                int bar = verdict.indexOf('|');
                String status = bar < 0 ? verdict : verdict.substring(0, bar);
                String msg = bar < 0 ? "" : verdict.substring(bar + 1);
                report.append("CHECK|").append(id).append('|').append(status)
                      .append('|').append(b64(msg)).append('\n');
            }
        } catch (Throwable fatal) {
            report.append("FATAL|").append(b64(describeThrowable(fatal))).append('\n');
        }
        return report.toString();
    }

    // -----------------------------------------------------------------
    private static String check(ClassLoader cl, String type, String[] a) throws Exception {
        if (type.equals("classExists")) {
            cl.loadClass(a[0]);
            return "PASS|Class " + a[0] + " exists.";
        }
        if (type.equals("fieldPrivate")) {
            Field f = cl.loadClass(a[0]).getDeclaredField(a[1]);
            return Modifier.isPrivate(f.getModifiers())
                    ? "PASS|" + a[1] + " is private."
                    : "FAIL|" + a[1] + " is declared " + visibility(f.getModifiers())
                      + ", but it must be private so nothing outside " + a[0] + " can change it.";
        }
        if (type.equals("fieldType")) {
            Field f = cl.loadClass(a[0]).getDeclaredField(a[1]);
            String actual = pretty(f.getType());
            return actual.equals(a[2])
                    ? "PASS|" + a[1] + " is " + a[2] + "."
                    : "FAIL|" + a[1] + " is " + actual + ", expected " + a[2] + ".";
        }
        if (type.equals("fieldStatic")) {
            Field f = cl.loadClass(a[0]).getDeclaredField(a[1]);
            return Modifier.isStatic(f.getModifiers())
                    ? "PASS|" + a[1] + " is static."
                    : "FAIL|" + a[1] + " is not static. It needs to belong to the class, "
                      + "not to each object, or every object gets its own copy.";
        }
        if (type.equals("fieldNotStatic")) {
            Field f = cl.loadClass(a[0]).getDeclaredField(a[1]);
            return !Modifier.isStatic(f.getModifiers())
                    ? "PASS|" + a[1] + " is an instance field."
                    : "FAIL|" + a[1] + " is static, so every object shares one copy. "
                      + "That defeats the point of per-object state.";
        }
        if (type.equals("methodExists")) {
            Class<?> c = cl.loadClass(a[0]);
            for (Method m : c.getDeclaredMethods()) if (m.getName().equals(a[1]))
                return "PASS|" + a[1] + "() exists.";
            return "FAIL|No method named " + a[1] + "() in " + a[0] + ".";
        }
        if (type.equals("methodReturns")) {
            Class<?> c = cl.loadClass(a[0]);
            for (Method m : c.getDeclaredMethods()) if (m.getName().equals(a[1])) {
                String actual = pretty(m.getReturnType());
                return actual.equals(a[2])
                        ? "PASS|" + a[1] + "() returns " + a[2] + "."
                        : "FAIL|" + a[1] + "() returns " + actual + ", expected " + a[2] + ".";
            }
            return "FAIL|No method named " + a[1] + "() in " + a[0] + ".";
        }
        if (type.equals("methodStatic")) {
            Class<?> c = cl.loadClass(a[0]);
            for (Method m : c.getDeclaredMethods()) if (m.getName().equals(a[1]))
                return Modifier.isStatic(m.getModifiers())
                        ? "PASS|" + a[1] + "() is static."
                        : "FAIL|" + a[1] + "() is not static, so it cannot be called as "
                          + a[0] + "." + a[1] + "().";
            return "FAIL|No method named " + a[1] + "() in " + a[0] + ".";
        }
        if (type.equals("overloadCount")) {
            Class<?> c = cl.loadClass(a[0]);
            int n = 0;
            List<String> sigs = new ArrayList<String>();
            for (Method m : c.getDeclaredMethods()) if (m.getName().equals(a[1])) {
                n++; sigs.add(signature(m.getParameterTypes()));
            }
            int want = Integer.parseInt(a[2]);
            if (n == want) return "PASS|" + n + " overloads of " + a[1] + "(): " + join(sigs) + ".";
            return "FAIL|Found " + n + " version(s) of " + a[1] + "(), expected " + want
                    + (n > 0 ? ". Found: " + join(sigs) : "") + ".";
        }
        if (type.equals("methodNotExists")) {
            Class<?> c = cl.loadClass(a[0]);
            for (Method m : c.getDeclaredMethods()) if (m.getName().equals(a[1]))
                return "FAIL|" + a[1] + "() should NOT exist. " + (a.length > 2 ? a[2] : "");
            return "PASS|" + a[1] + "() correctly absent.";
        }
        if (type.equals("ctorCount")) {
            Class<?> c = cl.loadClass(a[0]);
            Constructor<?>[] cs = c.getDeclaredConstructors();
            int want = Integer.parseInt(a[1]);
            if (cs.length == want) return "PASS|" + want + " constructors.";
            List<String> sigs = new ArrayList<String>();
            for (Constructor<?> k : cs) sigs.add(signature(k.getParameterTypes()));
            return "FAIL|Found " + cs.length + " constructor(s), expected " + want
                    + ". Found: " + join(sigs) + ".";
        }
        if (type.equals("ctorParams")) {
            Class<?> c = cl.loadClass(a[0]);
            String want = a[1];
            for (Constructor<?> k : c.getDeclaredConstructors())
                if (signature(k.getParameterTypes()).equals(want))
                    return "PASS|Constructor (" + want + ") exists.";
            return "FAIL|No constructor taking (" + want + ").";
        }
        if (type.equals("fieldCount")) {
            Class<?> c = cl.loadClass(a[0]);
            int want = Integer.parseInt(a[1]);
            int n = c.getDeclaredFields().length;
            return n == want ? "PASS|" + want + " fields."
                    : "FAIL|Found " + n + " fields, expected " + want + ".";
        }
        return "FAIL|Unknown check type '" + type + "'.";
    }

    // -----------------------------------------------------------------
    private static String visibility(int m) {
        if (Modifier.isPublic(m)) return "public";
        if (Modifier.isProtected(m)) return "protected";
        if (Modifier.isPrivate(m)) return "private";
        return "package-private (no modifier)";
    }

    private static String pretty(Class<?> c) {
        if (c.isArray()) return pretty(c.getComponentType()) + "[]";
        String n = c.getName();
        return n.startsWith("java.lang.") ? n.substring(10) : n;
    }

    private static String signature(Class<?>[] ps) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ps.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(pretty(ps[i]));
        }
        return sb.toString();
    }

    private static String join(List<String> xs) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < xs.size(); i++) {
            if (i > 0) sb.append("; ");
            sb.append('(').append(xs.get(i)).append(')');
        }
        return sb.toString();
    }

    private static String describeThrowable(Throwable t) {
        StringBuilder sb = new StringBuilder();
        sb.append(pretty(t.getClass()));
        if (t.getMessage() != null) sb.append(": ").append(t.getMessage());
        StackTraceElement[] st = t.getStackTrace();
        for (int i = 0; i < st.length && i < 4; i++) {
            String cn = st[i].getClassName();
            if (cn.startsWith("java.") || cn.startsWith("sun.") || cn.equals("Harness")) continue;
            sb.append("\n    at ").append(cn).append('.').append(st[i].getMethodName())
              .append(" (line ").append(st[i].getLineNumber()).append(')');
        }
        return sb.toString();
    }

    /** Strips the /str/ scratch paths so learners see their own filenames. */
    private static String cleanDiagnostics(String s) {
        return s.replaceAll("/str/[A-Za-z0-9_]+/", "").replaceAll("/str/", "");
    }

    private static String b64(String s) {
        try {
            return Base64.getEncoder().encodeToString(s.getBytes("UTF-8"));
        } catch (Exception e) {
            return "";
        }
    }
}
