# Java Classes, Objects & Methods

**An interactive, exercise-driven course**
Based on CMSC 23 LEC 03 — University of the Philippines Manila

---

## How This Course Works

Each **Section** contains several short **Lessons**. Every lesson follows the same rhythm:

| Element | What it means |
| --- | --- |
| **Concept** | The idea, explained in plain language |
| **Code** | A worked example you can run |
| **Instructions** | Numbered tasks you type yourself |
| **Hint** | A nudge if you get stuck |
| **Gotcha** | The mistake most learners make here |

At the **end of every section** there is a **Section Exercise** — a small complete program that combines everything in that section, followed by a **Section Review** and a **Checkpoint Quiz** with answers.

**Setup:** any Java 8+ installation works. Create a folder called `java-course`. Each class goes in its own `.java` file. Compile and run with:

```bash
javac Main.java
java Main
```

**Course map**

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
| 10 | Capstone | Library system |

---
---

# SECTION 1 — Classes: The Blueprint

---

## Lesson 1.1 — Why Classes Exist

**Concept**

Imagine storing information about three students without classes:

```java
String student1Name = "Maria";
int student1Age = 20;
double student1Gpa = 3.8;

String student2Name = "John";
int student2Age = 21;
double student2Gpa = 3.4;
// ...and so on, forever
```

Nothing ties `student1Name` to `student1Age` except the name you happened to type. Add a hundred students and the program becomes unmanageable.

A **class** solves this. It is a **blueprint** or **template** that defines the *fields* (attributes / state) and *methods* (behavior) that its objects will have.

Two facts to burn into memory:

- A class **does not itself hold data**.
- **Multiple objects** can be created from a single class, each with **its own copy** of the data.

**Instructions**

1. Create a file named `Notes.java`.
2. In a comment, list three real-world "things" from your daily life that could be classes (e.g. `Jeepney`, `Subject`, `Playlist`).
3. For each, write down two pieces of data it would hold and one action it could perform.

> **Hint:** Data becomes fields. Actions become methods.

---

## Lesson 1.2 — The Blueprint Analogy

**Concept**

A class is like an **architectural blueprint for a house**.

The blueprint specifies the rooms and dimensions — but **you cannot live in a blueprint**. Only an actual house built from it (an **object**) can be lived in.

| Blueprint (class) | House (object) |
| --- | --- |
| A design on paper | A physical structure |
| Says "3 bedrooms, 2 baths" | Actually has those rooms |
| One blueprint | Many houses built from it |
| Takes up no land | Occupies real land (memory) |
| `class Student { ... }` | `new Student("Maria", 20, 3.8)` |

**Gotcha**

Beginners write `Student.name = "Maria"` and expect it to work. It doesn't — that is like writing a name on a blueprint and expecting someone to move in. You must build a house first.

**Instructions**

1. In `Notes.java`, extend the analogy: if `Jeepney` is the blueprint, what are three "houses" (objects) built from it?
2. Write one sentence explaining why the blueprint itself has no plate number.

---

## Lesson 1.3 — Anatomy of a Class

**Concept**

Every Java class follows the same skeleton:

```java
[access_modifier] class ClassName {

    // fields (attributes)
    dataType fieldName;

    // constructor
    ClassName(parameters) {
        // initialization code
    }

    // methods (behavior)
    returnType methodName(parameters) {
        // method body
    }
}
```

Three regions, always in this order by convention: **fields → constructor → methods.**

Here is that skeleton filled in:

```java
public class Student {

    // fields
    String name;
    int age;
    double gpa;

    // constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // method
    public void displayInfo() {
        System.out.println(name + " (" + age + ") GPA: " + gpa);
    }
}
```

Read it slowly:

- `public class Student` — the blueprint's name and visibility.
- `String name; int age; double gpa;` — what every Student **has**.
- `public Student(...)` — how a Student is **built**. Note: same name as the class, **no return type**.
- `public void displayInfo()` — what every Student can **do**.

**Instructions**

1. Create `Student.java` and type the class above by hand. Do not copy-paste — muscle memory matters.
2. Compile it: `javac Student.java`. It should produce `Student.class` with no output. Silence means success.
3. Comment out the field `int age;` and recompile. Read the error carefully, then restore the line.

> **Hint:** Removing `age` breaks the constructor and `displayInfo()`, so you'll see several errors from one deletion. That's normal — fix the root cause, not each symptom.

---

## Lesson 1.4 — Naming Conventions and File Rules

**Concept**

Java has conventions (strong social rules) and requirements (enforced by the compiler).

**Conventions — follow them or other programmers will judge you:**

- **UpperCamelCase**, also called PascalCase: `Student`, `BankAccount`, `LibraryBook`.
- Class names should be **nouns**, because a class represents a "thing."

**Requirement — enforced by the compiler:**

- **One public class per `.java` file**, and the filename must match the class name **exactly**, including capitalization. Class `Student` → file `Student.java`.

| Written as | Verdict |
| --- | --- |
| `Student` | Correct |
| `student` | Wrong — lowercase start |
| `student_record` | Wrong — snake_case is not Java style |
| `BankAccount` | Correct |
| `CalculateGrade` | Wrong — that's a verb, it should be a method |
| `Bankaccount` | Wrong — second word must be capitalized |

**Instructions**

1. Rename `Student.java` to `student.java` and try to compile. Note the error message.
2. Rename it back.
3. Write three correctly-named classes as comments for: a playlist song, a library borrower, a course enrollment record.

**Gotcha**

On Windows and macOS the filesystem is often case-insensitive, so `student.java` may compile anyway on your laptop and then **fail on your instructor's Linux machine**. Match the case exactly, always.

---

## ⭐ SECTION 1 EXERCISE — The `Book` Blueprint

**Goal:** Write a complete, compiling class from scratch using only the anatomy you learned.

**Task**

Create a file `Book.java` containing a class that models a library book.

Requirements:

1. The class must be `public` and correctly named.
2. It must have four fields: the title (`String`), the author (`String`), the number of pages (`int`), and whether it is checked out (`boolean`).
3. It must have a constructor that accepts the title, author, and page count. The checked-out status should be set to `false` inside the constructor — a new book starts on the shelf.
4. It must have one method, `describe()`, that returns nothing and prints a line in this format:
   ```
   "Noli Me Tangere" by Jose Rizal — 432 pages
   ```
5. The file must compile with `javac Book.java` and produce zero errors.

> **Hint:** To print a literal double-quote inside a string, escape it: `\"`.

**Starter code**

```java
public class Book {

    // TODO: four fields


    // TODO: constructor taking title, author, pages


    // TODO: describe() method

}
```

<details>
<summary><b>Solution</b></summary>

```java
public class Book {

    // fields
    String title;
    String author;
    int pages;
    boolean isCheckedOut;

    // constructor
    public Book(String title, String author, int pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isCheckedOut = false;
    }

    // method
    public void describe() {
        System.out.println("\"" + title + "\" by " + author + " — " + pages + " pages");
    }
}
```

</details>

---

## Section 1 Review

- A class is a **blueprint**; it defines structure but **holds no data itself**.
- Class bodies are organized as **fields → constructor → methods**.
- Class names are **UpperCamelCase nouns**.
- One public class per file; **filename must match the class name exactly**.

**Checkpoint Quiz**

1. True or false: a class occupies memory the moment you write it.
2. Which is correctly named — `bank_account`, `BankAccount`, or `Bankaccount`?
3. What must the file be called if it contains `public class LibraryBook`?
4. In the house analogy, what corresponds to an object?
5. Why should a class be named with a noun rather than a verb?

<details>
<summary><b>Answers</b></summary>

1. **False.** Only objects created from the class occupy memory.
2. **`BankAccount`** — UpperCamelCase.
3. **`LibraryBook.java`** — exact match including capitalization.
4. The **actual house** built from the blueprint.
5. Because a class represents a *thing* that has state and behavior; verbs describe actions, which belong to methods.

</details>

---
---

# SECTION 2 — Fields: The State of an Object

---

## Lesson 2.1 — Declaring Fields

**Concept**

**Fields** (also called **instance variables**) represent the **state** of an object. Each object created from the class gets **its own copy** of every instance field.

Rules:

- Declared **inside the class but outside any method**.
- Each has a data type and a name.

```java
public class BankAccount {
    private String owner;
    private double balance;
}
```

Create two accounts and you get two independent `owner` values and two independent `balance` values. Changing one account's balance has no effect on the other.

**Where a variable lives matters:**

```java
public class Example {
    int fieldVariable;          // FIELD — one per object, lives as long as the object

    public void someMethod() {
        int localVariable = 5;  // LOCAL — dies when the method finishes
    }
}
```

**Instructions**

1. Create `BankAccount.java` with the two fields above.
2. Add a third field, `accountNumber`, of type `String`.
3. Add a fourth field, `transactionCount`, of type `int`.

> **Hint:** Account numbers are `String`, not `int` — they can start with `0` and are never used in arithmetic.

---

## Lesson 2.2 — Default Values

**Concept**

Fields are **given a default value if not explicitly initialized**. This is unlike local variables, which must be assigned before use.

| Field type | Default value |
| --- | --- |
| `int`, `short`, `long`, `byte` | `0` |
| `double`, `float` | `0.0` |
| `boolean` | `false` |
| `char` | `'\u0000'` (empty character) |
| Any object type (`String`, `Student`, arrays) | `null` |

```java
public class Defaults {
    int count;          // becomes 0
    double rate;        // becomes 0.0
    boolean active;     // becomes false
    String label;       // becomes null
}
```

**Gotcha**

