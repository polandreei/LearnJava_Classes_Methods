# The interactive trainer

A browser IDE that compiles, runs and **structurally checks** your answers to the
eleven exercises in [the course](../java_classes_methods_course.md).

**Live:** https://polandreei.github.io/LearnJava_Classes_Methods/

There is no backend. A real JVM and a real Java compiler are downloaded as static
files and executed inside your browser, so your code never leaves your machine and
the site costs nothing to run.

## How it fits together

| Piece | What it does |
| --- | --- |
| [CheerpJ 4.3](https://cheerpj.com) | A JVM compiled to WebAssembly. Provides the Java 8 runtime. |
| `lib/ecj-3.26.0.jar` | The Eclipse Compiler for Java — a compiler written *in* Java, so it runs on that JVM. This is what produces the error messages you see. |
| `java/Harness.java` → `lib/harness.jar` | Compiles your files, runs `main` with stdout captured, then inspects the compiled classes by reflection. |
| `js/engine.js` | Boots the above, and runs the source-level checks. |
| `js/exercises.js` | The eleven exercises: starter code, expected output, checks, hints. |
| `js/solutions.js` | Reference solutions. Every one was compiled and run before shipping. |

## Why the checks are not just output comparison

Several exercises are about *structure*, and structure is invisible in output.

Section 8 is the clearest case. Its brief says the refactored `Pizza` must behave
identically to Section 7 — so pasting your Section 7 answer produces **byte-identical
output** while missing the entire point of the section. Output matching would award
full marks for it.

So the trainer checks two things the output cannot show:

- **Reflection checks** run inside the JVM against your compiled classes: field
  modifiers (`private`, `static`), method return types, overload counts, constructor
  counts. 56 of these across the eleven exercises.
- **Source checks** run over your source text for properties that compile away
  entirely — above all, whether a constructor's first statement is `this(...)`.
  9 of these; they are tagged `SOURCE` in the Checks panel.

## Rebuilding the harness

`lib/harness.jar` is a build artifact of `java/Harness.java`. If you change the Java:

```bash
cd docs && ./build-harness.sh
```

It must be compiled to **Java 8 bytecode** — CheerpJ's runtime reports
`1.8.0_492`, and newer class files will not load. The build script already passes
`-source 8 -target 8`.

## Known limitations

- **An infinite loop will hang the tab.** Learner code runs on the page's own thread
  and there is no timeout; reload the page if your program never finishes.
- **Compiler wording differs slightly from `javac`.** ECJ says *"This method must
  return a result of type String"* where `javac` says *"missing return statement"*.
  The meaning is identical, but Appendix B of the course quotes the `javac` phrasing.
- **First load fetches several megabytes** of JVM runtime. It is cached afterwards.
- Requires a modern browser with WebAssembly, served over http(s) — opening
  `index.html` from disk will not work.

## Third-party code

See [`vendor/README.md`](vendor/README.md). CodeMirror is MIT; ECJ is EPL-2.0.
Both are vendored rather than loaded from a CDN so the trainer keeps working if a
CDN changes, and so a clone runs offline.
