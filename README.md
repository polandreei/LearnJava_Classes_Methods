# Java Classes, Objects & Methods

A self-paced, exercise-driven course on Java classes, objects, and methods — ten sections, each with hands-on lessons, a section exercise with a worked solution, and a checkpoint quiz.

**➜ [Start the course](java_classes_methods_course.md)**

---

## Attribution

**This is a study aid, not original curriculum.**

The concepts, definitions, tables, and analogies are derived from **CMSC 23 LEC 03, University of the Philippines Manila**. That teaching material belongs to its author. This repository exists to make that lecture practiceable — the exercises, worked solutions, error tables, and quizzes are supplementary practice material written around it.

If you are that lecture's author and would like this changed or taken down, please open an issue.

No license file is included, deliberately: the underlying lecture is not the repository owner's to relicense. See [HANDOFF.md §2](HANDOFF.md) for the reasoning.

---

## Who this is for

Someone who has seen the lecture — or any introductory pass at Java OOP — and wants to actually type the code until it sticks. It assumes you can already write a loop and an `if` statement. It does not assume you have ever written a class.

## How to use it

Read a lesson, then do its **Instructions** by hand. Do not copy-paste — the muscle memory is the point. Every section ends with a ⭐ exercise you should attempt before opening the `<details>` block that holds the solution.

Solutions and quiz answers are hidden inside collapsible `<details>` blocks. GitHub renders these natively, so scrolling past them will not spoil anything.

Budget roughly 8–12 hours end to end if you do every exercise.

## Setup

Any Java 8 or newer installation works. Verify with:

```bash
javac -version
```

Make a working folder, put each class in its own `.java` file matching the class name, then:

```bash
javac *.java
java Main
```

## Course map

| Section | Topic | Exercise |
| --- | --- | --- |
| 1 | Classes — the blueprint | `Book` skeleton |
| 2 | Fields — object state | `BankAccount` |
| 3 | Objects — instantiation & references | Student roster |
| 4 | Methods — behavior | Grade calculator |
| 5 | Static vs instance | Object counter |
| 6 | Method overloading | Flexible `Calculator` |
| 7 | Constructors | `Rectangle` family |
| 8 | The `this` keyword | Constructor chaining |
| 9 | The `main` method | Program entry point |
| 10 | Capstone | Library management system |

Plus four appendices: a syntax cheat sheet, a table of common compiler errors and their real causes, a 20-question self-test, and further reading.

Sections build on each other — 7 sets up 8, 5 sets up 9, and the capstone assumes all nine. Work them in order.

## Code verification

Every solution block in Sections 1–9 has been compiled and run against its stated expected output. All match.

Two caveats:

- **Section 4** prints `87.80000000000001` where the exercise specification shows `87.8`. This is `double` binary representation, not a bug, and Lesson 4's "Note on decimals" explains it and gives the `printf` fix.
- **Section 10 (capstone)** is a specification rather than a provided solution, so its sample output is a target to hit, not verified output from shipped code.

## Repository contents

| File | What it is |
| --- | --- |
| [`java_classes_methods_course.md`](java_classes_methods_course.md) | The course — all ten sections and four appendices |
| [`HANDOFF.md`](HANDOFF.md) | Maintainer notes: provenance, design decisions, known gaps, what to do next |

If you plan to change anything in here, read `HANDOFF.md` first — several things that look like mistakes are deliberate. Section 7's `Pizza` class has duplicated code **on purpose**, because Section 8 refactors it.

---

*Course content derived from CMSC 23 LEC 03, University of the Philippines Manila. Exercises, worked solutions, error tables, and quizzes are supplementary practice material built around that lecture.*
