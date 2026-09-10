/* Exercise definitions for the Java Classes & Methods trainer.
 *
 * Java sources use String.raw so that backslash escapes inside the Java code
 * (\" in particular) survive into the editor unchanged.
 *
 * checks[]        run inside the JVM against the *compiled* classes (reflection)
 * sourceChecks[]  run in JS against the learner's source text, for properties
 *                 that survive compilation invisibly -- constructor chaining
 *                 being the important one.
 */
const R = String.raw;

const EXERCISES = [

/* ---------------------------------------------------------------- 1 */
{
  id: "s1",
  section: "Section 1",
  title: "The Book Blueprint",
  goal: "Write a complete, compiling class from scratch using only the anatomy you learned.",
  concept:
    "A class is a <b>blueprint</b>. It defines the fields and methods its objects will have, " +
    "but holds no data itself. Order the body <b>fields → constructor → methods</b>.",
  steps: [
    "Declare four fields: <code>title</code> and <code>author</code> (<code>String</code>), <code>pages</code> (<code>int</code>), and <code>isCheckedOut</code> (<code>boolean</code>).",
    "Write a constructor taking title, author and pages.",
    "Inside the constructor set <code>isCheckedOut</code> to <code>false</code> — a new book starts on the shelf.",
    "Write <code>describe()</code>, returning nothing, printing the line shown in the output panel."
  ],
  files: [{ name: "Book.java", code: R`public class Book {

    // TODO: four fields


    // TODO: constructor taking title, author, pages


    // TODO: describe() method


    // ---- provided: runs your class ----
    public static void main(String[] args) {
        Book b = new Book("Noli Me Tangere", "Jose Rizal", 432);
        b.describe();
    }
}
` }],
  main: "Book",
  expected: `"Noli Me Tangere" by Jose Rizal — 432 pages`,
  checks: [
    { id: "c1", label: "Class Book exists", type: "classExists", args: ["Book"] },
    { id: "c2", label: "Has exactly four fields", type: "fieldCount", args: ["Book", "4"] },
    { id: "c3", label: "title is a String", type: "fieldType", args: ["Book", "title", "String"] },
    { id: "c4", label: "pages is an int", type: "fieldType", args: ["Book", "pages", "int"] },
    { id: "c5", label: "isCheckedOut is a boolean", type: "fieldType", args: ["Book", "isCheckedOut", "boolean"] },
    { id: "c6", label: "Constructor takes (String, String, int)", type: "ctorParams", args: ["Book", "String, String, int"] },
    { id: "c7", label: "describe() returns void", type: "methodReturns", args: ["Book", "describe", "void"] }
  ],
  hints: [
    "Fields go directly inside the class body, outside any method. Each needs a type and a name.",
    "A constructor has the same name as the class and <b>no return type</b> — not even void. Use <code>this.title = title;</code> to assign.",
    "To print a literal double-quote inside a string, escape it: <code>\\\"</code>. The dash in the expected output is an em dash — copy it from the expected output panel."
  ]
},

/* ---------------------------------------------------------------- 2 */
{
  id: "s2",
  section: "Section 2",
  title: "A Safe BankAccount",
  goal: "Build a fully encapsulated class where invalid state is impossible from the outside.",
  concept:
    "Fields are <code>private</code> to enforce <b>encapsulation</b>. A setter is a " +
    "<b>checkpoint</b> where you can validate. With a public field, any line anywhere could " +
    "set the balance to -5000 and the bug would be untraceable.",
  steps: [
    "Make all four fields <code>private</code>.",
    "The constructor takes owner and account number, and sets <code>balance</code> to <code>0.0</code> and <code>transactionCount</code> to <code>0</code>.",
    "<code>deposit(double)</code> adds and increments the count, but <b>rejects amounts of zero or less</b> with a message and no state change.",
    "<code>withdraw(double)</code> subtracts and increments, but <b>rejects amounts greater than the balance</b>.",
    "Add getters for all four fields. Add <b>no setters</b> for balance or transactionCount."
  ],
  files: [
    { name: "BankAccount.java", code: R`public class BankAccount {

    // TODO: four private fields


    // TODO: constructor (owner, accountNumber)


    // TODO: deposit(double amount)


    // TODO: withdraw(double amount)


    // TODO: getters -- but NO setters for balance or transactionCount

}
` },
    { name: "Main.java", readonly: true, code: R`public class Main {
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
` }
  ],
  main: "Main",
  expected: `Deposited: 5000.0
Withdrew: 1200.0
Insufficient funds. Balance is 3800.0
Deposit must be positive.
Final balance: 3800.0
Transactions: 2`,
  checks: [
    { id: "c1", label: "owner is private", type: "fieldPrivate", args: ["BankAccount", "owner"] },
    { id: "c2", label: "accountNumber is private", type: "fieldPrivate", args: ["BankAccount", "accountNumber"] },
    { id: "c3", label: "balance is private", type: "fieldPrivate", args: ["BankAccount", "balance"] },
    { id: "c4", label: "transactionCount is private", type: "fieldPrivate", args: ["BankAccount", "transactionCount"] },
    { id: "c5", label: "Constructor takes (String, String)", type: "ctorParams", args: ["BankAccount", "String, String"] },
    { id: "c6", label: "getBalance() returns double", type: "methodReturns", args: ["BankAccount", "getBalance", "double"] },
    { id: "c7", label: "getTransactionCount() returns int", type: "methodReturns", args: ["BankAccount", "getTransactionCount", "int"] },
    { id: "c8", label: "No setBalance() — balance changes only via deposit/withdraw", type: "methodNotExists", args: ["BankAccount", "setBalance", "Balance must only change through deposit() and withdraw()."] },
    { id: "c9", label: "No setTransactionCount()", type: "methodNotExists", args: ["BankAccount", "setTransactionCount", "The count must only change through deposit() and withdraw()."] }
  ],
  hints: [
    "Guard clauses read best: check the invalid case first, print the message, then <code>return;</code> to leave early.",
    "<code>return;</code> on its own is legal in a void method — it means \"stop here\".",
    "Order matters in withdraw(): print <code>\"Insufficient funds. Balance is \" + balance</code> using the balance <i>before</i> any change."
  ]
},

/* ---------------------------------------------------------------- 3 */
{
  id: "s3",
  section: "Section 3",
  title: "The Student Roster",
  goal: "Prove to yourself that you understand objects, aliasing and identity.",
  concept:
    "Object variables store a <b>reference</b> — a memory address — not the object. " +
    "Assigning one to another creates an <b>alias</b>, so a change through either is visible " +
    "through both. This lesson explains more real bugs than any other in the course.",
  steps: [
    "Loop through <code>roster</code> and call <code>displayInfo()</code> on each student.",
    "Find the student with the highest GPA <b>from the array</b> — do not create a new object.",
    "Append <code>\" (Dean's Lister)\"</code> to that student's name.",
    "Print <code>---</code>, then display everyone again.",
    "Notice the array changed even though you never touched the array."
  ],
  files: [
    { name: "Roster.java", code: R`public class Roster {
    public static void main(String[] args) {

        Student[] roster = {
            new Student("Maria", 20, 3.8),
            new Student("John", 21, 3.4),
            new Student("Ana", 19, 3.9)
        };

        // TODO: display everyone


        // TODO: find the highest GPA from the array (no new objects!)


        // TODO: rename the top student, adding " (Dean's Lister)"


        System.out.println("---");

        // TODO: display everyone again

    }
}
` },
    { name: "Student.java", readonly: true, code: R`public class Student {
    private String name;
    private int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    public void displayInfo() {
        System.out.println(name + " (" + age + ") GPA: " + gpa);
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getGpa() { return gpa; }
}
` }
  ],
  main: "Roster",
  expected: `Maria (20) GPA: 3.8
John (21) GPA: 3.4
Ana (19) GPA: 3.9
---
Maria (20) GPA: 3.8
John (21) GPA: 3.4
Ana (Dean's Lister) (19) GPA: 3.9`,
  checks: [
    { id: "c1", label: "Class Roster exists", type: "classExists", args: ["Roster"] },
    { id: "c2", label: "main is static", type: "methodStatic", args: ["Roster", "main"] }
  ],
  sourceChecks: [
    { id: "sc1", file: "Roster.java", kind: "maxMatches", pattern: "new\\s+Student", max: 3,
      label: "Only the original three Student objects exist",
      fail: "You created a new Student. The point of this exercise is that <code>topStudent</code> must be an <b>alias</b> for one already in the array — assign it from <code>roster</code>, never with <code>new</code>." },
    { id: "sc2", file: "Roster.java", kind: "mustMatch", pattern: "for\\s*\\(",
      label: "Uses a loop to walk the roster",
      fail: "Use a loop — an enhanced for loop reads best: <code>for (Student s : roster)</code>." }
  ],
  hints: [
    "Start <code>topStudent</code> at <code>roster[0]</code>, then loop comparing <code>s.getGpa() &gt; topStudent.getGpa()</code>.",
    "To rename: <code>topStudent.setName(topStudent.getName() + \" (Dean's Lister)\");</code>",
    "The array changes because <code>topStudent</code> and <code>roster[2]</code> are two labels on the <b>same object</b>. There is no copy anywhere."
  ]
},

/* ---------------------------------------------------------------- 4 */
{
  id: "s4",
  section: "Section 4",
  title: "The Grade Calculator",
  goal: "Write a class whose entire value lies in its methods.",
  concept:
    "Every <b>non-void method must return a value along every possible execution path</b>. " +
    "A chain of <code>if</code>s with no final <code>return</code> will not compile.",
  steps: [
    "Three private fields: <code>studentName</code>, <code>examScore</code>, <code>classStanding</code>.",
    "<code>calculateFinalGrade()</code> returns a <code>double</code>: 60% exam + 40% class standing.",
    "<code>getLetterEquivalent()</code> returns a <code>String</code> — A≥90, B≥80, C≥70, D≥60, otherwise F — with a guaranteed return on every path.",
    "<code>isPassing()</code> returns a <code>boolean</code>: true when the final grade is at least 60.",
    "<code>printSummary()</code> returns void and calls the other three rather than recomputing."
  ],
  files: [{ name: "GradeCalculator.java", code: R`public class GradeCalculator {

    // TODO: three private fields


    // TODO: constructor (studentName, examScore, classStanding)


    // TODO: calculateFinalGrade() -> double


    // TODO: getLetterEquivalent() -> String


    // TODO: isPassing() -> boolean


    // TODO: printSummary() -> void
    //   prints:  Maria Santos | Final: 87.8 | Grade: B | PASSED


    // ---- provided: runs your class ----
    public static void main(String[] args) {
        new GradeCalculator("Maria Santos", 85, 92).printSummary();
        new GradeCalculator("John Cruz", 58, 63).printSummary();
        new GradeCalculator("Ana Reyes", 40, 35).printSummary();
    }
}
` }],
  main: "GradeCalculator",
  expected: `Maria Santos | Final: 87.80000000000001 | Grade: B | PASSED
John Cruz | Final: 60.0 | Grade: D | PASSED
Ana Reyes | Final: 38.0 | Grade: F | FAILED`,
  expectedNote:
    "Yes, <code>87.80000000000001</code> is correct and not your bug. <code>double</code> cannot " +
    "represent 0.6 or 0.4 exactly in binary, so tiny errors accumulate. To display two decimals " +
    "you would use <code>String.format(\"%.2f\", value)</code>.",
  checks: [
    { id: "c1", label: "studentName is private", type: "fieldPrivate", args: ["GradeCalculator", "studentName"] },
    { id: "c2", label: "examScore is private", type: "fieldPrivate", args: ["GradeCalculator", "examScore"] },
    { id: "c3", label: "classStanding is private", type: "fieldPrivate", args: ["GradeCalculator", "classStanding"] },
    { id: "c4", label: "calculateFinalGrade() returns double", type: "methodReturns", args: ["GradeCalculator", "calculateFinalGrade", "double"] },
    { id: "c5", label: "getLetterEquivalent() returns String", type: "methodReturns", args: ["GradeCalculator", "getLetterEquivalent", "String"] },
    { id: "c6", label: "isPassing() returns boolean", type: "methodReturns", args: ["GradeCalculator", "isPassing", "boolean"] },
    { id: "c7", label: "printSummary() returns void", type: "methodReturns", args: ["GradeCalculator", "printSummary", "void"] }
  ],
  hints: [
    "Early returns keep the letter scale flat and readable: <code>if (g >= 90) return \"A\";</code> then the next, and a bare <code>return \"F\";</code> at the end.",
    "<code>isPassing()</code> can just be <code>return calculateFinalGrade() >= 60;</code> — methods calling methods is normal and good.",
    "The ternary is tidy for the status: <code>String status = isPassing() ? \"PASSED\" : \"FAILED\";</code>"
  ]
},

/* ---------------------------------------------------------------- 5 */
{
  id: "s5",
  section: "Section 5",
  title: "Counter and Utility",
  goal: "Use static members for the two jobs they are actually good at.",
  concept:
    "<code>static</code> means the member belongs to the <b>class itself</b>, not to any instance. " +
    "A counter must be static because the count describes the class as a whole — a per-object " +
    "copy would always read 1.",
  steps: [
    "<code>Employee</code>: private instance fields <code>name</code>, <code>salary</code>, <code>employeeId</code>.",
    "A private <b>static</b> <code>nextId</code> starting at 1000, and a static <code>employeeCount</code>.",
    "The constructor assigns <code>employeeId</code> from <code>nextId</code>, increments <code>nextId</code>, and increments <code>employeeCount</code>.",
    "A static <code>getEmployeeCount()</code>, and an instance <code>describe()</code> printing <code>[1000] Maria Santos — 45000.0</code>.",
    "<code>MathUtils</code>: three pure static helpers, callable without ever creating an object."
  ],
  files: [
    { name: "Employee.java", code: R`public class Employee {

    // TODO: private instance fields: name, salary, employeeId


    // TODO: private static nextId = 1000, and static employeeCount


    // TODO: constructor (name, salary) -- assign a sequential id


    // TODO: static getEmployeeCount()


    public double getSalary() { return salary; }

    // TODO: describe()  ->  [1000] Maria Santos — 45000.0

}
` },
    { name: "MathUtils.java", code: R`public class MathUtils {

    // TODO: static double average(double a, double b)

    // TODO: static int max(int a, int b)

    // TODO: static boolean isEven(int n)

}
` },
    { name: "Main.java", readonly: true, code: R`public class Main {
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
` }
  ],
  main: "Main",
  expected: `[1000] Maria Santos — 45000.0
[1001] John Cruz — 52000.0
[1002] Ana Reyes — 48000.0
Total employees: 3
Average: 48500.0
Max: 52000
Is 3 even? false`,
  checks: [
    { id: "c1", label: "nextId is static", type: "fieldStatic", args: ["Employee", "nextId"] },
    { id: "c2", label: "employeeCount is static", type: "fieldStatic", args: ["Employee", "employeeCount"] },
    { id: "c3", label: "name is an instance field, not static", type: "fieldNotStatic", args: ["Employee", "name"] },
    { id: "c4", label: "employeeId is an instance field, not static", type: "fieldNotStatic", args: ["Employee", "employeeId"] },
    { id: "c5", label: "name is private", type: "fieldPrivate", args: ["Employee", "name"] },
    { id: "c6", label: "getEmployeeCount() is static", type: "methodStatic", args: ["Employee", "getEmployeeCount"] },
    { id: "c7", label: "MathUtils.average() is static", type: "methodStatic", args: ["MathUtils", "average"] },
    { id: "c8", label: "MathUtils.max() is static", type: "methodStatic", args: ["MathUtils", "max"] },
    { id: "c9", label: "MathUtils.isEven() returns boolean", type: "methodReturns", args: ["MathUtils", "isEven", "boolean"] }
  ],
  hints: [
    "In the constructor: <code>this.employeeId = nextId; nextId++;</code> — read the shared counter, then bump it.",
    "<code>employeeId</code> must NOT be static. If it were, all three employees would share one id.",
    "<code>isEven</code> is one line: <code>return n % 2 == 0;</code>"
  ]
},

/* ---------------------------------------------------------------- 6 */
{
  id: "s6",
  section: "Section 6",
  title: "The Flexible Calculator",
  goal: "Build a class whose API feels effortless because of overloading.",
  concept:
    "<b>Overloading</b> means the same method name with <b>different parameter lists</b> — " +
    "differing in number, type, or order. The <b>return type is not part of the signature</b>, " +
    "so changing only the return type is a compile error, not an overload.",
  steps: [
    "Four versions of <code>add</code>: <code>(int,int)</code>, <code>(double,double)</code>, <code>(int,int,int)</code>, and <code>(int[])</code>.",
    "Three versions of <code>describe</code> returning <code>String</code>.",
    "<code>describe(String name)</code> → <code>Hello, Maria</code>",
    "<code>describe(String name, int age)</code> → <code>Hello, Maria (20)</code>",
    "<code>describe(int age, String name)</code> → <code>Age 20: Maria</code> — note the reversed order is a valid, distinct overload."
  ],
  files: [{ name: "Calculator.java", code: R`public class Calculator {

    // TODO: add(int, int) -> int

    // TODO: add(double, double) -> double

    // TODO: add(int, int, int) -> int

    // TODO: add(int[]) -> int   (sum of the array)


    // TODO: describe(String) -> "Hello, Maria"

    // TODO: describe(String, int) -> "Hello, Maria (20)"

    // TODO: describe(int, String) -> "Age 20: Maria"


    // ---- provided: runs your class ----
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
` }],
  main: "Calculator",
  expected: `5
7.5
9
100
Hello, Maria
Hello, Maria (20)
Age 20: Maria`,
  checks: [
    { id: "c1", label: "Four overloads of add()", type: "overloadCount", args: ["Calculator", "add", "4"] },
    { id: "c2", label: "Three overloads of describe()", type: "overloadCount", args: ["Calculator", "describe", "3"] }
  ],
  hints: [
    "For the array version an enhanced for loop is cleanest: <code>for (int n : numbers) sum += n;</code>",
    "The two-argument <code>describe</code> overloads differ only in parameter <b>order</b> — that is enough to make them distinct signatures.",
    "If you get \"already defined\", two of your methods have identical parameter lists. Parameter <i>names</i> do not distinguish them; only types, count and order do."
  ]
},

/* ---------------------------------------------------------------- 7 */
{
  id: "s7",
  section: "Section 7",
  title: "The Pizza Order",
  goal: "Design a class where constructor overloading makes the API pleasant.",
  concept:
    "A <b>constructor</b> shares the class's exact name, has <b>no return type</b>, and runs " +
    "when <code>new</code> is used. <b>Constructor overloading</b> gives callers several ways " +
    "to build an object.",
  steps: [
    "Four private fields: <code>size</code>, <code>crust</code> (<code>String</code>), <code>toppings</code> (<code>int</code>), <code>price</code> (<code>double</code>).",
    "Four overloaded constructors: <code>()</code>, <code>(String)</code>, <code>(String,String)</code>, <code>(String,String,int)</code>.",
    "Defaults are Medium / Regular / 0 toppings.",
    "Every constructor ends by calling a private <code>calculatePrice()</code>: Small 200, Medium 300, Large 400; Stuffed adds 80; each topping adds 35.",
    "<code>describe()</code> prints <code>Large Stuffed pizza, 3 topping(s) — P585.0</code>."
  ],
  note:
    "Write this the obvious way, with each constructor assigning its own fields. " +
    "The duplication is deliberate — Section 8 is where you remove it.",
  files: [{ name: "Pizza.java", code: R`public class Pizza {

    // TODO: four private fields


    // TODO: Pizza()                            -> Medium, Regular, 0

    // TODO: Pizza(String size)                 -> that size, Regular, 0

    // TODO: Pizza(String size, String crust)   -> that size and crust, 0

    // TODO: Pizza(String size, String crust, int toppings)


    // TODO: private void calculatePrice()


    // TODO: describe()


    // ---- provided: runs your class ----
    public static void main(String[] args) {
        new Pizza().describe();
        new Pizza("Large").describe();
        new Pizza("Small", "Thin").describe();
        new Pizza("Large", "Stuffed", 3).describe();
    }
}
` }],
  main: "Pizza",
  expected: `Medium Regular pizza, 0 topping(s) — P300.0
Large Regular pizza, 0 topping(s) — P400.0
Small Thin pizza, 0 topping(s) — P200.0
Large Stuffed pizza, 3 topping(s) — P585.0`,
  checks: [
    { id: "c1", label: "Four constructors", type: "ctorCount", args: ["Pizza", "4"] },
    { id: "c2", label: "size is private", type: "fieldPrivate", args: ["Pizza", "size"] },
    { id: "c3", label: "price is private", type: "fieldPrivate", args: ["Pizza", "price"] },
    { id: "c4", label: "calculatePrice() exists", type: "methodExists", args: ["Pizza", "calculatePrice"] },
    { id: "c5", label: "describe() returns void", type: "methodReturns", args: ["Pizza", "describe", "void"] }
  ],
  hints: [
    "Compare Strings with <code>.equals()</code>, never <code>==</code>: <code>if (size.equals(\"Small\"))</code>.",
    "<code>calculatePrice()</code> should compute a <code>base</code>, add 80 for Stuffed, then set <code>price = base + (toppings * 35);</code>",
    "The default branch handles Medium <i>and</i> any unrecognised size — use <code>else base = 300;</code>"
  ]
},

/* ---------------------------------------------------------------- 8 */
{
  id: "s8",
  section: "Section 8",
  title: "Refactor with this(...)",
  goal: "Take the duplicated Pizza class from Section 7 and cut it down using constructor chaining.",
  concept:
    "<code>this(arguments)</code> calls one constructor from another in the same class. " +
    "One constructor holds the real logic; the others delegate. Add a validation rule later " +
    "and you add it <b>once</b>. <code>this(...)</code> must be the <b>very first statement</b>.",
  steps: [
    "<b>Only the three-argument constructor</b> may contain real assignment logic.",
    "The other three must delegate with <code>this(...)</code> as their <b>only</b> statement.",
    "The three-argument constructor validates: toppings below 0 become 0, above 10 become 10.",
    "Behaviour and output stay <b>identical</b> to Section 7 for the first four pizzas.",
    "Add <code>getPricePerTopping()</code> returning <code>this.price / (this.toppings + 1)</code>."
  ],
  note:
    "This is the one exercise where matching the expected output proves nothing — pasting your " +
    "Section 7 answer produces byte-identical output. The structural checks below are what " +
    "actually grade this exercise.",
  files: [{ name: "Pizza.java", code: R`public class Pizza {

    private String size;
    private String crust;
    private int toppings;
    private double price;

    // TODO: delegate to the 3-arg constructor -- one statement only
    public Pizza() {

    }

    // TODO: delegate
    public Pizza(String size) {

    }

    // TODO: delegate
    public Pizza(String size, String crust) {

    }

    // The ONLY constructor with real logic. Clamp toppings to 0..10 here.
    public Pizza(String size, String crust, int toppings) {

    }

    private void calculatePrice() {
        double base;
        if (this.size.equals("Small")) base = 200;
        else if (this.size.equals("Large")) base = 400;
        else base = 300;

        if (this.crust.equals("Stuffed")) base += 80;

        this.price = base + (this.toppings * 35);
    }

    // TODO: getPricePerTopping() -> this.price / (this.toppings + 1)


    public void describe() {
        System.out.println(size + " " + crust + " pizza, "
                           + toppings + " topping(s) — P" + price);
    }

    // ---- provided: runs your class ----
    public static void main(String[] args) {
        new Pizza().describe();
        new Pizza("Large").describe();
        new Pizza("Small", "Thin").describe();
        new Pizza("Large", "Stuffed", 3).describe();

        new Pizza("Medium", "Regular", -5).describe();   // must clamp to 0
        new Pizza("Medium", "Regular", 50).describe();   // must clamp to 10
    }
}
` }],
  main: "Pizza",
  expected: `Medium Regular pizza, 0 topping(s) — P300.0
Large Regular pizza, 0 topping(s) — P400.0
Small Thin pizza, 0 topping(s) — P200.0
Large Stuffed pizza, 3 topping(s) — P585.0
Medium Regular pizza, 0 topping(s) — P300.0
Medium Regular pizza, 10 topping(s) — P650.0`,
  checks: [
    { id: "c1", label: "Still four constructors", type: "ctorCount", args: ["Pizza", "4"] },
    { id: "c2", label: "getPricePerTopping() returns double", type: "methodReturns", args: ["Pizza", "getPricePerTopping", "double"] }
  ],
  sourceChecks: [
    { id: "sc1", file: "Pizza.java", kind: "ctorChainCount", cls: "Pizza", count: 3,
      label: "Exactly three constructors delegate with this(...)",
      fail: "The three short constructors must each delegate with <code>this(...)</code> as their only statement. If you assigned fields directly in them you have rebuilt Section 7 — the output looks identical, but the duplication is exactly what this section removes." },
    { id: "sc2", file: "Pizza.java", kind: "ctorChainFirstStatement", cls: "Pizza",
      label: "Every this(...) is the first statement",
      fail: "<code>this(...)</code> must be the <b>very first statement</b> in a constructor — not even a <code>System.out.println</code> may come before it." },
    { id: "sc3", file: "Pizza.java", kind: "clampOnce", 
      label: "Clamping logic is written only once",
      fail: "The 0..10 clamp should appear once, inside the three-argument constructor. If it is repeated, the refactor has not achieved anything." }
  ],
  hints: [
    "<code>public Pizza() { this(\"Medium\", \"Regular\", 0); }</code> — that is the entire body.",
    "In the three-argument constructor, clamp before assigning: <code>if (toppings &lt; 0) this.toppings = 0; else if (toppings &gt; 10) this.toppings = 10; else this.toppings = toppings;</code>",
    "Remember to call <code>calculatePrice();</code> at the end of the three-argument constructor — it is the only one that should."
  ]
},

/* ---------------------------------------------------------------- 9A */
{
  id: "s9a",
  section: "Section 9",
  title: "Trace the Flow",
  goal: "Predict a program's exact output before running it, then verify.",
  mode: "predict",
  concept:
    "Execution is strictly top-down from <code>main</code>. Constructor chaining, static counters " +
    "and aliasing all interact here. Read the code and write down what it prints — " +
    "<b>before</b> you run it.",
  steps: [
    "Read <code>TraceMe.java</code> carefully. Do not run it yet.",
    "Type your predicted output, exactly, into the box on the right.",
    "Press <b>Check prediction</b>. Your text is compared against what the program really prints.",
    "Then answer for yourself: why does <b>A</b> print before <b>B</b>? Why is the total 2, not 3?"
  ],
  files: [{ name: "TraceMe.java", readonly: true, code: R`public class TraceMe {

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
` }],
  main: "TraceMe",
  expected: `START
A: built 'default', total = 1
B: no-arg constructor finishing
A: built 'custom', total = 2
C: I am default
C: I am custom
C: I am renamed
Total objects: 2
END`,
  checks: [],
  hints: [
    "<code>this(\"default\")</code> must be the first statement, so the one-argument constructor runs to completion — printing A — before control returns and B prints.",
    "<code>objectsMade</code> increments once per real construction. <code>t3 = t2</code> is an assignment, not a <code>new</code>.",
    "<code>t3</code> and <code>t2</code> are aliases for the same object, so renaming through one is visible through the other."
  ],
  explain: [
    "<b>Why A before B?</b> <code>this(\"default\")</code> must be the first statement in the no-arg constructor, so the one-argument constructor runs fully — printing A — before control returns and B prints.",
    "<b>Why 2 and not 3?</b> The counter increments once per actual construction. <code>new TraceMe()</code> chains rather than constructing twice, so it counts once; and <code>t3 = t2</code> creates no object at all.",
    "<b>Why did renaming t3 change t2?</b> They are aliases holding the same reference, so both reach the one object."
  ]
},

/* ---------------------------------------------------------------- 9B */
{
  id: "s9b",
  section: "Section 9",
  title: "The Launcher",
  goal: "Write a correct entry point from scratch.",
  concept:
    "<code>main</code> must be <code>public static void main(String[] args)</code>. The " +
    "<code>String[]</code> parameter is required — without it the class compiles but the JVM " +
    "cannot find it and fails with \"Main method not found\". It is <code>static</code> because " +
    "it runs <b>before any object exists</b>.",
  steps: [
    "Write a correct <code>main</code> signature.",
    "If a command-line argument is given, use it as the student's name; otherwise default to <code>\"Guest\"</code>.",
    "Create a <code>Student</code> with that name, age 18, GPA 0.0.",
    "Call <code>displayInfo()</code>.",
    "Print how many Student objects exist, using the static counter — via the <b>class</b>, not an object."
  ],
  note: "The IDE runs your program with no command-line arguments, so the name should come out as Guest.",
  files: [
    { name: "Launcher.java", code: R`public class Launcher {

    // TODO: a correct main signature


        // TODO: name = args[0] if present, otherwise "Guest"

        // TODO: create the Student, display it

        // TODO: print  Students created: 1

}
` },
    { name: "Student.java", readonly: true, code: R`public class Student {
    private String name;
    private int age;
    private double gpa;
    private static int studentCount = 0;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        studentCount++;
    }

    public void displayInfo() {
        System.out.println(name + " (" + age + ") GPA: " + gpa);
    }

    public String getName() { return name; }
    public double getGpa() { return gpa; }
    public static int getStudentCount() { return studentCount; }
}
` }
  ],
  main: "Launcher",
  expected: `Guest (18) GPA: 0.0
Students created: 1`,
  checks: [
    { id: "c1", label: "Class Launcher exists", type: "classExists", args: ["Launcher"] },
    { id: "c2", label: "main() is static", type: "methodStatic", args: ["Launcher", "main"] },
    { id: "c3", label: "main() returns void", type: "methodReturns", args: ["Launcher", "main", "void"] }
  ],
  sourceChecks: [
    { id: "sc1", file: "Launcher.java", kind: "mustMatch", pattern: "String\\s*\\[\\s*\\]\\s*\\w+|String\\s*\\.\\.\\.\\s*\\w+",
      label: "main takes a String[] parameter",
      fail: "<code>main</code> must accept <code>String[] args</code>. Without it the class compiles but the JVM cannot find the entry point." },
    { id: "sc2", file: "Launcher.java", kind: "mustMatch", pattern: "args\\s*\\.\\s*length",
      label: "Guards on args.length before reading args[0]",
      fail: "Check <code>args.length &gt; 0</code> before touching <code>args[0]</code>, or running with no arguments throws ArrayIndexOutOfBoundsException." },
    { id: "sc3", file: "Launcher.java", kind: "mustMatch", pattern: "Student\\s*\\.\\s*getStudentCount",
      label: "Reads the counter via the class, not an object",
      fail: "Call it as <code>Student.getStudentCount()</code>. It is a static member, so reaching it through the class is the correct style." }
  ],
  hints: [
    "The signature, exactly: <code>public static void main(String[] args)</code>",
    "<code>String name = (args.length &gt; 0) ? args[0] : \"Guest\";</code>",
    "Print the count with <code>Student.getStudentCount()</code> — through the class, because the counter belongs to the class."
  ]
},

/* ---------------------------------------------------------------- 10 */
{
  id: "s10",
  section: "Section 10",
  title: "Capstone — Library Management System",
  goal: "Combine every concept in this course into one working program.",
  capstone: true,
  concept:
    "No new material. This is proof that the previous nine sections are yours: encapsulation, " +
    "a static counter, method overloading, constructor chaining, aliasing, and a correct entry point.",
  steps: [
    "<b>Book</b>: private fields + a private static <code>totalBooks</code>; <code>checkOut()</code> returns boolean; static <code>getTotalBooks()</code>.",
    "<b>Member</b>: three <b>chained</b> constructors — only the three-argument one holds real logic.",
    "<b>Library</b>: a <code>Book[]</code> catalog and <b>three overloads</b> of <code>findBook</code>.",
    "<code>lendBook</code> must handle all four outcomes in order: not in catalog, borrow limit reached, already on loan, success.",
    "The provided <code>Main</code> exercises all four outcomes — match its output exactly."
  ],
  files: [
    { name: "Book.java", code: R`public class Book {

    // TODO: private title, author, isbn, isAvailable
    // TODO: private static totalBooks = 0


    // TODO: constructor (title, author, isbn)
    //       sets isAvailable = true and increments totalBooks


    // TODO: getters -- the boolean one is named isAvailable()


    // TODO: checkOut() -> boolean
    //       if available, mark unavailable and return true; else return false


    // TODO: returnBook()


    // TODO: static getTotalBooks()


    // TODO: describe()
    //       "Noli Me Tangere" by Jose Rizal [AVAILABLE]   (or [ON LOAN])

}
` },
    { name: "Member.java", code: R`public class Member {

    // TODO: private name, memberId, booksBorrowed, borrowLimit


    // The ONLY constructor with real logic
    public Member(String name, String memberId, int borrowLimit) {

    }

    // TODO: chain to the constructor above with a limit of 3
    public Member(String name, String memberId) {

    }

    // TODO: chain with id "TEMP-000" and a limit of 1
    public Member(String name) {

    }


    // TODO: canBorrow() -> booksBorrowed < borrowLimit

    // TODO: incrementBorrowed(), decrementBorrowed()

    // TODO: getters

}
` },
    { name: "Library.java", code: R`public class Library {

    private Book[] catalog;
    private int bookCount;

    public Library(int capacity) {
        this.catalog = new Book[capacity];
        this.bookCount = 0;
    }

    // TODO: addBook(Book book)


    // TODO: findBook(String title)            -> first title match, or null

    // TODO: findBook(String title, String author) -> match both, or null

    // TODO: findBook(int index)               -> book at that position


    // TODO: lendBook(Member member, String title) -> boolean
    //   1. not found          -> print "Not in catalog."       return false
    //   2. !member.canBorrow() -> print "Borrow limit reached." return false
    //   3. !book.checkOut()    -> print "Already on loan."      return false
    //   4. otherwise increment, print the confirmation, return true


    // TODO: listCatalog()

}
` },
    { name: "Main.java", readonly: true, code: R`public class Main {
    public static void main(String[] args) {
        Library library = new Library(5);
        library.addBook(new Book("Noli Me Tangere", "Jose Rizal", "978-001"));
        library.addBook(new Book("El Filibusterismo", "Jose Rizal", "978-002"));
        library.addBook(new Book("Florante at Laura", "Francisco Balagtas", "978-003"));

        Member maria = new Member("Maria Santos", "M-001", 2);
        Member john  = new Member("John Cruz", "M-002");
        Member guest = new Member("Ana Reyes");

        System.out.println("=== CATALOG ===");
        library.listCatalog();
        System.out.println();

        library.lendBook(maria, "Noli Me Tangere");   // success
        library.lendBook(john,  "Noli Me Tangere");   // already on loan
        library.lendBook(john,  "Ang Alamat");        // not in catalog
        guest.incrementBorrowed();                    // guest limit is 1
        library.lendBook(guest, "El Filibusterismo"); // limit reached
        System.out.println();

        System.out.println("=== CATALOG ===");
        library.listCatalog();
        System.out.println();
        System.out.println("Total books ever created: " + Book.getTotalBooks());
    }
}
` }
  ],
  main: "Main",
  expected: `=== CATALOG ===
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

Total books ever created: 3`,
  checks: [
    { id: "c1", label: "Book.title is private", type: "fieldPrivate", args: ["Book", "title"] },
    { id: "c2", label: "Book.isAvailable is private", type: "fieldPrivate", args: ["Book", "isAvailable"] },
    { id: "c3", label: "Book.totalBooks is static", type: "fieldStatic", args: ["Book", "totalBooks"] },
    { id: "c4", label: "Book.getTotalBooks() is static", type: "methodStatic", args: ["Book", "getTotalBooks"] },
    { id: "c5", label: "Book.checkOut() returns boolean", type: "methodReturns", args: ["Book", "checkOut", "boolean"] },
    { id: "c6", label: "Member has three constructors", type: "ctorCount", args: ["Member", "3"] },
    { id: "c7", label: "Member.booksBorrowed is private", type: "fieldPrivate", args: ["Member", "booksBorrowed"] },
    { id: "c8", label: "Member.canBorrow() returns boolean", type: "methodReturns", args: ["Member", "canBorrow", "boolean"] },
    { id: "c9", label: "Three overloads of findBook()", type: "overloadCount", args: ["Library", "findBook", "3"] },
    { id: "c10", label: "Library.lendBook() returns boolean", type: "methodReturns", args: ["Library", "lendBook", "boolean"] }
  ],
  sourceChecks: [
    { id: "sc1", file: "Member.java", kind: "ctorChainCount", cls: "Member", count: 2,
      label: "Two Member constructors chain with this(...)",
      fail: "The two shorter <code>Member</code> constructors must delegate with <code>this(...)</code>. Only the three-argument one may assign fields." }
  ],
  hints: [
    "Build it one class at a time. Get <code>Book</code> compiling and its checks green before you touch <code>Member</code>.",
    "In <code>lendBook</code>, the order of the three guard clauses matters — the expected output depends on it. Find, then limit, then check out.",
    "<code>describe()</code> uses a ternary for the tag: <code>+ (isAvailable ? \" [AVAILABLE]\" : \" [ON LOAN]\")</code>. Note the leading space inside each string."
  ]
}

];

if (typeof module !== "undefined") module.exports = { EXERCISES };