`null` is not the empty string `""`. A `String` field you never assigned is `null`, and calling a method on it — such as `label.length()` — throws a `NullPointerException` at runtime. This is the single most common Java crash.

**Instructions**

1. Create `Defaults.java` with the class above.
2. Add a `main` method that prints all four fields of a new `Defaults` object.
3. Predict the output before running. Then run it.
4. Add a line that prints `label.length()` and observe the crash. Then remove it.

---

## Lesson 2.3 — Access Modifiers

**Concept**

An **access modifier** controls who is allowed to see a field, method, or class.

| Modifier | Visibility |
| --- | --- |
| `public` | Accessible from any other class, anywhere. |
| `private` | Accessible only within the same class. **Standard for fields.** |
| `protected` | Accessible within the same package and by subclasses. |
| *(default)* | No modifier written: accessible only within the same package. |

Order of restrictiveness, most open to most closed:

```
public  →  protected  →  (default)  →  private
```

**Instructions**

1. In `BankAccount.java`, make sure `balance` is `private`.
2. Create `Main.java` and try `account.balance = 1000000;`. Compile it.
3. Read the error message: Java refuses because the field is private.
4. Temporarily change `balance` to `public`, recompile, and see it succeed. Then set it back to `private` — the next lesson explains why.

---

## Lesson 2.4 — Encapsulation with Getters and Setters

**Concept**

Fields are typically declared `private` **to enforce encapsulation**, and are accessed through `public` getter and setter methods.

Why bother, if a setter just assigns the value anyway? Because a setter is a **checkpoint** where you can validate:

```java
public class BankAccount {
    private String owner;
    private double balance;

    // GETTER — read access
    public double getBalance() {
        return balance;
    }

    // SETTER — write access, with a rule attached
    public void setBalance(double balance) {
        if (balance < 0) {
            System.out.println("Balance cannot be negative.");
            return;
        }
        this.balance = balance;
    }
}
```

With a `public` field, any line of code anywhere could set the balance to `-5000` and the bug would be untraceable. With a `private` field, **there is exactly one door**, and you control it.

Naming convention: `getFieldName()` and `setFieldName()`. For `boolean` fields the getter is usually `isFieldName()`, e.g. `isCheckedOut()`.

**Instructions**

1. Add `getOwner()` and `getBalance()` to `BankAccount`.
2. Add `setOwner(String owner)`.
3. Deliberately omit a setter for `accountNumber` — it should be read-only after creation. Add only `getAccountNumber()`.

> **Hint:** A field with a getter but no setter is read-only from the outside. That is a design decision, not an oversight.

---

## ⭐ SECTION 2 EXERCISE — A Safe `BankAccount`

**Goal:** Build a fully encapsulated class where invalid state is impossible from the outside.

**Task**

Complete `BankAccount.java` so that:

1. All four fields — `owner` (`String`), `accountNumber` (`String`), `balance` (`double`), `transactionCount` (`int`) — are `private`.
2. A constructor accepts owner and account number, sets `balance` to `0.0`, and sets `transactionCount` to `0`.
3. `deposit(double amount)` adds to the balance and increments `transactionCount`, but **rejects amounts of zero or less** with a printed message and no change to state.
4. `withdraw(double amount)` subtracts from the balance and increments `transactionCount`, but **rejects amounts greater than the balance** with a printed message and no change to state.
5. Getters exist for all four fields. There are **no setters** for `balance` or `transactionCount` — they change only through `deposit` and `withdraw`.

Then write `Main.java` that creates an account for "Maria Santos", deposits 5000, withdraws 1200, attempts to withdraw 999999, attempts to deposit -50, and finally prints the balance and transaction count.

**Expected output**

```
Deposited: 5000.0
Withdrew: 1200.0
Insufficient funds. Balance is 3800.0
Deposit must be positive.
Final balance: 3800.0
Transactions: 2
```

<details>
<summary><b>Solution</b></summary>

```java
public class BankAccount {

    private String owner;
    private String accountNumber;
    private double balance;
    private int transactionCount;

    public BankAccount(String owner, String accountNumber) {
        this.owner = owner;
        this.accountNumber = accountNumber;
        this.balance = 0.0;
        this.transactionCount = 0;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit must be positive.");
            return;
        }
        balance += amount;
        transactionCount++;
        System.out.println("Deposited: " + amount);
    }

    public void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Insufficient funds. Balance is " + balance);
            return;
        }
        balance -= amount;
        transactionCount++;
        System.out.println("Withdrew: " + amount);
    }

    public String getOwner() { return owner; }
    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }
    public int getTransactionCount() { return transactionCount; }
}
```

```java
public class Main {
    public static void main(String[] args) {
        BankAccount acct = new BankAccount("Maria Santos", "0012-4457");

        acct.deposit(5000);
        acct.withdraw(1200);
        acct.withdraw(999999);
        acct.deposit(-50);

        System.out.println("Final balance: " + acct.getBalance());
        System.out.println("Transactions: " + acct.getTransactionCount());
    }
}
```

</details>

**Extension challenge:** the rejected withdrawal did not increment `transactionCount`. Is that the right behavior? Argue both sides in a comment.

---

## Section 2 Review

- Fields hold an object's **state**; each object gets its own copy.
- Uninitialized fields receive **defaults** — `0`, `0.0`, `false`, or `null`.
- `public`, `private`, `protected`, and *(default)* control visibility.
- Fields should be `private`, exposed through getters and setters — this is **encapsulation**.

**Checkpoint Quiz**

1. What is the default value of an uninitialized `double` field? Of a `String` field?
2. Which access modifier is standard for fields, and why?
3. What is the difference between *(default)* access and `protected`?
4. Give one concrete reason to prefer `setBalance()` over a public `balance` field.
5. A field has a getter but no setter. What does that communicate?

<details>
<summary><b>Answers</b></summary>

1. `0.0` and `null`.
2. `private`, to enforce encapsulation — outside code cannot corrupt the object's state directly.
3. *(default)* is visible only inside the same package; `protected` is visible in the same package **and** to subclasses, even in other packages.
4. The setter can validate — for example rejecting negative balances — and there is one place to add logging or rules later.
5. That the field is **read-only** from outside: it is set at construction or changed only by the class's own methods.

</details>

---
---

# SECTION 3 — Objects: Bringing Blueprints to Life

---

## Lesson 3.1 — What Is an Object?

**Concept**

An **object** is a concrete **instance** of a class. It occupies actual memory and holds real values for the fields the class defines.

Every object has three properties:

| Property | Meaning |
| --- | --- |
| **State** | The current values of its fields |
| **Behavior** | The methods it can perform |
| **Identity** | It is distinct from other objects, **even if its field values are identical** |

That last one deserves attention. Two `Student` objects both named "Maria", both age 20, both GPA 3.8, are still **two different students** — the way identical twins are two people. In memory they sit at different addresses.

**Instructions**

1. In a comment, describe the state, behavior, and identity of your phone considered as an object.
2. Explain in one sentence why two brand-new identical phones are still distinct objects.

---

## Lesson 3.2 — Creating (Instantiating) Objects

**Concept**

Objects are created with the **`new`** keyword, which **allocates memory and calls a constructor**:

```java
ClassName referenceVariable = new ClassName(arguments);
```

Broken into pieces:

| Piece | Role |
| --- | --- |
| `ClassName` (left) | The **type** of the reference variable |
| `referenceVariable` | The **name** you'll use to reach the object |
| `new` | Allocates memory on the heap |
| `ClassName(arguments)` | Calls the **constructor** to initialize it |

A full example:

```java
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Maria", 20, 3.8);
        Student s2 = new Student("John", 21, 3.4);

        s1.displayInfo();   // Maria (20) GPA: 3.8
        s2.displayInfo();   // John (21) GPA: 3.4
    }
}
```

Two objects, one class. Each `displayInfo()` call prints that object's own data — the method is shared, the data is not.

**Instructions**

1. Create `Main.java` with the code above (you already have `Student.java`).
2. Compile and run both files: `javac Student.java Main.java` then `java Main`.
3. Add a third student with your own name and details, and display it.

> **Hint:** `javac *.java` compiles every file in the folder at once.

---

## Lesson 3.3 — Accessing Fields and Methods

**Concept**

The **dot operator** `.` is used to access an object's fields and methods:

```java
System.out.println(s1.name);   // access a field
s1.displayInfo();              // call a method
```

Read the dot as the possessive **"'s"**: `s1.name` is "s1's name"; `s1.displayInfo()` is "s1, display your info."

Note this only works when the field is visible from where you're standing. If `name` were `private`, `s1.name` would fail to compile from `Main` and you would call `s1.getName()` instead.

**Instructions**

1. Print `s1.name` and `s2.gpa` directly from `Main`.
2. Change `name` in `Student.java` to `private`. Recompile and read the error.
3. Add a `getName()` method to `Student` and use it instead. Keep `name` private.

---

## Lesson 3.4 — References vs Primitive Variables

**Concept**

This lesson explains more real bugs than any other in the course.

Object variables in Java store a **reference** — a memory address pointing to the object — **not the object itself**.

```java
Student s3 = s1;          // s3 now points to the SAME object as s1
s3.name = "Maria Cruz";
System.out.println(s1.name);   // prints "Maria Cruz"
```

Assigning `s1` to `s3` copied the **address**, not the student. Both variables are now labels on the same object, so a change made through one is visible through the other.

Compare with primitives:

```java
int a = 10;
int b = a;      // copies the VALUE 10
b = 20;
System.out.println(a);   // still 10 — a and b are independent
```

Picture it this way:

```
PRIMITIVES                    REFERENCES

a: [ 10 ]                     s1: [ ●──┐
b: [ 20 ]                     s3: [ ●──┼──→  Student object
                                        │      name: "Maria Cruz"
two separate boxes              two arrows, one object
```

