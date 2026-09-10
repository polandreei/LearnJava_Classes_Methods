/* Engine: boots CheerpJ, drives the Java harness, and runs source-level checks.
 *
 * Everything here happens in the learner's browser. There is no server: the JVM,
 * the compiler (ECJ) and the checker (Harness.jar) are all fetched as static
 * files and executed client-side by CheerpJ.
 */
const Engine = (() => {

  const CHEERPJ = "https://cjrtnc.leaningtech.com/4.3/loader.js";
  const CLASSPATH = "/app/lib/ecj-3.26.0.jar:/app/lib/harness.jar";

  let LIB = null, HARNESS = null, booted = false, bootPromise = null;

  /* Java base64-encodes UTF-8 bytes; atob yields a byte string, so decode
     properly or every em dash in the course output turns into mojibake. */
  function b64utf8(s) {
    if (!s) return "";
    try {
      const bin = atob(s);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder("utf-8").decode(bytes);
    } catch (e) { return ""; }
  }

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = () => rej(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  async function boot(onProgress) {
    if (booted) return;
    if (bootPromise) return bootPromise;
    bootPromise = (async () => {
      const p = onProgress || (() => {});
      p("Downloading the Java runtime…");
      await loadScript(CHEERPJ);
      p("Starting the JVM…");
      await cheerpjInit();
      p("Loading the compiler…");
      LIB = await cheerpjRunLibrary(CLASSPATH);
      HARNESS = await LIB.Harness;
      if (!HARNESS) throw new Error("Harness class not found on the classpath.");
      booted = true;
      p("Ready");
    })();
    return bootPromise;
  }

  /* ---------------------------------------------------------------- run */
  async function submit(exercise, fileContents) {
    if (!booted) throw new Error("Engine not booted");

    // /str/ is flat: cheerpjAddStringFile will not create directories, and Java
    // requires the filename to match the public class anyway.
    const srcPaths = [];
    for (const f of exercise.files) {
      const path = "/str/" + f.name;
      await cheerpjAddStringFile(path, fileContents[f.name]);
      srcPaths.push(path);
    }

    // Fresh output dir per attempt so stale .class files from a previous
    // exercise can never be picked up by the class loader.
    const outdir = "/files/run" + Date.now() + "_" + Math.floor(Math.random() * 1e6);

    const spec = [
      "outdir=" + outdir,
      "main=" + (exercise.main || ""),
      "src=" + srcPaths.join("|")
    ].concat(
      (exercise.checks || []).map(c =>
        "check=" + c.id + "::" + c.type + "::" + c.args.join("::"))
    ).join("\n");

    const raw = await HARNESS.run(spec);
    return parseReport(raw, exercise, fileContents);
  }

  function parseReport(raw, exercise, fileContents) {
    const out = { compiled: false, diagnostics: "", stdout: "", runError: "", checks: [], fatal: "" };
    for (const line of String(raw).split("\n")) {
      if (!line) continue;
      const parts = line.split("|");
      switch (parts[0]) {
        case "COMPILE": out.compiled = parts[1] === "1"; break;
        case "DIAG":    out.diagnostics = b64utf8(parts[1]); break;
        case "STDOUT":  out.stdout = b64utf8(parts[1]); break;
        case "RUNERR":  out.runError = b64utf8(parts[1]); break;
        case "FATAL":   out.fatal = b64utf8(parts[1]); break;
        case "CHECK": {
          const def = (exercise.checks || []).find(c => c.id === parts[1]);
          out.checks.push({
            id: parts[1],
            label: def ? def.label : parts[1],
            pass: parts[2] === "PASS",
            detail: b64utf8(parts[3])
          });
          break;
        }
      }
    }
    if (out.compiled) {
      for (const sc of (exercise.sourceChecks || [])) {
        out.checks.push(runSourceCheck(sc, fileContents[sc.file] || ""));
      }
    }
    return out;
  }

  /* ------------------------------------------------------- source checks */
  /* Some requirements vanish at compile time. Section 8's whole point is that
     three constructors delegate with this(...) -- the bytecode runs the same
     either way and the printed output is byte-identical, so only the source
     can answer it. */

  function stripCommentsAndStrings(src) {
    let out = "", i = 0, n = src.length;
    while (i < n) {
      const c = src[i], d = src[i + 1];
      if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; }
      else if (c === "/" && d === "*") { i += 2; while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++; i += 2; }
      else if (c === '"' || c === "'") {
        const q = c; out += " "; i++;
        while (i < n && src[i] !== q) { if (src[i] === "\\") i++; i++; }
        i++;
      } else { out += c; i++; }
    }
    return out;
  }

  function matchBrace(s, openIdx) {
    let depth = 0;
    for (let i = openIdx; i < s.length; i++) {
      if (s[i] === "{") depth++;
      else if (s[i] === "}") { depth--; if (depth === 0) return s.slice(openIdx + 1, i); }
    }
    return "";
  }

  function constructorsOf(src, cls) {
    const clean = stripCommentsAndStrings(src);
    const re = new RegExp("(^|[;{}\\s])(?:public\\s+|private\\s+|protected\\s+)?" + cls + "\\s*\\(([^)]*)\\)\\s*\\{", "g");
    const found = [];
    let m;
    while ((m = re.exec(clean)) !== null) {
      const before = clean.slice(Math.max(0, m.index - 10), m.index + m[1].length);
      if (/\bnew\s*$/.test(before)) continue;            // `new Pizza(...)`
      const openIdx = clean.indexOf("{", m.index + m[0].length - 1);
      found.push({ params: m[2].trim(), body: matchBrace(clean, openIdx) });
    }
    return found;
  }

  function firstStatement(body) {
    const t = body.trim();
    const semi = t.indexOf(";");
    return semi < 0 ? t : t.slice(0, semi + 1).trim();
  }

  function runSourceCheck(sc, src) {
    const res = { id: sc.id, label: sc.label, pass: false, detail: "", source: true };
    try {
      if (sc.kind === "ctorChainCount") {
        const ctors = constructorsOf(src, sc.cls);
        const chained = ctors.filter(c => /^this\s*\(/.test(firstStatement(c.body)));
        res.pass = chained.length === sc.count;
        res.detail = res.pass
          ? chained.length + " of " + ctors.length + " constructors delegate with this(...)."
          : "Found " + chained.length + " constructor(s) delegating with this(...), expected "
            + sc.count + " (of " + ctors.length + " constructors). " + sc.fail;
      } else if (sc.kind === "ctorChainFirstStatement") {
        const ctors = constructorsOf(src, sc.cls);
        const offenders = ctors.filter(c => {
          const body = c.body.trim();
          return /\bthis\s*\(/.test(body) && !/^this\s*\(/.test(firstStatement(body));
        });
        res.pass = offenders.length === 0;
        res.detail = res.pass ? "Every this(...) call is the first statement."
                              : offenders.length + " constructor(s) put a statement before this(...). " + sc.fail;
      } else if (sc.kind === "clampOnce") {
        const ctors = constructorsOf(src, "Pizza");
        const withLogic = ctors.filter(c => /\bif\b/.test(c.body));
        res.pass = withLogic.length === 1;
        res.detail = res.pass
          ? "Only one constructor contains real logic."
          : withLogic.length + " constructors contain an if. " + sc.fail;
      } else if (sc.kind === "maxMatches") {
        const clean = stripCommentsAndStrings(src);
        const hits = (clean.match(new RegExp(sc.pattern, "g")) || []).length;
        res.pass = hits <= sc.max;
        res.detail = res.pass ? "Found " + hits + " (limit " + sc.max + ")."
                              : "Found " + hits + ", expected at most " + sc.max + ". " + sc.fail;
      } else if (sc.kind === "mustMatch") {
        const clean = stripCommentsAndStrings(src);
        res.pass = new RegExp(sc.pattern).test(clean);
        res.detail = res.pass ? "Found." : sc.fail;
      } else {
        res.detail = "Unknown source check '" + sc.kind + "'.";
      }
    } catch (e) {
      res.detail = "Source check error: " + (e && e.message);
    }
    return res;
  }

  /* ------------------------------------------------------------- output */
  function normalise(s) {
    return String(s == null ? "" : s)
      .replace(/\r\n/g, "\n")
      .split("\n").map(l => l.replace(/[ \t]+$/g, "")).join("\n")
      .replace(/\n+$/, "");
  }

  function diffOutput(actual, expected) {
    const a = normalise(actual).split("\n");
    const e = normalise(expected).split("\n");
    const rows = [];
    for (let i = 0; i < Math.max(a.length, e.length); i++) {
      rows.push({ line: i + 1, actual: a[i], expected: e[i], ok: a[i] === e[i] });
    }
    return { match: normalise(actual) === normalise(expected), rows };
  }

  return { boot, submit, diffOutput, normalise, isReady: () => booted,
           _internal: { constructorsOf, stripCommentsAndStrings, firstStatement, runSourceCheck } };
})();

if (typeof module !== "undefined") module.exports = { Engine };
