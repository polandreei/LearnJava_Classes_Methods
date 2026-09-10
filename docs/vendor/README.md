# Vendored third-party assets

Committed rather than loaded from a CDN so the trainer keeps working if a CDN
changes or is unreachable, and so a clone runs offline.

| Asset | Version | License |
| --- | --- | --- |
| `codemirror/` | 5.65.21 | MIT — Marijn Haverbeke and others |
| `../lib/ecj-3.26.0.jar` | 3.26.0 | Eclipse Public License 2.0 — Eclipse Foundation |

`ecj-3.26.0.jar` is the Eclipse Compiler for Java. Version 3.26.0 is the last
release that runs on a Java 8 runtime, which is what CheerpJ provides.

`../lib/harness.jar` is built from `../java/Harness.java` by `../build-harness.sh`.