**Gotcha**

`==` on objects compares **references**, not contents. Two distinct `Student` objects with identical fields are `!=` each other, because identity is not equality of state. Use `.equals()` for content comparison (and for `String`, always use `.equals()`).

**Instructions**

1. Reproduce the aliasing example above and confirm both variables report the changed name.
2. Create `Student s4 = new Student("Maria Cruz", 20, 3.8);` with the same values as `s3`.
3. Print `s3 == s4` and `s3 == s1`. Explain the two results in a comment.

---

## ⭐ SECTION 3 EXERCISE — The Student Roster

**Goal:** Prove to yourself that you understand objects, aliasing, and identity.

**Task**

Write `Roster.java` with a `main` method that:

1. Creates three `Student` objects: Maria (20, 3.8), John (21, 3.4), and Ana (19, 3.9).
2. Stores them in an array: `Student[] roster = { ... };`
3. Loops through the array and calls `displayInfo()` on each.
4. Creates a variable `topStudent` and assigns it the student with the highest GPA **from the array** (do not create a new object).
5. Changes `topStudent`'s name to add the suffix `" (Dean's Lister)"`.
6. Loops through the array and displays everyone again.
7. In a comment, explain **why** the array's contents changed even though you never touched the array in step 5.

**Expected output**

```
Maria (20) GPA: 3.8
John (21) GPA: 3.4
Ana (19) GPA: 3.9
---
Maria (20) GPA: 3.8
John (21) GPA: 3.4
Ana (Dean's Lister) (19) GPA: 3.9
```

> **Hint:** You'll need a getter and setter for `name`, or keep `name` package-visible for now. Use an enhanced for loop: `for (Student s : roster) { ... }`.

<details>
<summary><b>Solution</b></summary>

```java
public class Roster {
    public static void main(String[] args) {

        Student[] roster = {
            new Student("Maria", 20, 3.8),
            new Student("John", 21, 3.4),
            new Student("Ana", 19, 3.9)
        };

        for (Student s : roster) {
            s.displayInfo();
        }

        // find the highest GPA
        Student topStudent = roster[0];
        for (Student s : roster) {
            if (s.getGpa() > topStudent.getGpa()) {
                topStudent = s;
            }
        }

        topStudent.setName(topStudent.getName() + " (Dean's Lister)");

        System.out.println("---");
        for (Student s : roster) {
            s.displayInfo();
        }

        // WHY: topStudent holds a REFERENCE to the same object stored in
        // roster[2]. It is not a copy. Renaming through topStudent renames
        // the one and only Ana object, which the array also points to.
    }
}
```

Requires these additions to `Student.java`:

```java
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getGpa() { return gpa; }
```

</details>

---

## Section 3 Review

- An object is an **instance** of a class with **state**, **behavior**, and **identity**.
- `new ClassName(args)` allocates memory and runs the constructor.
- The **dot operator** reaches an object's fields and methods.
- Object variables store **references**; assigning one to another creates an **alias**, not a copy.

**Checkpoint Quiz**

1. What exactly does the `new` keyword do?
2. Two objects have identical field values. Are they the same object?
3. After `Student b = a;`, how many objects exist?
4. Why does changing `b.name` also change `a.name`?
5. What is stored inside an object variable — the object, or something else?

<details>
<summary><b>Answers</b></summary>

1. It allocates memory for a new object and calls the constructor to initialize it.
2. **No.** They have equal state but different identities — they are distinct objects at different memory addresses.
3. **One.** Two references now point to it.
4. Because `a` and `b` are aliases: both hold the same reference, so both reach the same object.
5. A **reference** — the memory address of the object, not the object itself.

</details>

---
---

# SECTION 4 — Methods: Defining Behavior

---

## Lesson 4.1 — What Is a Method?

**Concept**

A **method** is a named block of code that defines a **behavior an object can perform**.

Methods let you:

- **Reuse logic** — write the grade formula once, call it a thousand times.
- **Organize code** into logical units instead of one giant `main`.
- **Hide implementation details** behind a simple name. You call `Math.sqrt(16)` without knowing the algorithm inside.

That last point is worth pausing on. A well-named method is a promise: `calculateFinalGrade(...)` tells the reader *what* happens; the body tells them *how*. Callers only need the promise.

**Instructions**

1. In a comment, name three methods that a `Jeepney` class might have.
2. For each, note whether it produces a value or just performs an action.

---

## Lesson 4.2 — Method Syntax

**Concept**

```java
[access_modifier] [static] returnType methodName(parameterList) {
    // method body
    return value;   // omitted if returnType is void
}
```

A concrete example:

```java
public double calculateFinalGrade(double examScore, double classStanding) {
    return (examScore * 0.6) + (classStanding * 0.4);
}
```

Piece by piece:

| Piece | In the example | Meaning |
| --- | --- | --- |
| access modifier | `public` | Who may call it |
| `static` | *(absent)* | Belongs to objects, not the class |
| return type | `double` | The kind of value it hands back |
| method name | `calculateFinalGrade` | lowerCamelCase, usually a **verb** |
| parameter list | `(double examScore, double classStanding)` | Inputs it needs |
| body | `return ...;` | The work |

**Naming convention:** methods are **lowerCamelCase verbs** — `displayInfo`, `calculateFinalGrade`, `withdraw`. Contrast with classes, which are UpperCamelCase nouns.

**Instructions**

1. Add `calculateFinalGrade` to your `Student` class.
2. Call it from `Main` with an exam score of 85 and class standing of 92. Print the result.
3. Add a second method, `isPassing()`, that returns a `boolean` — `true` when the final grade is 60 or above.

> **Hint:** `isPassing()` can call `calculateFinalGrade(...)` internally. Methods calling methods is normal and good.

---

## Lesson 4.3 — Return Types and the `void` Keyword

**Concept**

Three rules govern returning:

- If a method **produces a result**, its return type states that result's data type — `int`, `double`, `String`, an object type, and so on.
- If a method **performs an action but returns nothing**, its return type is `void`.
- Every **non-`void` method must return a value along every possible execution path**.

That third rule is stricter than it first sounds:

```java
// DOES NOT COMPILE — "missing return statement"
public String describeGrade(double grade) {
    if (grade >= 90) {
        return "Excellent";
    } else if (grade >= 75) {
        return "Good";
    }
    // What if grade is 50? No return. Java refuses to compile this.
}
```

The fix is a path that always returns:

```java
public String describeGrade(double grade) {
    if (grade >= 90) {
        return "Excellent";
    } else if (grade >= 75) {
        return "Good";
    }
    return "Needs improvement";   // catches every other case
}
```

Also note: `return;` on its own is legal inside a `void` method — it means "stop here, exit early." You used this in the `BankAccount` validation.

**Instructions**

1. Type the broken `describeGrade` and confirm the compiler rejects it.
2. Fix it with a final unconditional `return`.
3. Add a `void` method `printReportCard()` that prints three lines and exits early with a bare `return;` if the GPA is 0.

---

## Lesson 4.4 — Parameters vs Arguments

**Concept**

These two words are often used interchangeably in conversation, but they mean different things.

- **Parameters** are the variables listed in a method's **declaration** (formal parameters).
- **Arguments** are the actual values **passed in when the method is called**.

```java
// age and gpa are PARAMETERS
public void setInfo(int age, double gpa) { ... }

// 20 and 3.8 are ARGUMENTS
student1.setInfo(20, 3.8);
```

One way to remember: **P**arameters appear in the **P**rototype; **A**rguments are **A**ctual values.

Arguments must match parameters in **number, type, and order**. Java will not let you call `setInfo(3.8, 20)` — the types are reversed and the compiler catches it. But `setInfo(20, 21)` compiles fine and silently sets the GPA to 21.0, because `int` widens to `double`. **The compiler checks types, not your intent.**

**Instructions**

1. Call `setInfo` with the arguments swapped. Read the compiler error.
2. Call it with `(20, 21)` and print the result. Note that nothing complains, though the data is nonsense.
3. Add a validation guard inside `setInfo` that rejects a GPA above 4.0.

---

## ⭐ SECTION 4 EXERCISE — The Grade Calculator

**Goal:** Write a class whose entire value lies in its methods.

**Task**

Create `GradeCalculator.java` modeling one student's performance in a subject.

Requirements:

1. Private fields: `studentName` (`String`), `examScore` (`double`), `classStanding` (`double`).
2. A constructor taking all three.
3. `calculateFinalGrade()` — returns a `double`: 60% exam plus 40% class standing.
4. `getLetterEquivalent()` — returns a `String` using this scale, with a guaranteed return on every path:

   | Final grade | Letter |
   | --- | --- |
   | 90 and above | `A` |
   | 80–89.99 | `B` |
   | 70–79.99 | `C` |
   | 60–69.99 | `D` |
   | Below 60 | `F` |

5. `isPassing()` — returns a `boolean`: `true` when the final grade is at least 60.
6. `printSummary()` — returns `void` and prints:
   ```
   Maria Santos | Final: 87.8 | Grade: B | PASSED
   ```
   Use `"PASSED"` or `"FAILED"` based on `isPassing()`.

Then write a `main` that builds three students — one clearly passing, one borderline, one failing — and prints all three summaries.

> **Hint:** `printSummary()` should call your other three methods rather than recomputing anything. That's the whole point of methods.

> **Note on decimals:** `(85 * 0.6) + (92 * 0.4)` prints as `87.80000000000001`, not `87.8`. That is not your bug — `double` cannot represent `0.6` or `0.4` exactly in binary, so tiny errors accumulate. To display two decimal places, use `System.out.printf("%.2f%n", value)` or `String.format("%.2f", value)`.

