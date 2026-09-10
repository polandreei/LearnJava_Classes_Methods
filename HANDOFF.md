# Handoff — Java Classes, Objects & Methods course

**Status:** Draft complete, unverified code
**Deliverable:** `java_classes_methods_course.md` (~2,660 lines, single file)
**Last touched:** 2026-09-10

---

## 1. What this is

A self-paced, exercise-driven course covering Java classes, objects, and methods, written in the Codecademy teaching format. It is derived from a single lecture deck (CMSC 23 LEC 03, University of the Philippines Manila) and expands it from ~35 slides into 10 sections with runnable exercises.

Everything lives in **one markdown file**. There are no build steps, no dependencies, and no code files yet — all Java appears in fenced blocks inside the document.

---

## 2. Source of truth and provenance

| Layer | Origin |
| --- | --- |
| Concepts, definitions, tables, analogies | Verbatim or near-verbatim from the lecture deck |
| Code examples `Student`, `Rectangle`, `BankAccount` fields | From the deck |
| Everything else — exercises, solutions, quizzes, error tables, appendices | Written to supplement the deck |

The distinction matters if you ever revise: **the concept text is somebody else's teaching**, and changing it will desync the course from the lecture it is meant to accompany. The exercises are free to rewrite.

The footer of the document already carries an attribution line. Keep it.

**Before pushing publicly:** the lecture material is not yours to relicense. If the repo is public, either keep the attribution prominent in the README, ask the instructor, or make the repo private. If you add a `LICENSE` file, it should cover your exercises and prose, not the source deck.

---

## 3. Structure and conventions

Ten sections plus four appendices. Section order is deliberate — later sections depend on earlier ones:

```
1  Classes                  → blueprint, anatomy, naming
2  Fields                   → state, defaults, access modifiers, encapsulation
3  Objects                  → new, dot operator, references vs primitives
4  Methods                  → syntax, void, parameters vs arguments
5  Static vs instance       → depends on 2 and 4
6  Method overloading       → depends on 4
7  Constructors             → depends on 6 (constructor overloading)
8  this                     → depends on 7 (refactors Section 7's exercise)
9  main                     → depends on 5 (why static matters)
10 Capstone                 → depends on all of the above

A  Syntax cheat sheet
B  Common errors and their causes
C  Full course self-test (20 questions)
D  References
```

**Lesson template** — every lesson uses these headings in this order. Match it if you add lessons:

```markdown
## Lesson N.M — Title

**Concept**
prose + fenced java block

**Gotcha**            (optional)
the mistake learners make here

**Instructions**
1. numbered, hands-on, always typed by the learner
2. ...

> **Hint:** one nudge, never the answer
```

**Section template:**

```markdown
## ⭐ SECTION N EXERCISE — Name
**Goal** / **Task** / **Expected output** / starter code / <details> solution </details>

## Section N Review
four bullets + **Checkpoint Quiz** (5 questions) + <details> answers </details>
```

**Conventions in use:**

- Solutions and quiz answers are always inside `<details><summary>` so learners can't see them while scrolling. GitHub renders these natively; some static site generators don't — check before switching renderers.
- Exercise headings are prefixed `⭐`, the capstone `🏆`.
- Em dashes are used in output strings (`— 432 pages`). If you pipe any of this through a terminal with a non-UTF-8 locale it will mangle.
- Peso amounts are written `P585.0`, not `₱`, to keep the sample output copy-pasteable.

---

## 4. Design decisions worth knowing

**The `main()` signature in the source deck is wrong.** The slide shows `public static void main () { }` with no parameters. That compiles but fails at runtime with "Main method not found in class Main." Rather than silently fixing it, Lesson 9.1 flags it explicitly and makes reproducing the failure an instruction. If your instructor corrects the slide, update that lesson or it will read as a strawman.

**Section 7's exercise is deliberately bad code.** The `Pizza` class there has four constructors with duplicated assignment logic. Section 8 refactors it with `this(...)`. Do not "improve" Section 7 in isolation — you would remove the motivation for Section 8.

**Section 3 is the load-bearing one.** References vs aliasing causes more downstream bugs than anything else in the course. Its exercise (the Dean's Lister roster) exists specifically to make aliasing visible. If you cut anything for length, do not cut that.

**Static is taught as a trap, not just a feature.** Section 5 and Lesson 9.2 both warn against marking fields `static` to silence compiler errors, because that is the reflex beginners develop. The repetition is intentional.

---

## 5. Known gaps — what is NOT done

- [ ] **No code has been compiled.** The authoring environment had a JRE but no `javac`. Every solution and every expected-output block is unverified. This is the biggest outstanding risk.
- [ ] **Floating-point output** is called out in Section 4 only. Other exercises using `double` arithmetic may print values like `87.80000000000001` where the document shows a clean number. Audit each expected-output block once you can compile.
- [ ] No `.java` files exist. All code is in fenced blocks.
- [ ] No solutions directory — solutions are inline in `<details>` blocks, which means a learner cloning the repo has them immediately.
- [ ] No coverage of inheritance, interfaces, polymorphism via overriding, abstract classes, or collections. Appendix D points there as "where to go next."
- [ ] The capstone rubric is self-scored; there is no test harness.
- [ ] No table of contents with anchor links — the course map table at the top is plain text.

---

## 6. First thing to do after cloning

Verify the code. This is the one task that blocks trusting the document:

```bash
# install a JDK if needed, then:
mkdir -p verify && cd verify

# for each solution block: paste into its own .java file, then
javac *.java && java Main
```

Work section by section and correct any expected-output block that doesn't match reality. Sections 2, 4, 5, 7 and the capstone all print computed numbers and are the likely offenders.

---

## 7. Suggested repo layout

The single-file version works as-is. If you want it to grow:

```
java-oop-course/
├── README.md                 # what the course is, how to use it
├── LICENSE                   # your exercises only — see §2
├── HANDOFF.md                # this file
├── course/
│   ├── 00-orientation.md
│   ├── 01-classes.md
│   ├── ...
│   └── 10-capstone.md
├── exercises/                # starter files, no solutions
│   ├── section-01/Book.java
│   └── ...
├── solutions/                # split out so learners can avoid them
│   └── section-01/Book.java
└── .gitignore                # *.class
```

Splitting the file is optional and one-way-ish — cross-references between sections ("as in Section 7") become relative links you have to maintain. Only do it if the single file becomes hard to navigate.

Minimum `.gitignore`:

```
*.class
.DS_Store
.idea/
*.iml
```

---

## 8. Pushing it

```bash
mkdir java-oop-course && cd java-oop-course
git init
# copy java_classes_methods_course.md and HANDOFF.md in
git add .
git commit -m "Add Java classes/objects/methods course, derived from CMSC 23 LEC 03"
git branch -M main
git remote add origin git@github.com:<you>/java-oop-course.git
git push -u origin main
```

Check the rendered result on GitHub before you consider it done — the `<details>` blocks and the box-drawing diagrams in Sections 3 and 5 are the parts most likely to look wrong.

---

## 9. If you keep going

Roughly in order of value:

1. Compile and verify everything (§6).
2. Write a README that states plainly this is a study aid derived from a lecture, not original curriculum.
3. Split solutions into `solutions/` so the repo is usable by someone else studying.
4. Add a Section 11 on inheritance and `extends` — it is the natural next lecture and the course structure already anticipates it.
5. Add JUnit tests for the capstone so the rubric can be partly automated.
