#!/usr/bin/env bash
# Rebuilds lib/harness.jar from java/Harness.java.
# Requires a JDK 8+; output must be Java 8 bytecode because CheerpJ's runtime is Java 8.
set -euo pipefail
cd "$(dirname "$0")"
rm -rf .build && mkdir -p .build
javac -source 8 -target 8 -nowarn -cp lib/ecj-3.26.0.jar -d .build java/Harness.java
jar cf lib/harness.jar -C .build .
rm -rf .build
echo "rebuilt lib/harness.jar"