<details>
<summary><b>Solution</b></summary>

```java
public class GradeCalculator {

    private String studentName;
    private double examScore;
    private double classStanding;

    public GradeCalculator(String studentName, double examScore, double classStanding) {
        this.studentName = studentName;
        this.examScore = examScore;
        this.classStanding = classStanding;
    }

    public double calculateFinalGrade() {
        return (examScore * 0.6) + (classStanding * 0.4);
    }

    public String getLetterEquivalent() {
        double finalGrade = calculateFinalGrade();
        if (finalGrade >= 90) return "A";
        if (finalGrade >= 80) return "B";
        if (finalGrade >= 70) return "C";
        if (finalGrade >= 60) return "D";
        return "F";
    }

    public boolean isPassing() {
        return calculateFinalGrade() >= 60;
    }

    public void printSummary() {
        String status = isPassing() ? "PASSED" : "FAILED";
        System.out.println(studentName + " | Final: " + calculateFinalGrade()
                           + " | Grade: " + getLetterEquivalent()
                           + " | " + status);
    }

    public static void main(String[] args) {
        new GradeCalculator("Maria Santos", 85, 92).printSummary();
        new GradeCalculator("John Cruz", 58, 63).printSummary();
        new GradeCalculator("Ana Reyes", 40, 35).printSummary();
    }
}
```

</details>

---

## Section 4 Review

- A method is a named block of code defining a **behavior**, enabling reuse, organization, and abstraction.
- Syntax: `[access] [static] returnType name(params) { ... }`.
- `void` means the method returns nothing; every **non-`void`** method must return on **every path**.
- **Parameters** are in the declaration; **arguments** are the values passed at the call.

**Checkpoint Quiz**

1. What return type does a method that only prints have?
2. Why does a method with returns inside `if` blocks but none at the end fail to compile?
3. In `setInfo(int age, double gpa)`, which are the parameters?
4. Name the three benefits of methods listed in the lesson.
5. What naming convention applies to method names, and how does it differ from class names?

<details>
<summary><b>Answers</b></summary>

1. `void`.
2. Because a non-`void` method must return a value along **every possible execution path**, and the path where no `if` matches returns nothing.
3. `age` and `gpa` — the variables in the declaration.
4. Reusing logic, organizing code into logical units, and hiding implementation details behind a simple name.
5. Methods are **lowerCamelCase verbs**; classes are **UpperCamelCase nouns**.

</details>

---
---

# SECTION 5 — Static vs Instance

---

## Lesson 5.1 — The `static` Keyword

**Concept**

The `static` keyword means that a member — a variable, method, block, or nested class — **belongs to the class itself**, *rather than to a specific instance (object) of that class*.

Non-static members are per-object. Static members exist **once**, shared by everyone.

```java
public class Student {
    String name;                       // one per OBJECT
    static String university = "UPM";  // one for the whole CLASS
}
```

Create a thousand students and you have a thousand `name` values but exactly **one** `university`. Change it and all thousand see the change, because there was only ever one.

```
CLASS Student
┌───────────────────────────┐
│ static university: "UPM"  │  ← one copy, lives with the class
└───────────────────────────┘
        ↑          ↑
   ┌────┴───┐  ┌───┴────┐
   │ name:  │  │ name:  │      ← one copy per object
   │ "Maria"│  │ "John" │
   └────────┘  └────────┘
```

**Instructions**

1. Add `static String university = "University of the Philippines Manila";` to `Student`.
2. Print it two ways: `Student.university` and `s1.university`. Both work — but only the first is good style.
3. Change it through `s1` and print it through `s2`. Explain the result in a comment.

---

## Lesson 5.2 — Instance Methods vs Static Methods

**Concept**

| | **Instance Method** | **Static Method** |
| --- | --- | --- |
| **Belongs to** | An individual object | The class itself |
| **Called via** | `objectName.method()` | `ClassName.method()` |
| **Can access** | Instance fields **and** static fields | Only static fields |
| **Example** | `student1.displayInfo()` | `Math.sqrt(16)` |

The third row is the one that trips people up. Ask *why*: a static method can be called when **no object exists at all**. `Math.sqrt(16)` runs without any `Math` object. So if that method tried to read an instance field, whose field would it read? There is no answer, so Java forbids it at compile time.

```java
public class Example {
    int instanceField = 5;
    static int staticField = 10;

    static void staticMethod() {
        System.out.println(staticField);    // fine — one shared copy
        System.out.println(instanceField);  // ERROR: non-static variable
                                            // cannot be referenced from
                                            // a static context
    }

    void instanceMethod() {
        System.out.println(staticField);    // fine
        System.out.println(instanceField);  // fine — "my" copy
    }
}
```

Instance methods can reach **both**, because an instance method always runs on some specific object.

**Instructions**

1. Type the class above and confirm the error on the marked line.
2. Comment out the offending line and compile successfully.
3. Add a static method `getUniversity()` to `Student` and call it as `Student.getUniversity()`.

---

## Lesson 5.3 — Static Fields as Shared Counters

**Concept**

The classic use of a static field is counting how many objects have been created — a job no single object could do, since none of them knows about the others.

```java
public class Student {
    private String name;
    private static int studentCount = 0;   // shared by all

    public Student(String name) {
        this.name = name;
        studentCount++;                    // every construction bumps the shared count
    }

    public static int getStudentCount() {
        return studentCount;
    }
}
```

Because the counter belongs to the class, `Student.getStudentCount()` gives a meaningful answer even before any student exists — it returns `0`.

Other legitimate uses of `static`:

- **Constants:** `public static final double PASSING_GRADE = 60.0;` — one value, never changes, no reason to duplicate it per object.
- **Utility methods** that depend only on their arguments: `Math.sqrt`, `Integer.parseInt`.

**Gotcha**

Do not reach for `static` just to silence a compiler error in `main`. Beginners often mark every field `static` to make errors disappear; the result is a program where every "object" shares one set of data, which defeats the purpose of classes entirely.

**Instructions**

1. Add the static counter to `Student`.
2. Print `Student.getStudentCount()` **before** creating any students, then after creating three.
3. Add `public static final double PASSING_GRADE = 60.0;` and use it inside `isPassing()`.

---

## ⭐ SECTION 5 EXERCISE — Counter and Utility

**Goal:** Use static members for the two jobs they're actually good at.

**Task — Part A: `Employee.java`**

1. Private instance fields: `name` (`String`), `salary` (`double`), `employeeId` (`int`).
2. A private **static** field `nextId`, starting at `1000`.
3. A **static** counter `employeeCount`.
4. The constructor takes name and salary, then assigns `employeeId` from `nextId`, increments `nextId`, and increments `employeeCount`. Each employee should get a unique, sequential ID automatically.
5. A static method `getEmployeeCount()`.
6. An instance method `describe()` printing `[1000] Maria Santos — 45000.0`.

**Task — Part B: `MathUtils.java`**

A class of pure static helpers, called without ever creating an object:

1. `static double average(double a, double b)`
2. `static int max(int a, int b)`
3. `static boolean isEven(int n)`

**Task — Part C: `Main.java`**

Create three employees, describe each, print the total count, and call all three `MathUtils` methods via `MathUtils.methodName(...)`.

**Expected output**

```
[1000] Maria Santos — 45000.0
[1001] John Cruz — 52000.0
[1002] Ana Reyes — 48000.0
Total employees: 3
Average: 48500.0
Max: 52000
Is 3 even? false
```

<details>
<summary><b>Solution</b></summary>

```java
public class Employee {

    private String name;
    private double salary;
    private int employeeId;

    private static int nextId = 1000;
    private static int employeeCount = 0;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
        this.employeeId = nextId;
        nextId++;
        employeeCount++;
    }

    public static int getEmployeeCount() {
        return employeeCount;
    }

    public double getSalary() { return salary; }

    public void describe() {
        System.out.println("[" + employeeId + "] " + name + " — " + salary);
    }
}
```

```java
public class MathUtils {
    public static double average(double a, double b) { return (a + b) / 2; }
    public static int max(int a, int b) { return (a > b) ? a : b; }
    public static boolean isEven(int n) { return n % 2 == 0; }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee("Maria Santos", 45000);
        Employee e2 = new Employee("John Cruz", 52000);
        Employee e3 = new Employee("Ana Reyes", 48000);

        e1.describe();
        e2.describe();
        e3.describe();

        System.out.println("Total employees: " + Employee.getEmployeeCount());
        System.out.println("Average: " + MathUtils.average(e1.getSalary(), e2.getSalary()));
        System.out.println("Max: " + MathUtils.max(45000, 52000));
        System.out.println("Is 3 even? " + MathUtils.isEven(3));
    }
}
```

</details>

**Extension challenge:** why must `nextId` be static? Describe what would break if it were an instance field.

---

## Section 5 Review

- `static` means a member belongs to the **class itself**, not to any instance.
- Instance methods are called on objects and can access instance **and** static members.
- Static methods are called on the class and can access **only static** members.
- Static fields are ideal for **shared counters** and **constants**.

**Checkpoint Quiz**

1. How is `Math.sqrt(16)` called, and what does that tell you about `sqrt`?
2. Why can't a static method read an instance field?
3. If a static field is changed through one object, what do other objects see?
4. Which can access more — an instance method or a static method?
5. Why does an object counter have to be static?

<details>
<summary><b>Answers</b></summary>

1. Via `ClassName.method()`. It is a **static** method — no `Math` object is created.
2. Because a static method may run when no object exists, so there is no particular instance whose field it could read.
3. The change, because there is only **one shared copy** for the whole class.
4. An **instance method** — it can reach both instance and static members.
5. Because the count describes the class as a whole; no single object could track how many others exist, and a per-object copy would always read `1`.

