/* Reference solutions. Every one of these was compiled and run before shipping;
   the expected-output blocks in exercises.js are the real captured stdout. */
const S = String.raw;

const SOLUTIONS = {

s1: { "Book.java": S`public class Book {

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

    public static void main(String[] args) {
        Book b = new Book("Noli Me Tangere", "Jose Rizal", 432);
        b.describe();
    }
}` },

s2: { "BankAccount.java": S`public class BankAccount {

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
}` },

s3: { "Roster.java": S`public class Roster {
    public static void main(String[] args) {

        Student[] roster = {
            new Student("Maria", 20, 3.8),
            new Student("John", 21, 3.4),
            new Student("Ana", 19, 3.9)
        };

        for (Student s : roster) {
            s.displayInfo();
        }

        // topStudent is an ALIAS for an object already in the array
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
}` },

s4: { "GradeCalculator.java": S`public class GradeCalculator {

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
}` },

s5: {
  "Employee.java": S`public class Employee {

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
}`,
  "MathUtils.java": S`public class MathUtils {
    public static double average(double a, double b) { return (a + b) / 2; }
    public static int max(int a, int b) { return (a > b) ? a : b; }
    public static boolean isEven(int n) { return n % 2 == 0; }
}` },

s6: { "Calculator.java": S`public class Calculator {

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
}` },

s7: { "Pizza.java": S`public class Pizza {

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
}` },

s8: { "Pizza.java": S`public class Pizza {

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

        new Pizza("Medium", "Regular", -5).describe();
        new Pizza("Medium", "Regular", 50).describe();
    }
}` },

s9b: { "Launcher.java": S`public class Launcher {
    public static void main(String[] args) {
        String name = (args.length > 0) ? args[0] : "Guest";

        Student s = new Student(name, 18, 0.0);
        s.displayInfo();

        System.out.println("Students created: " + Student.getStudentCount());
    }
}` },

s10: {
  "Book.java": S`public class Book {

    private String title;
    private String author;
    private String isbn;
    private boolean isAvailable;
    private static int totalBooks = 0;

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
        totalBooks++;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public boolean isAvailable() { return isAvailable; }

    public boolean checkOut() {
        if (!isAvailable) return false;
        isAvailable = false;
        return true;
    }

    public void returnBook() { this.isAvailable = true; }

    public static int getTotalBooks() { return totalBooks; }

    public void describe() {
        System.out.println("\"" + title + "\" by " + author
                           + (isAvailable ? " [AVAILABLE]" : " [ON LOAN]"));
    }
}`,
  "Member.java": S`public class Member {

    private String name;
    private String memberId;
    private int booksBorrowed;
    private int borrowLimit;

    // the ONLY constructor with real logic
    public Member(String name, String memberId, int borrowLimit) {
        this.name = name;
        this.memberId = memberId;
        this.borrowLimit = borrowLimit;
        this.booksBorrowed = 0;
    }

    public Member(String name, String memberId) { this(name, memberId, 3); }

    public Member(String name) { this(name, "TEMP-000", 1); }

    public boolean canBorrow() { return booksBorrowed < borrowLimit; }

    public void incrementBorrowed() { booksBorrowed++; }
    public void decrementBorrowed() { booksBorrowed--; }

    public String getName() { return name; }
    public String getMemberId() { return memberId; }
    public int getBooksBorrowed() { return booksBorrowed; }
    public int getBorrowLimit() { return borrowLimit; }
}`,
  "Library.java": S`public class Library {

    private Book[] catalog;
    private int bookCount;

    public Library(int capacity) {
        this.catalog = new Book[capacity];
        this.bookCount = 0;
    }

    public void addBook(Book book) {
        if (bookCount < catalog.length) catalog[bookCount++] = book;
    }

    public Book findBook(String title) {
        for (int i = 0; i < bookCount; i++)
            if (catalog[i].getTitle().equals(title)) return catalog[i];
        return null;
    }

    public Book findBook(String title, String author) {
        for (int i = 0; i < bookCount; i++)
            if (catalog[i].getTitle().equals(title) && catalog[i].getAuthor().equals(author))
                return catalog[i];
        return null;
    }

    public Book findBook(int index) {
        if (index < 0 || index >= bookCount) return null;
        return catalog[index];
    }

    public boolean lendBook(Member member, String title) {
        Book book = findBook(title);
        if (book == null) { System.out.println("Not in catalog."); return false; }
        if (!member.canBorrow()) { System.out.println("Borrow limit reached."); return false; }
        if (!book.checkOut()) { System.out.println("Already on loan."); return false; }
        member.incrementBorrowed();
        System.out.println(member.getName() + " borrowed \"" + title + "\"");
        return true;
    }

    public void listCatalog() {
        for (int i = 0; i < bookCount; i++) catalog[i].describe();
    }
}` }

};

if (typeof module !== "undefined") module.exports = { SOLUTIONS };