</details>

---
---

# SECTION 6 — Method Overloading

---

## Lesson 6.1 — One Name, Many Signatures

**Concept**

Java allows multiple methods in the same class to **share a name**, *as long as their parameter lists **differ*** — in **number**, **type**, or **order**.

This is called **method overloading**, and it is a simple form of **polymorphism** ("many forms").

```java
public class Printer {

    public void print(String text) {
        System.out.println(text);
    }

    public void print(String text, int times) {          // differs in NUMBER
        for (int i = 0; i < times; i++) System.out.println(text);
    }

    public void print(int number) {                       // differs in TYPE
        System.out.println("Number: " + number);
    }
}
```

Without overloading you would need `printString`, `printStringTimes`, `printInt` — three names for one idea. You already use overloading constantly: `System.out.println()` accepts a `String`, an `int`, a `double`, a `char`, an object, or nothing at all. Those are all separate overloaded methods.

**Instructions**

1. Create `Printer.java` with the three methods above.
2. Call each from `main` and confirm Java picks the right one.
3. Add a fourth overload taking a `double`.

---

## Lesson 6.2 — What Does *Not* Count as Overloading

**Concept**

The **return type is not part of the signature.** Changing only the return type is not overloading — it's a compile error.

```java
public int calculate(int a, int b) { return a + b; }
public double calculate(int a, int b) { return a + b; }   // ERROR: already defined
```

Why? Consider `calculate(3, 4);` on a line by itself, with the result unused. Java would have no way to know which version you meant. Parameter lists are visible at the call site; return types are not.

**Parameter names don't count either:**

```java
public void set(int age) { }
public void set(int years) { }   // ERROR — same signature, different label
```

The **order** of different types does count:

```java
public void register(String name, int age) { }
public void register(int age, String name) { }   // VALID overload
```

**Instructions**

1. Try the two `calculate` methods and read the "already defined" error.
2. Fix it by renaming one to `calculateExact`.
3. Write two valid `register` overloads with reversed parameter order and call both.

---

## Lesson 6.3 — How Java Chooses

**Concept**

At the call site, Java matches on the **number, types, and order** of the arguments, preferring the most specific match and widening types only when necessary.

```java
public void show(int x)    { System.out.println("int version"); }
public void show(double x) { System.out.println("double version"); }

show(5);      // "int version"    — exact match wins
show(5.0);    // "double version" — exact match
show('A');    // "int version"    — char widens to int before double
```

**Gotcha**

Overloading only works when the versions do **conceptually the same thing** with different inputs. If `process(int)` saves to a file and `process(String)` sends an email, the shared name is a lie. Overload for convenience, not to be clever.

**Instructions**

1. Type the `show` overloads and test all three calls above.
2. Add `show(long x)` and predict which version `show(5)` now selects. Test your prediction.
3. In a comment, write one good and one bad example of overloading from your own imagination.

---

## ⭐ SECTION 6 EXERCISE — The Flexible Calculator

**Goal:** Build a class whose API feels effortless because of overloading.

**Task**

Create `Calculator.java` with these overloaded methods:

1. `add(int a, int b)` → returns `int`
2. `add(double a, double b)` → returns `double`
3. `add(int a, int b, int c)` → returns `int`
4. `add(int[] numbers)` → returns `int`, the sum of the array

Then add an overloaded `describe` set that returns a `String`:

5. `describe(String name)` → `"Hello, Maria"`
6. `describe(String name, int age)` → `"Hello, Maria (20)"`
7. `describe(int age, String name)` → `"Age 20: Maria"` — note the reversed order

Write a `main` that calls every one of the seven and prints the results.

**Expected output**

```
5
7.5
9
100
Hello, Maria
Hello, Maria (20)
Age 20: Maria
```

> **Hint:** For the array overload, an enhanced for loop is cleanest: `for (int n : numbers) sum += n;`

<details>
<summary><b>Solution</b></summary>

```java
public class Calculator {

    public int add(int a, int b) { return a + b; }

    public double add(double a, double b) { return a + b; }

    public int add(int a, int b, int c) { return a + b + c; }

    public int add(int[] numbers) {
        int sum = 0;
        for (int n : numbers) sum += n;
        return sum;
    }

    public String describe(String name) {
        return "Hello, " + name;
    }

    public String describe(String name, int age) {
        return "Hello, " + name + " (" + age + ")";
    }

    public String describe(int age, String name) {
        return "Age " + age + ": " + name;
    }

    public static void main(String[] args) {
        Calculator c = new Calculator();

        System.out.println(c.add(2, 3));
        System.out.println(c.add(2.5, 5.0));
        System.out.println(c.add(2, 3, 4));
        System.out.println(c.add(new int[]{10, 20, 30, 40}));

        System.out.println(c.describe("Maria"));
        System.out.println(c.describe("Maria", 20));
        System.out.println(c.describe(20, "Maria"));
    }
}
```

</details>

**Extension challenge:** try adding `public double add(int a, int b)`. Explain the exact error in a comment.

---

## Section 6 Review

- **Overloading** = same method name, **different parameter lists**, in the same class.
- Lists may differ in **number**, **type**, or **order** of parameters.
- **Return type alone is not enough** — and neither are parameter names.
- Overloading is a simple form of **polymorphism**.

**Checkpoint Quiz**

1. Name the three ways parameter lists may differ.
2. Why isn't the return type part of the signature?
3. Is `void log(String msg)` plus `void log(String message)` valid overloading?
4. Is `void register(String s, int i)` plus `void register(int i, String s)` valid?
5. Which familiar method have you been using that is heavily overloaded?

<details>
<summary><b>Answers</b></summary>

1. Number, type, and order of parameters.
2. Because the return value may be ignored at the call site, leaving Java no way to tell which version was intended.
3. **No.** Parameter names are irrelevant; both have the signature `log(String)`.
4. **Yes.** Reversing the order of different types produces a distinct signature.
5. `System.out.println()` — it has versions for `String`, `int`, `double`, `char`, objects, and no arguments.

</details>

---
---

# SECTION 7 — Constructors

---

## Lesson 7.1 — A Special Kind of Method

**Concept**

A **constructor initializes a new object.** It has three distinguishing traits:

- It shares the **class's exact name**.
- It has **no return type** — not even `void`.
- It runs **automatically when `new` is used**.

```java
public class Student {
    String name;
    int age;
    double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
}
```

**Gotcha**

Write `public void Student(...)` and you have not made a constructor — you've made an ordinary method that happens to be named `Student`. It compiles, so there's no error message, but `new Student("Maria", 20, 3.8)` will fail to find a matching constructor and your fields stay at their defaults. **If you ever see `void` next to a class name, delete it.**

**Instructions**

1. Deliberately add `void` to your `Student` constructor. Compile.
2. Read the error at the `new Student(...)` call site and note that it points at `Main`, not at the real mistake.
3. Remove `void` and recompile.

---

## Lesson 7.2 — The Default Constructor

**Concept**

The **default constructor** is **provided automatically by Java if you define no constructor at all**. It takes no arguments and leaves fields at their default values.

```java
public class Dog {
    String name;    // no constructor written anywhere
}

Dog d = new Dog();          // works — Java supplied Dog() invisibly
System.out.println(d.name); // null
```

The moment you write **any** constructor, the free one disappears:

```java
public class Dog {
    String name;

    public Dog(String name) {   // now the ONLY constructor
        this.name = name;
    }
}

Dog d = new Dog();          // ERROR — no no-argument constructor exists
Dog d2 = new Dog("Bantay"); // fine
```

This surprises nearly everyone once. If you still want `new Dog()` to work, write a no-argument constructor yourself.

**Instructions**

1. Create `Dog.java` with only a field and no constructor. Instantiate with `new Dog()`.
2. Add a one-argument constructor and try `new Dog()` again. Read the error.
3. Add an explicit no-argument constructor that sets `name` to `"Unnamed"`, so both calls work.

---

## Lesson 7.3 — Parameterized Constructors

**Concept**

A **parameterized constructor accepts arguments to initialize fields with specific values**, as in the `Student` example.

This is what makes objects useful immediately on creation. Compare:

```java
// Without a parameterized constructor — object is briefly invalid
Student s = new Student();
s.name = "Maria";
s.age = 20;
s.gpa = 3.8;

// With one — object is valid from the first instant
Student s = new Student("Maria", 20, 3.8);
```

The second form is better for a reason beyond brevity: between the `new` and the last assignment, the first version has an object that exists but is incomplete. If anything reads it in that window — another thread, a logging call, an exception — it sees a half-built student. A parameterized constructor makes an invalid object impossible.

Constructors can also **validate**, exactly as setters do:

```java
public Student(String name, int age, double gpa) {
    this.name = name;
    this.age = age;
    this.gpa = (gpa >= 0 && gpa <= 4.0) ? gpa : 0.0;
}
```

**Instructions**

1. Add GPA validation to the `Student` constructor.
2. Try to create a student with GPA `99.0` and confirm it becomes `0.0`.
3. Add a validation rule for `age` — reject anything under 1.

---

## Lesson 7.4 — Constructor Overloading

**Concept**

**Constructor overloading** means a class may define **multiple constructors with different parameter lists**, just like any overloaded method.

```java
public class Rectangle {
    private double width;
    private double height;

    public Rectangle() {                                // no arguments
        this.width = 1.0;
        this.height = 1.0;
    }

    public Rectangle(double side) {                     // one argument — a square
        this.width = side;
        this.height = side;
    }

    public Rectangle(double width, double height) {     // two arguments
        this.width = width;
        this.height = height;
    }
}
```

Callers now pick whichever fits:

```java
Rectangle unit   = new Rectangle();          // 1.0 × 1.0
Rectangle square = new Rectangle(5.0);       // 5.0 × 5.0
Rectangle rect   = new Rectangle(4.0, 6.0);  // 4.0 × 6.0
```

The rules are identical to method overloading: parameter lists must differ in number, type, or order.

There is duplication in the code above — three constructors, three pairs of assignments. Section 8 shows how to eliminate it.

**Instructions**

1. Create `Rectangle.java` with all three constructors.
2. Instantiate one of each and print their dimensions.
3. Add a fourth constructor taking a `Rectangle` and copying its dimensions — a **copy constructor**.

> **Hint:** `public Rectangle(Rectangle other) { this.width = other.width; ... }` — a class can read the private fields of another object **of its own type**.

---

## ⭐ SECTION 7 EXERCISE — The `Pizza` Order

**Goal:** Design a class where constructor overloading makes the API pleasant.

**Task**

Create `Pizza.java` modeling a pizza order.

1. Private fields: `size` (`String`), `crust` (`String`), `toppings` (`int`), `price` (`double`).
2. Four overloaded constructors:
   - `Pizza()` — a default order: `"Medium"`, `"Regular"`, `0` toppings.
   - `Pizza(String size)` — that size, `"Regular"` crust, `0` toppings.
   - `Pizza(String size, String crust)` — that size and crust, `0` toppings.
   - `Pizza(String size, String crust, int toppings)` — everything specified.
3. Every constructor must end by calling a private helper `calculatePrice()` that sets `price`:
   - Base: Small `200`, Medium `300`, Large `400`, anything else `300`.
   - Crust: `"Stuffed"` adds `80`, `"Thin"` adds `0`, `"Regular"` adds `0`.
   - Each topping adds `35`.
4. A `describe()` method printing: `Large Stuffed pizza, 3 topping(s) — P585.0`

Write a `main` creating one pizza with each constructor and describing all four.

**Expected output**

```
Medium Regular pizza, 0 topping(s) — P300.0
Large Regular pizza, 0 topping(s) — P400.0
Small Thin pizza, 0 topping(s) — P200.0
Large Stuffed pizza, 3 topping(s) — P585.0
```

<details>
<summary><b>Solution</b></summary>

```java
public class Pizza {

    private String size;
    private String crust;
    private int toppings;
    private double price;

    public Pizza() {
        this.size = "Medium";
        this.crust = "Regular";
        this.toppings = 0;
        calculatePrice();
    }

    public Pizza(String size) {
        this.size = size;
        this.crust = "Regular";
        this.toppings = 0;
        calculatePrice();
    }

    public Pizza(String size, String crust) {
        this.size = size;
        this.crust = crust;
        this.toppings = 0;
        calculatePrice();
    }

    public Pizza(String size, String crust, int toppings) {
        this.size = size;
        this.crust = crust;
        this.toppings = toppings;
        calculatePrice();
    }

    private void calculatePrice() {
        double base;
        if (size.equals("Small")) base = 200;
        else if (size.equals("Large")) base = 400;
        else base = 300;

        if (crust.equals("Stuffed")) base += 80;

        price = base + (toppings * 35);
    }

    public void describe() {
        System.out.println(size + " " + crust + " pizza, "
                           + toppings + " topping(s) — P" + price);
    }

    public static void main(String[] args) {
        new Pizza().describe();
        new Pizza("Large").describe();
        new Pizza("Small", "Thin").describe();
        new Pizza("Large", "Stuffed", 3).describe();
    }
}
```

</details>

**Extension challenge:** count how many lines are duplicated across the four constructors. Section 8 removes them.

---

## Section 7 Review

- A constructor **initializes a new object**, shares the class's **exact name**, has **no return type**, and runs when `new` is used.
- The **default constructor** is supplied only when you write **no** constructor at all.
- A **parameterized constructor** gives the object valid state immediately.
- **Constructor overloading** provides multiple ways to build an object.

**Checkpoint Quiz**

1. What return type does a constructor have?
2. You wrote one constructor taking two arguments. Does `new MyClass()` still compile?
3. What is wrong with `public void Student(String name)`?
4. What must differ between two constructors of the same class?
5. Name one advantage of a parameterized constructor over assigning fields afterward.

<details>
<summary><b>Answers</b></summary>

1. **None** — not even `void`.
2. **No.** Writing any constructor removes the automatic default one.
3. `void` makes it a regular method, not a constructor; `new Student("Maria")` won't find a matching constructor.
4. Their **parameter lists** — in number, type, or order.
5. The object is fully valid the moment it exists, so no code can observe it half-built; it also gives one place to validate.

</details>

---
---

# SECTION 8 — The `this` Keyword

---

## Lesson 8.1 — Resolving Naming Conflicts

**Concept**

**`this` refers to the current object** — the specific instance whose method or constructor is currently executing.

Its first job: **resolving naming conflicts between a field and a parameter that share a name.**

Look at what happens without it:

```java
public class Student {
    private String name;

    public Student(String name) {
        name = name;    // BUG: assigns the parameter to itself.
    }                   // The field stays null. No error, no warning.
}
```

Inside the constructor, the parameter `name` **shadows** the field. Both mentions refer to the parameter, so this line does nothing at all — and it compiles cleanly, which makes it a nasty bug to find.

`this` disambiguates:

```java
public Student(String name) {
    this.name = name;
    // this.name = the FIELD    name = the PARAMETER
}
```

Read it as **"this object's `name` gets the incoming `name`."**

You could sidestep the whole issue by naming the parameter `n` or `newName`, but Java convention is to give the parameter the **same** name as the field and use `this`. It makes the relationship obvious.

**Instructions**

1. Write the buggy constructor and print the field afterward. Confirm you see `null`.
2. Fix it with `this.name = name;` and confirm the value appears.
3. In `BankAccount`, verify every constructor and setter uses `this.` for field assignment.

---

## Lesson 8.2 — Constructor Chaining

**Concept**

`this` **can be used to call one constructor from another within the same class** — **constructor chaining** — via `this(arguments)`.

Here is the pattern that removes the duplication from Section 7:

```java
public class Rectangle {

    private double width;
    private double height;

    public Rectangle() {
        this(1.0, 1.0);         // calls the constructor below
    }

    public Rectangle(double width, double height) {
        this.width = width;
        // this.width = the field, width = the parameter
        this.height = height;
    }

    public double area() {
        return this.width * this.height;
    }
}
```

One constructor holds the real initialization logic; the others delegate to it. Add a validation rule later and you add it **once**.

**The one hard rule:** `this(...)` must be the **very first statement** in the constructor. Nothing may precede it — not even a `System.out.println`.

```java
public Rectangle(double side) {
    System.out.println("Making a square");
    this(side, side);   // ERROR: call to this must be first statement
}
```

**Instructions**

1. Rewrite `Rectangle` so all constructors chain to the two-argument one.
2. Add a validation rule to the two-argument constructor rejecting non-positive dimensions, and confirm it now protects every construction path.
3. Try putting a statement before `this(...)` and read the error.

---

## Lesson 8.3 — Passing and Returning `this`

**Concept**

Since `this` **is** the current object, you can pass it around like any other reference.

```java
public class Student {
    private String name;

    public void enrollIn(Course course) {
        course.addStudent(this);   // hand MYSELF to the course
    }
}
```

You can also return it, which makes calls chainable:

```java
public Rectangle setWidth(double width) {
    this.width = width;
    return this;               // hand back the same object
}

// enables:
rect.setWidth(5).setHeight(3);
```

Also note: `this` is available in every instance method, but **never inside a `static` method** — a static method has no current object, which is exactly why it cannot touch instance fields (Section 5).

**Instructions**

1. Add `setWidth` and `setHeight` to `Rectangle`, each returning `this`.
2. Chain them in `main` and print the area.
3. Try writing `this.width` inside a static method and read the error.

---

## ⭐ SECTION 8 EXERCISE — Refactor with `this`

**Goal:** Take the duplicated `Pizza` class from Section 7 and cut it down using chaining.

**Task**

Rewrite `Pizza.java` so that:

1. **Only one constructor** contains real assignment logic — the three-argument one.
2. The other three constructors delegate using `this(...)` as their **only** statement.
3. The three-argument constructor validates: a `toppings` value below `0` becomes `0`, and a value above `10` becomes `10`.
4. Behavior and output stay **identical** to Section 7.
5. Add a `Rectangle`-style `area()`-like method using explicit `this`: `public double getPricePerTopping()` returning `this.price / (this.toppings + 1)`.

Then prove the refactor worked: create a pizza with `-5` toppings and one with `50` toppings and confirm they clamp to `0` and `10`, **even though you only wrote the validation once**.

<details>
<summary><b>Solution</b></summary>

```java
public class Pizza {

    private String size;
    private String crust;
    private int toppings;
    private double price;

    public Pizza() {
        this("Medium", "Regular", 0);
    }

    public Pizza(String size) {
        this(size, "Regular", 0);
    }

    public Pizza(String size, String crust) {
        this(size, crust, 0);
    }

    // the ONLY constructor with real logic
    public Pizza(String size, String crust, int toppings) {
        this.size = size;
        this.crust = crust;

        if (toppings < 0) this.toppings = 0;
        else if (toppings > 10) this.toppings = 10;
        else this.toppings = toppings;

        calculatePrice();
    }

    private void calculatePrice() {
        double base;
        if (this.size.equals("Small")) base = 200;
        else if (this.size.equals("Large")) base = 400;
        else base = 300;

        if (this.crust.equals("Stuffed")) base += 80;

        this.price = base + (this.toppings * 35);
    }

    public double getPricePerTopping() {
        return this.price / (this.toppings + 1);
    }

    public void describe() {
        System.out.println(size + " " + crust + " pizza, "
                           + toppings + " topping(s) — P" + price);
    }

    public static void main(String[] args) {
        new Pizza().describe();
        new Pizza("Large").describe();
        new Pizza("Small", "Thin").describe();
        new Pizza("Large", "Stuffed", 3).describe();

        new Pizza("Medium", "Regular", -5).describe();   // clamps to 0
        new Pizza("Medium", "Regular", 50).describe();   // clamps to 10
    }
}
```

</details>

---

## Section 8 Review

- `this` refers to the **current object** — the instance whose code is running.
- It resolves **shadowing** when a parameter and a field share a name.
- `this(arguments)` performs **constructor chaining** and must be the **first statement**.
- `this` can be passed or returned; it does **not exist** in static methods.

**Checkpoint Quiz**

1. What does `name = name;` inside a constructor actually do?
2. In `this.width = width;`, which side is the field?
3. Where must `this(...)` appear in a constructor?
4. What is the main benefit of constructor chaining?
5. Why is `this` unavailable inside a static method?

<details>
<summary><b>Answers</b></summary>

1. Nothing useful — it assigns the parameter to itself, leaving the field at its default.
2. The **left** side, `this.width`. The bare `width` is the parameter.
3. As the **very first statement**, before anything else.
4. Initialization logic and validation live in **one** constructor; the others delegate, so there's no duplication to keep in sync.
5. A static method belongs to the class and can run with no object in existence, so there is no "current object" for `this` to refer to.

</details>

---
---

# SECTION 9 — The `main` Method

---

## Lesson 9.1 — The Entry Point

**Concept**

Three facts govern `main`:

- The `main` method **must be `public`, `static`, and `void`**.
- The **system locates the `main` method for a program and runs it**.
- **Other methods are executed when called by the `main` method**, explicitly or implicitly.

The complete, correct signature:

```java
public static void main(String[] args) {
    // code
}
```

Every word is required, and each one has a reason:

| Keyword | Why it must be there |
| --- | --- |
| `public` | The JVM lives outside your class and must be able to see it |
| `static` | It runs **before any object exists** — nothing to call it on |
| `void` | It returns nothing to the JVM |
| `main` | The exact name the JVM searches for |
| `String[] args` | Receives command-line arguments |

**⚠️ Important correction to note:** you may see `main` written without parameters, as `public static void main () { }`. **That will compile but will not run.** The JVM searches specifically for a `main` that takes a `String[]`. Without it you get:

```
Error: Main method not found in class Main
```

Always write `public static void main(String[] args)`.

**Instructions**

1. Write a class with `public static void main()` — no parameters. Compile it (it succeeds) and run it (it fails).
2. Read the error message carefully.
3. Add `String[] args` and run again.

> **Hint:** `String[] args` may be renamed — `String[] arguments` works — and `String... args` is also accepted. The **type** is what matters, not the label.

---

## Lesson 9.2 — Why `static` Matters Here

**Concept**

This is where Section 5 pays off. `main` is `static` because when your program starts, **no objects exist yet**. The JVM cannot call `new Main().main(...)` — it would have to build an object first, and it has no idea which constructor to use.

The consequence trips up nearly every beginner:

```java
public class Main {
    int counter = 0;                 // instance field

    public static void main(String[] args) {
        counter++;   // ERROR: non-static variable counter
                     // cannot be referenced from a static context
    }
}
```

There are two correct fixes, and one tempting wrong one.

**Fix 1 — create an object (usually right):**

```java
public class Main {
    int counter = 0;

    public static void main(String[] args) {
        Main app = new Main();
        app.counter++;
        System.out.println(app.counter);
    }
}
```

**Fix 2 — make the member static (right only if it truly belongs to the class):**

```java
static int counter = 0;
```

**The tempting wrong one:** marking *everything* static so the errors go away. Do that and every object shares one set of data, which erases the point of having objects at all.

**Instructions**

1. Reproduce the error above.
2. Apply Fix 1 and confirm it runs.
3. In a comment, explain why Fix 2 would be wrong if `counter` tracked one user's score in a multiplayer game.

---

## Lesson 9.3 — Program Structure and Flow

**Concept**

A typical multi-class program has one class holding `main` and other classes holding the model:

```
java-course/
├── Student.java     ← the blueprint
├── Course.java      ← another blueprint
└── Main.java        ← the entry point, holds main()
```

Execution order is strictly top-down from `main`:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("1. Program starts");

        Student s = new Student("Maria", 20, 3.8);   // 2. constructor runs
        System.out.println("3. Object created");

        s.displayInfo();                              // 4. method runs

        System.out.println("5. Program ends");
    }
}
```

When `main` returns, the program ends. Any method not reachable from `main` — directly or through a chain of calls — never runs.

**Using command-line arguments:**

```java
public static void main(String[] args) {
    if (args.length > 0) {
        System.out.println("Hello, " + args[0]);
    } else {
        System.out.println("Hello, stranger");
    }
}
```

```bash
java Main Maria      # Hello, Maria
java Main            # Hello, stranger
```

**Instructions**

1. Type the numbered example and add a print statement **inside** the `Student` constructor. Predict where it lands in the sequence, then run.
2. Write a `main` that greets `args[0]`.
3. Run it with no arguments. If you didn't guard with `args.length`, note the `ArrayIndexOutOfBoundsException`.

---

## ⭐ SECTION 9 EXERCISE — Trace the Flow

**Goal:** Predict a program's exact output before running it, then verify.

**Task — Part A**

Copy this into `TraceMe.java`. **Write down the exact output on paper before compiling.**

```java
public class TraceMe {

    static int objectsMade = 0;
    String label;

    public TraceMe() {
        this("default");
        System.out.println("B: no-arg constructor finishing");
    }

    public TraceMe(String label) {
        this.label = label;
        objectsMade++;
        System.out.println("A: built '" + label + "', total = " + objectsMade);
    }

    void show() {
        System.out.println("C: I am " + this.label);
    }

    public static void main(String[] args) {
        System.out.println("START");
        TraceMe t1 = new TraceMe();
        TraceMe t2 = new TraceMe("custom");
        t1.show();
        t2.show();
        TraceMe t3 = t2;
        t3.label = "renamed";
        t2.show();
        System.out.println("Total objects: " + objectsMade);
        System.out.println("END");
    }
}
```

Then answer:

1. Why does line **A** print before line **B** for `t1`?
2. Why is the total `2` and not `3`?
3. Why did renaming `t3` change what `t2` shows?

**Task — Part B**

Write `Launcher.java` from scratch:

1. A correct `main` signature.
2. If a command-line argument is given, use it as a student's name; otherwise default to `"Guest"`.
3. Create a `Student` with that name, age `18`, GPA `0.0`.
4. Call `displayInfo()`.
5. Print how many `Student` objects exist using the static counter from Section 5.

<details>
<summary><b>Answers to Part A</b></summary>

**Output**

```
START
A: built 'default', total = 1
B: no-arg constructor finishing
A: built 'custom', total = 2
C: I am default
C: I am custom
C: I am renamed
Total objects: 2
END
```

1. `this("default")` must be the first statement in the no-arg constructor, so the one-argument constructor runs to completion — printing **A** — before control returns and **B** prints.
2. `objectsMade` increments once per **actual construction**. `t3 = t2` is an assignment, not a `new`, so no third object is created. Also note `new TraceMe()` chains rather than constructing twice, so it counts once.
3. `t3` and `t2` are **aliases** for the same object, so changing the label through one is visible through the other.

</details>

---

## Section 9 Review

- `main` must be **`public static void main(String[] args)`** — the `String[]` parameter is required for the JVM to find it.
- The system **locates and runs** `main`; everything else runs only when called from it.
- `main` is `static` because it executes **before any object exists**.
- Instance members are unreachable from `main` until you create an object.

**Checkpoint Quiz**

1. Write the full, correct `main` signature from memory.
2. Why must `main` be `static`?
3. What happens if you write `public static void main()` with no parameters?
4. What does `args` contain?
5. What error appears if `main` tries to use an instance field directly?

<details>
<summary><b>Answers</b></summary>

1. `public static void main(String[] args)`
2. Because it runs before any object exists, so there is no instance for the JVM to call it on.
3. It compiles, but running it fails with "Main method not found" — the JVM looks specifically for a `main` accepting `String[]`.
4. Command-line arguments passed after the class name, as an array of strings; it is empty (length `0`) when none are given.
5. "non-static variable ... cannot be referenced from a static context."

</details>

---
---

# SECTION 10 — Capstone Project

---

## 🏆 The Library Management System

**Goal:** Combine every concept in this course into one working program. No new material — this is proof that the previous nine sections are yours.

**Concepts you must demonstrate**

| Concept | Where it appears |
| --- | --- |
| Class as blueprint | `Book`, `Member`, `Library` |
| Private fields + encapsulation | All three classes |
| Getters and setters | All three classes |
| Object instantiation | `Main` |
| References and aliasing | Borrowing updates shared objects |
| Instance methods | `borrow()`, `returnBook()` |
| Static field and method | `Book.getTotalBooks()` |
| Method overloading | `Library.findBook(...)` |
| Constructor overloading | `Member` |
| Constructor chaining with `this(...)` | `Member` |
| `this` for shadowing | Every constructor |
| Correct `main` | `Main` |

---

### Specification

**`Book.java`**

- Private fields: `title` (`String`), `author` (`String`), `isbn` (`String`), `isAvailable` (`boolean`).
- Private **static** field `totalBooks`, starting at `0`.
- A constructor taking title, author, and ISBN. It sets `isAvailable` to `true` and increments `totalBooks`. Use `this.` throughout.
- Getters for all four fields, with the boolean getter named `isAvailable()`.
- `checkOut()` — returns `boolean`. If available, marks it unavailable and returns `true`; otherwise returns `false` without changing anything.
- `returnBook()` — sets `isAvailable` to `true`.
- **Static** `getTotalBooks()`.
- `describe()` — prints `"Noli Me Tangere" by Jose Rizal [AVAILABLE]` or `[ON LOAN]`.

**`Member.java`**

- Private fields: `name` (`String`), `memberId` (`String`), `booksBorrowed` (`int`), `borrowLimit` (`int`).
- Three **overloaded, chained** constructors:
  - `Member(String name, String memberId, int borrowLimit)` — the only one with real logic; sets `booksBorrowed` to `0`.
  - `Member(String name, String memberId)` → chains with a limit of `3`.
  - `Member(String name)` → chains with the ID `"TEMP-000"` and a limit of `1`.
- `canBorrow()` — returns `boolean`: `true` when `booksBorrowed < borrowLimit`.
- `incrementBorrowed()` and `decrementBorrowed()`.
- Getters for all fields.

**`Library.java`**

- Private field: `Book[] catalog`, plus an `int bookCount`.
- Constructor taking a capacity and sizing the array.
- `addBook(Book book)` — stores it in the array.
- **Overloaded** `findBook`:
  - `findBook(String title)` — returns the first `Book` with a matching title, or `null`.
  - `findBook(String title, String author)` — matches both.
  - `findBook(int index)` — returns the book at that catalog position.
- `lendBook(Member member, String title)` — returns `boolean`. It must:
  1. Find the book. If not found, print `"Not in catalog."` and return `false`.
  2. Check `member.canBorrow()`. If not, print `"Borrow limit reached."` and return `false`.
  3. Call `book.checkOut()`. If it returns `false`, print `"Already on loan."` and return `false`.
  4. Otherwise increment the member's count, print a confirmation, and return `true`.
- `listCatalog()` — describes every book.

**`Main.java`**

- A correct `main` signature.
- Create a library with capacity `5`.
- Add three books.
- Create one member with each of the three constructors.
- Demonstrate **all four** outcomes of `lendBook`: a success, a not-found, an already-on-loan, and a limit-reached.
- Print the catalog before and after lending.
- Print `Book.getTotalBooks()` via the **class**, not an object.

---

### Sample expected output

```
=== CATALOG ===
"Noli Me Tangere" by Jose Rizal [AVAILABLE]
"El Filibusterismo" by Jose Rizal [AVAILABLE]
"Florante at Laura" by Francisco Balagtas [AVAILABLE]

Maria Santos borrowed "Noli Me Tangere"
Already on loan.
Not in catalog.
Borrow limit reached.

=== CATALOG ===
"Noli Me Tangere" by Jose Rizal [ON LOAN]
"El Filibusterismo" by Jose Rizal [AVAILABLE]
"Florante at Laura" by Francisco Balagtas [AVAILABLE]

Total books ever created: 3
```

---

### Self-assessment rubric

Score yourself honestly out of 100:

| Criterion | Points |
| --- | --- |
| All three classes compile with no errors | 10 |
| Every field is `private`; access goes through methods | 15 |
| Static field correctly counts books, accessed via the class | 10 |
| `findBook` is genuinely overloaded (3 versions, valid signatures) | 15 |
| `Member` constructors chain with `this(...)`, logic in only one | 15 |
| `this.` used correctly for shadowed parameters | 10 |
| All four `lendBook` outcomes demonstrated in `main` | 15 |
| Correct `main` signature and clean, readable output | 10 |

**Extensions if you finish early**

1. Add a `Librarian` class with a static `staffCount`.
2. Overload `addBook` to accept `(String title, String author, String isbn)` and build the `Book` internally.
3. Add a copy constructor to `Book` for duplicate copies of the same title — then think carefully about what that means for `totalBooks`.
4. Replace the array with `ArrayList<Book>` and note which methods get simpler.

---
---

# APPENDIX A — Syntax Cheat Sheet

```java
// ─── CLASS ────────────────────────────────────────────────
public class ClassName {              // UpperCamelCase noun
                                      // file must be ClassName.java

    // ─── FIELDS ───────────────────────────────────────────
    private String instanceField;     // one per object
    private static int sharedField;   // one per class
    public static final double PI = 3.14159;   // constant

    // ─── CONSTRUCTORS ─────────────────────────────────────
    public ClassName() {              // no return type, class's name
        this("default");              // chaining — MUST be first
    }

    public ClassName(String instanceField) {
        this.instanceField = instanceField;   // this.field = parameter
    }

    // ─── METHODS ──────────────────────────────────────────
    public String getInstanceField() {        // getter
        return instanceField;
    }

    public void setInstanceField(String instanceField) {   // setter
        this.instanceField = instanceField;
    }

    public static int getSharedField() {      // static: no instance access
        return sharedField;
    }

    // ─── OVERLOADING ──────────────────────────────────────
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
    public int add(int a, int b, int c) { return a + b + c; }

    // ─── ENTRY POINT ──────────────────────────────────────
    public static void main(String[] args) {
        ClassName obj = new ClassName("value");   // instantiation
        System.out.println(obj.getInstanceField());   // dot operator
        System.out.println(ClassName.getSharedField());
    }
}
```

**Default field values:** `int` → `0` · `double` → `0.0` · `boolean` → `false` · `char` → `'\u0000'` · objects → `null`

**Access modifiers:** `public` (anywhere) · `protected` (package + subclasses) · *(default)* (package only) · `private` (same class only)

---

# APPENDIX B — Common Errors and Their Causes

| Error message | Real cause | Fix |
| --- | --- | --- |
| `non-static variable x cannot be referenced from a static context` | A static method touched an instance field | Create an object, or make the member static if it truly is class-level |
| `constructor ClassName in class ClassName cannot be applied to given types` | Called `new X()` after writing a parameterized constructor | Add a no-arg constructor or pass the arguments |
| `missing return statement` | A non-`void` method has a path with no `return` | Add a final unconditional `return` |
| `method X is already defined in class Y` | Tried to overload by changing only the return type | Change the parameter list or rename |
| `call to this must be first statement in constructor` | A statement precedes `this(...)` | Move `this(...)` to the top |
| `class X is public, should be declared in a file named X.java` | Filename doesn't match the class name | Rename the file, matching case exactly |
| `NullPointerException` | Used an object field that was never assigned (`null`) | Initialize it in the constructor |
| `Error: Main method not found` | `main` lacks the `String[]` parameter | Use `public static void main(String[] args)` |
| Field stays `null` after construction, no error | Wrote `name = name;` instead of `this.name = name;` | Add `this.` |
| Every object shows the same data | Fields were marked `static` to silence errors | Remove `static` from instance fields |

---

# APPENDIX C — Full Course Self-Test

Answer without looking back. Aim for 18/20.

1. What is a class, in one sentence?
2. Why can you not "live in a blueprint"?
3. What are the three regions of a class body, in conventional order?
4. Name the four access modifiers from most to least visible.
5. What is the default value of an uninitialized `boolean` field?
6. Name the three properties every object has.
7. What two things does `new` do?
8. After `Student b = a;`, how many objects exist and why?
9. What does the dot operator do?
10. What is the difference between a parameter and an argument?
11. When is a method's return type `void`?
12. State the rule about returning from a non-`void` method.
13. What does `static` mean?
14. Why can't a static method access instance fields?
15. Give the three ways overloaded methods may differ.
16. Why isn't the return type part of a method signature?
17. Name the three defining traits of a constructor.
18. When does Java supply a default constructor?
19. What must be the first statement when chaining constructors?
20. Write the exact `main` signature.

<details>
<summary><b>Answer key</b></summary>

1. A blueprint or template defining the fields and methods its objects will have.
2. Because a class holds no data and occupies no memory — only objects built from it do.
3. Fields, constructor, methods.
4. `public`, `protected`, *(default)*, `private`.
5. `false`.
6. State, behavior, identity.
7. Allocates memory for the object and calls a constructor to initialize it.
8. One — `b` is an alias holding the same reference as `a`.
9. Accesses an object's fields and methods.
10. A parameter is a variable in the method's declaration; an argument is the actual value passed at the call.
11. When the method performs an action but returns nothing.
12. It must return a value along **every possible execution path**.
13. That the member belongs to the class itself rather than to any specific instance.
14. Because it can run when no object exists, so there is no instance whose field it could read.
15. Number, type, or order of parameters.
16. Because the return value can be ignored at the call site, so it cannot disambiguate which version was meant.
17. Same name as the class, no return type, runs automatically when `new` is used.
18. Only when the class defines no constructor at all.
19. `this(arguments)`.
20. `public static void main(String[] args)`.

</details>

---

# APPENDIX D — References for Further Study

- **Oracle Java Tutorials — "Classes and Objects":** https://docs.oracle.com/javase/tutorial/java/javaOO/
- **Oracle Java Tutorials — "Defining Methods":** https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html
- **Java Language Specification, Chapter 8 (Classes)** — advanced / optional reading.

**Where to go next:** inheritance and `extends`, interfaces, polymorphism through method overriding, abstract classes, and the collections framework (`ArrayList`, `HashMap`).

---

*Course content derived from CMSC 23 LEC 03, University of the Philippines Manila. Exercises, worked solutions, error tables, and quizzes are supplementary practice material built around that lecture.*
