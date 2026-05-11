# 🔷 TypeScript Complete Learning Guide
> Basics · OOP · DOM Manipulation — A full reference for teaching TypeScript from the ground up.
> Includes real-world examples, type-safety patterns, advanced types & utility types.

---

## 📚 Table of Contents

### 🟡 Part 1 — Basics
1. [What is TypeScript?](#1-what-is-typescript)
2. [Setup & Installation](#2-setup--installation)
3. [Variables & Type Annotations](#3-variables--type-annotations)
4. [Type Inference](#4-type-inference)
5. [Type Alias — Custom Types](#5-type-alias--custom-types)
6. [Union Types](#6-union-types)
7. [Intersection Types](#7-intersection-types)
8. [Literal Types](#8-literal-types)
9. [Operators](#9-operators)
10. [Conditions](#10-conditions)
11. [Loops](#11-loops)
12. [Functions & Overloading](#12-functions--overloading)
13. [Arrays & Tuples](#13-arrays--tuples)
14. [Objects](#14-objects)
15. [Enums](#15-enums)
16. [Type Guards & Type Checking](#16-type-guards--type-checking)
17. [Type Assertions & Non-null](#17-type-assertions--non-null)
18. [Interfaces](#18-interfaces)
19. [Generics](#19-generics)
20. [Advanced Types (Conditional, Mapped, Utility)](#20-advanced-types)

### 🔵 Part 2 — OOP
21. [Classes & Objects](#21-classes--objects)
22. [Constructors](#22-constructors)
23. [Access Modifiers](#23-access-modifiers)
24. [Readonly & Optional Properties](#24-readonly--optional-properties)
25. [Getters & Setters](#25-getters--setters)
26. [Inheritance (extends)](#26-inheritance-extends)
27. [Method Overriding](#27-method-overriding)
28. [Abstract Classes](#28-abstract-classes)
29. [Interfaces in OOP](#29-interfaces-in-oop)
30. [Polymorphism](#30-polymorphism)
31. [Static Members](#31-static-members)
32. [Generics in Classes](#32-generics-in-classes)
33. [Practical OOP Example — Calculator](#33-practical-oop-example--calculator)

### 🟠 Part 3 — Built-in Methods
34. [Array Methods](#34-array-methods)
35. [String Methods](#35-string-methods)
36. [Object Methods](#36-object-methods)
37. [Math Methods](#37-math-methods)
38. [Date Methods](#38-date-methods)

### 🟣 Part 4 — Callbacks & Async
39. [Callbacks & Higher-order Functions](#39-callbacks--higher-order-functions)
40. [Promises](#40-promises)
41. [Async / Await](#41-async--await)

### 🟢 Part 5 — DOM Manipulation
42. [Selecting Elements](#42-selecting-elements)
43. [Changing Content & Styles](#43-changing-content--styles)
44. [Creating & Appending Elements](#44-creating--appending-elements)
45. [Event Listeners](#45-event-listeners)
46. [Form Handling & Validation](#46-form-handling--validation)
47. [Class & Attribute Manipulation](#47-class--attribute-manipulation)
48. [DOM Traversal](#48-dom-traversal)
49. [Timers](#49-timers)
50. [Fetch API (HTTP Requests)](#50-fetch-api-http-requests)
51. [Full Mini Project — Todo App](#51-full-mini-project--todo-app)

---

# 🟡 PART 1 — BASICS

---

## 1. What is TypeScript?

TypeScript is a **strongly typed superset of JavaScript** developed by Microsoft.
- TypeScript adds **static types** to JavaScript
- TypeScript code compiles down to plain JavaScript
- Catches errors **at compile time**, not at runtime

```
TypeScript (.ts) → TypeScript Compiler (tsc) → JavaScript (.js)
```

### Why TypeScript over JavaScript?
| Feature | JavaScript | TypeScript |
|---------|-----------|------------|
| Type checking | ❌ Runtime only | ✅ Compile time |
| Autocompletion | Limited | Rich IDE support |
| OOP (interfaces, abstract) | Partial | Full support |
| Error detection | At runtime | At coding time |
| Large projects | Gets messy | Scales well |

---

## 2. Setup & Installation

```bash
# Initialize a Node project
npm init -y

# Install TypeScript + dev tools
npm install typescript ts-node tsx @types/node --save-dev

# Generate tsconfig.json
npx tsc --init
```

### Install packages
```bash
npm install              # install all packages from existing config
npm install package_name # install a specific package
```

### tsconfig.json (key settings)
```json
{
  "compilerOptions": {
    "target": "ES6",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noImplicitAny": true
  }
}
```
> Create `/src` and `/dist` folders to match `rootDir` and `outDir`.

### package.json scripts
```json
"main": "index.js",
"scripts": {
  "build":      "tsc",
  "start":      "node ./dist/filename.js",
  "start:all":  "npm run build && npm run start",
  "dev":        "tsx src/filename.ts",
  "scrap:all":  "tsx src/filename.ts",
  "scrap2:all": "npm run build && node ./dist/filename.js"
}
```

### Running your code
```bash
tsx src/filename.ts                 # direct run — best in development
npx ts-node file_name.ts    # direct run
npm run build                # compile TypeScript → JavaScript
node ./dist/filename.js      # run compiled output
npm run start:all            # build + run (production)
npm run scrap:all            # tsx direct run (development)
```

---

## 3. Variables & Type Annotations

```typescript
// Explicit type annotation
let x: number;
let y: number = 20;
let name: string = "Samrat";
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// any — disables type checking (avoid when possible)
let data: any = "hello";
data = 42;    // OK
data = true;  // OK

// unknown — safer than any (must check type before use)
let input: unknown = "hello";
if (typeof input === "string") {
    console.log(input.toUpperCase()); // safe
}

// void — function that returns nothing
function greet(): void {
    console.log("Hello!");
}

// never — function that never returns
function throwError(msg: string): never {
    throw new Error(msg);
}

// Array types
const nameList: string[] = ['Sam', 'Samrat'];
const infoList: any[]    = ["Samrat", 26, true];

// Tuple — fixed length, fixed types at each position
const fixedInfo: [string, number] = ["Sam", 27];

// Typed object (inline)
let teacherInfo: { name: string; id: number } = {
    name: "Samrat",
    id: 3,
};
```

### Type Table
| Type | Example | Notes |
|------|---------|-------|
| `string` | `"hello"` | Text |
| `number` | `42`, `3.14` | Int & float both |
| `boolean` | `true` / `false` | |
| `null` | `null` | Explicit empty |
| `undefined` | `undefined` | Not assigned |
| `any` | anything | Escape hatch — avoid |
| `unknown` | anything | Safe any — narrow before use |
| `void` | (no return) | Functions |
| `never` | (unreachable) | Throws / infinite loops |

---

## 4. Type Inference

TypeScript automatically infers types from values — no annotation needed.

```typescript
let age   = 25;                  // inferred: number
let email = "test@example.com";  // inferred: string
let flag  = true;                // inferred: boolean

// age = "hello"; // ❌ Error — inferred as number

// Inference in functions
function double(n: number) {
    return n * 2;  // return type inferred as number
}

let result = double(5); // result inferred as number
```

---

## 5. Type Alias — Custom Types

Type aliases create **named, reusable references** for any type.

```typescript
// Union of specific strings only
type AllowField = 'name' | 'phone' | 'languages' | 'website';

// Mix string + number literals
type Mixed = 'left' | 'right' | 1 | 2 | 3;

// Only specific numbers allowed
type PageSize = 10 | 20 | 50 | 100;

// Any string OR any number
type ID = string | number;

// Object type alias
type Student = {
    name: string;
    dept: string;
    subject: string[];
    cgpa: number;
};

const student1: Student = {
    name: 'Samrat',
    dept: 'CSE',
    subject: ['OOP', 'Java'],
    cgpa: 3.75
};

function displayStudent(info: Student, title: string = "NA"): void {
    console.log(`\nStudent name: ${info.name}`);
    console.log(`Department: ${info.dept}`);
    console.log(`Subjects: ${info.subject}`);
    console.log(`CGPA: ${info.cgpa}`);
    console.log(`Title: ${title ? title : "NO"}`);
}

displayStudent(student1, "Top Performer");
```

### Type Alias vs Interface
| Feature | `type` | `interface` |
|---------|--------|-------------|
| Objects | ✅ | ✅ |
| Primitives / Unions | ✅ | ❌ |
| Extending | `&` | `extends` |
| Declaration merging | ❌ | ✅ |
| Classes implement | ✅ | ✅ |

---

## 6. Union Types

A variable can hold **one of several types**.

```typescript
type Status = "active" | "inactive" | "pending";
type ID = string | number;

let userId: ID = 123;       // valid
userId = "ABC123";          // also valid

let currentStatus: Status = "active";
// currentStatus = "deleted"; // ❌ Error

function processID(id: ID): void {
    if (typeof id === "string") {
        console.log(`String ID: ${id.toUpperCase()}`);
    } else {
        console.log(`Number ID: ${id * 2}`);
    }
}

processID(42);
processID("user-123");
```

### Union Type Narrowing
```typescript
type Value = string | number | boolean;

function printValue(value: Value): void {
    if (typeof value === "string") {
        console.log(`String: ${value.toUpperCase()}`);
    } else if (typeof value === "number") {
        console.log(`Number: ${value.toFixed(2)}`);
    } else if (typeof value === "boolean") {
        console.log(`Boolean: ${value ? "True" : "False"}`);
    }
}

printValue("hello"); // String: HELLO
printValue(42);      // Number: 42.00
printValue(true);    // Boolean: True
```

---

## 7. Intersection Types

Combines multiple types — result **must satisfy ALL** of them.

```typescript
type Employee = {
    name: string;
    employeeId: number;
};

type Manager = {
    department: string;
    reports: number;
};

// Must have ALL properties from both types
type ManagerEmployee = Employee & Manager;

const manager: ManagerEmployee = {
    name: "Samrat",
    employeeId: 101,
    department: "CSE",
    reports: 5
};

// Custom type guard for intersection
function isManagerEmployee(obj: any): obj is ManagerEmployee {
    return (
        typeof obj.name === "string" &&
        typeof obj.employeeId === "number" &&
        typeof obj.department === "string" &&
        typeof obj.reports === "number"
    );
}

if (isManagerEmployee(manager)) {
    console.log(`${manager.name} manages ${manager.reports} people`);
}
```

---

## 8. Literal Types

Specify **exact values** a variable can hold — not just the type.

```typescript
// Literal string type
type Role = "admin" | "user" | "guest";

// Literal number type
type HttpStatus = 200 | 201 | 400 | 404 | 500;

function checkRole(role: Role): string {
    switch (role) {
        case "admin": return "Administrator access";
        case "user":  return "User access";
        case "guest": return "Limited access";
    }
}

const status: HttpStatus = 200;  // valid
// const bad: HttpStatus = 999;  // ❌ Error

console.log(checkRole("admin")); // Administrator access
console.log(checkRole("user"));  // User access
```

---

## 9. Operators

```typescript
// Arithmetic
let a: number = 10, b: number = 3;
console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.333...
console.log(a % b);   // 1
console.log(a ** b);  // 1000 (exponentiation)

// Comparison (always use === in TypeScript)
console.log(a > b);   // true
console.log(a === b); // false (strict equality)
console.log(a !== b); // true

// Logical
console.log(true && false); // false
console.log(true || false); // true
console.log(!true);         // false

// Nullish Coalescing (??) — use right side if left is null/undefined
let username: string | null = null;
let display = username ?? "Guest";
console.log(display); // Guest

// Optional Chaining (?.) — safe property access
let user = { profile: { city: "Dhaka" } };
console.log(user?.profile?.city);  // Dhaka
console.log(user?.address?.city);  // undefined (no crash)

// Ternary
let score = 75;
let grade = score >= 50 ? "Pass" : "Fail";
console.log(grade); // Pass
```

---

## 10. Conditions

```typescript
// if / else if / else
let marks: number = 82;

if (marks >= 90) {
    console.log("A+");
} else if (marks >= 80) {
    console.log("A");
} else if (marks >= 70) {
    console.log("B");
} else {
    console.log("F");
}

// switch with literal type — exhaustive checking
type Role = "admin" | "user" | "guest";

function checkAccess(role: Role): void {
    switch (role) {
        case "admin":
            console.log("Full access ✅");
            break;
        case "user":
            console.log("Limited access");
            break;
        case "guest":
            console.log("Read-only access");
            break;
    }
}

checkAccess("admin"); // Full access ✅
```

---

## 11. Loops

```typescript
// for loop
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// while loop
let x: number = 1;
while (x <= 5) { console.log(x++); }

// do-while
let n: number = 1;
do { console.log(n++); } while (n <= 3);

// for...of (iterate values)
let fruits: string[] = ["Apple", "Mango", "Banana"];
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in (iterate keys)
let student = { name: "Samrat", dept: "CSE", cgpa: 3.75 };
for (const key in student) {
    console.log(`${key}: ${(student as any)[key]}`);
}

// forEach with index
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

// break & continue
for (let i = 1; i <= 10; i++) {
    if (i === 6) break;
    if (i % 2 === 0) continue;
    console.log(i); // 1, 3, 5
}
```

---

## 12. Functions & Overloading

```typescript
// Basic typed function
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Optional parameter
function introduce(name: string, age?: number): void {
    age !== undefined
        ? console.log(`${name}, Age: ${age}`)
        : console.log(`Name: ${name}`);
}

// Default parameter
function power(base: number, exponent: number = 2): number {
    return base ** exponent;
}
console.log(power(3));    // 9
console.log(power(3, 3)); // 27

// Rest parameters (varargs)
function sum(...nums: number[]): number {
    return nums.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function type variable
let operation: (x: number, y: number) => number;
operation = (a, b) => a + b;
console.log(operation(3, 4)); // 7

// Function Overloading
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;
function processValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === "string")  return value.toUpperCase();
    if (typeof value === "number")  return value * 2;
    return !value;
}

console.log(processValue("hello")); // HELLO
console.log(processValue(5));       // 10
console.log(processValue(true));    // false
```

---

## 13. Arrays & Tuples

```typescript
// Typed arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[]   = ["Samrat", "Karim"];
let mixed: Array<string | number> = ["hello", 42];

// Common array methods
numbers.push(6);         // add to end
numbers.pop();           // remove from end
numbers.unshift(0);      // add to start
numbers.shift();         // remove from start

const doubled = numbers.map(n => n * 2);
const evens   = numbers.filter(n => n % 2 === 0);
const total   = numbers.reduce((acc, n) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
console.log(total);   // 15

// Tuple — fixed length, specific type at each position
const fixedInfo: [string, number] = ["Sam", 27];
console.log(fixedInfo[0]); // Sam
console.log(fixedInfo[1]); // 27

// Named tuple (TypeScript 4+)
let coordinate: [x: number, y: number] = [10, 20];
```

---

## 14. Objects

```typescript
// Inline type
let student: { name: string; age: number; gpa: number } = {
    name: "Samrat",
    age: 20,
    gpa: 3.8
};

// Using type alias
type Product = {
    id: number;
    name: string;
    price: number;
    inStock?: boolean;  // optional
};

const laptop: Product = {
    id: 1,
    name: "Dell XPS",
    price: 75000,
    inStock: true
};

// Destructuring
const { name, price } = laptop;
console.log(name);  // Dell XPS
console.log(price); // 75000

// Spread
const updated = { ...laptop, price: 70000 };
console.log(updated.price); // 70000
```

---

## 15. Enums

```typescript
// Numeric enum (starts at 0 by default)
enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right   // 3
}

let move: Direction = Direction.Up;
console.log(move);            // 0
console.log(Direction.Left);  // 2

// String enum (more readable, recommended)
enum Status {
    Active   = "ACTIVE",
    Inactive = "INACTIVE",
    Pending  = "PENDING"
}

let accountStatus: Status = Status.Active;
console.log(accountStatus); // ACTIVE

// Const enum (inlined at compile time — most efficient)
const enum Color {
    Red   = "RED",
    Green = "GREEN",
    Blue  = "BLUE"
}

let bg: Color = Color.Blue;
console.log(bg); // BLUE
```

---

## 16. Type Guards & Type Checking

### typeof Guard
```typescript
type Value = string | number | null;

function processValue(value: Value): void {
    if (typeof value === "string") {
        console.log(`String length: ${value.length}`);
    } else if (typeof value === "number") {
        console.log(`Number: ${value}`);
    } else if (value === null) {
        console.log("Value is null");
    }
}
```

### instanceof Guard
```typescript
class Dog { bark() { console.log("Woof!"); } }
class Cat { meow() { console.log("Meow!"); } }

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else if (animal instanceof Cat) {
        animal.meow();
    }
}

makeSound(new Dog()); // Woof!
makeSound(new Cat()); // Meow!
```

### Custom Type Guard (`is`)
```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
    return "swim" in animal;
}

function move(animal: Fish | Bird): void {
    if (isFish(animal)) {
        animal.swim();
    } else {
        animal.fly();
    }
}
```

### Intersection Type Guard
```typescript
type Employee = { name: string; employeeId: number };
type Manager  = { department: string; reports: number };
type ManagerEmployee = Employee & Manager;

function isManagerEmployee(obj: any): obj is ManagerEmployee {
    return (
        typeof obj.name === "string" &&
        typeof obj.employeeId === "number" &&
        typeof obj.department === "string" &&
        typeof obj.reports === "number"
    );
}
```

---

## 17. Type Assertions & Non-null

```typescript
// Type assertion — "I know the type better than TypeScript"
let value: unknown = "Hello TypeScript";
let length: number = (value as string).length;
console.log(length); // 16

// Non-null assertion (!) — assert value is definitely not null
const el = document.getElementById("app")!;
el.textContent = "Hello";

// Safer — explicit null check
const el2 = document.getElementById("app");
if (el2) {
    el2.textContent = "Hello"; // TypeScript satisfied
}
```

---

## 18. Interfaces

```typescript
interface User {
    name: string;
    email: string;
    age?: number;        // optional
    readonly id: number; // read-only
}

const user: User = {
    name: "Samrat",
    email: "samrat@example.com",
    id: 1
};
// user.id = 2; // ❌ Error — readonly

// Extending interface
interface Admin extends User {
    role: "admin" | "moderator";
    permissions: string[];
}

const admin: Admin = {
    name: "Samrat",
    email: "admin@example.com",
    id: 1,
    role: "admin",
    permissions: ["read", "write", "delete"]
};

// Declaration merging (unique to interface — not possible with type)
interface Product { name: string; price: number; }
interface Product { description: string; }  // merged!

const product: Product = {
    name: "Laptop",
    price: 50000,
    description: "High-performance laptop"
};

// Interface for a class structure
interface Vehicle {
    brand: string;
    model: string;
    start(): void;
}

interface Car extends Vehicle {
    doors: number;
    trunk: boolean;
}

const myCar: Car = {
    brand: "Toyota",
    model: "Camry",
    doors: 4,
    trunk: true,
    start() { console.log("Car started"); }
};
```

---

## 19. Generics

### Generic Functions
```typescript
function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("hello")); // hello
console.log(identity<number>(42));      // 42
console.log(identity(true));            // inferred: boolean

// Generic array function
function firstItem<T>(arr: T[]): T {
    return arr[0];
}

console.log(firstItem<string>(["Apple", "Mango"])); // Apple
console.log(firstItem<number>([10, 20, 30]));       // 10
```

### Generic Interface
```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const response: ApiResponse<string[]> = {
    data: ["item1", "item2"],
    status: 200,
    message: "OK"
};
```

### Generic Constraints
```typescript
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log(getLength("hello"));    // 5
console.log(getLength([1, 2, 3]));  // 3
// console.log(getLength(42));      // ❌ — number has no length
```

---

## 20. Advanced Types

### Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<123>;     // false
```

### Mapped Types
```typescript
type ReadonlyVersion<T> = {
    readonly [K in keyof T]: T[K];
};

interface User { name: string; age: number; }
type ReadonlyUser = ReadonlyVersion<User>;
// { readonly name: string; readonly age: number; }
```

### Utility Types
```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

type PartialProduct  = Partial<Product>;              // all optional
type RequiredProduct = Required<Product>;             // all required
type FrozenProduct   = Readonly<Product>;             // all read-only
type ProductPreview  = Pick<Product, "id" | "name">; // keep only these
type ProductUpdate   = Omit<Product, "id">;           // remove id

// Record — typed key-value object
type Status = "pending" | "completed" | "failed";
type StatusCounts = Record<Status, number>;
// { pending: number; completed: number; failed: number; }

// ReturnType — extract function return type
function getUser() { return { name: "Samrat", age: 25 }; }
type UserReturn = ReturnType<typeof getUser>;
// { name: string; age: number; }
```

---

# 🔵 PART 2 — OOP

---

## 21. Classes & Objects

```typescript
class Student {
    name: string;
    age: number;
    gpa: number;

    constructor(name: string, age: number, gpa: number) {
        this.name = name;
        this.age  = age;
        this.gpa  = gpa;
    }

    displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, GPA: ${this.gpa}`);
    }

    isHonors(): boolean {
        return this.gpa >= 3.7;
    }
}

const s1 = new Student("Samrat", 20, 3.9);
const s2 = new Student("Karim",  22, 3.2);

s1.displayInfo();           // Name: Samrat, Age: 20, GPA: 3.9
console.log(s1.isHonors()); // true
console.log(s2.isHonors()); // false
```

---

## 22. Constructors

```typescript
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width  = width;
        this.height = height;
    }

    area(): number      { return this.width * this.height; }
    perimeter(): number { return 2 * (this.width + this.height); }
}

// Shorthand — parameter properties (auto-creates and assigns fields)
class Circle {
    constructor(
        public radius: number,
        public color: string = "red"
    ) {}

    area(): number { return Math.PI * this.radius ** 2; }
}

const rect = new Rectangle(10, 5);
console.log(rect.area());            // 50
console.log(rect.perimeter());       // 30

const circle = new Circle(7);
console.log(circle.area().toFixed(2)); // 153.94
console.log(circle.color);            // red
```

---

## 23. Access Modifiers

| Modifier | Same Class | Subclass | Outside |
|----------|-----------|----------|---------|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

```typescript
class Person {
    public name: string;
    private age: number;
    protected email: string;

    constructor(name: string, age: number, email: string) {
        this.name  = name;
        this.age   = age;
        this.email = email;
    }

    public greet(): void { console.log(`Hello, I'm ${this.name}`); }
    private getAge(): number { return this.age; }
    protected getEmail(): string { return this.email; }
}

const person = new Person("Samrat", 25, "samrat@example.com");
person.greet();
// person.age;   // ❌ private
// person.email; // ❌ protected
```

### Real-world — BankAccount
```typescript
class BankAccount {
    public accountNumber: string;
    private balance: number;
    protected accountHolder: string;

    constructor(accountNumber: string, balance: number, accountHolder: string) {
        this.accountNumber = accountNumber;
        this.balance       = balance;
        this.accountHolder = accountHolder;
    }

    public getBalance(): number { return this.balance; }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}`);
        }
    }

    public withdraw(amount: number, pin: string): void {
        if (!this.verifyPin(pin))    { console.log("Wrong PIN!"); return; }
        if (amount > this.balance)   { console.log("Insufficient funds."); return; }
        this.balance -= amount;
        console.log(`Withdrawn: ${amount}. Balance: ${this.balance}`);
    }

    private verifyPin(inputPin: string): boolean { return inputPin === "1234"; }
    private calculateInterest(): number { return this.balance * 0.05; }
}

const account = new BankAccount("ACC001", 5000, "Samrat");
console.log(account.getBalance());  // 5000
account.deposit(1000);              // Deposited: 1000
account.withdraw(2000, "1234");     // Withdrawn: 2000. Balance: 4000
account.withdraw(1000, "0000");     // Wrong PIN!
// account.balance; // ❌ private
```

---

## 24. Readonly & Optional Properties

```typescript
class Config {
    readonly appName: string;
    readonly version: string = "1.0.0";
    debugMode?: boolean;

    constructor(appName: string) {
        this.appName = appName;
    }
}

const cfg = new Config("MyApp");
console.log(cfg.appName);   // MyApp
// cfg.appName = "Other";   // ❌ Error — readonly

cfg.debugMode = true;       // OK — optional property
```

---

## 25. Getters & Setters

```typescript
class Student {
    private _name: string;
    private _cgpa: number;

    constructor(name: string, cgpa: number) {
        this._name = name;
        this._cgpa = cgpa;
    }

    get name(): string { return this._name; }

    set name(value: string) {
        if (value.length > 0) this._name = value;
        else console.log("Name cannot be empty!");
    }

    get cgpa(): number { return this._cgpa; }

    set cgpa(value: number) {
        if (value >= 0 && value <= 4.0) this._cgpa = value;
        else console.log("CGPA must be between 0 and 4.0");
    }
}

const student = new Student("Samrat", 3.75);
console.log(student.name); // Samrat
student.cgpa = 3.9;        // valid
student.cgpa = 5.0;        // CGPA must be between 0 and 4.0
console.log(student.cgpa); // 3.9
```

### Computed getter — Temperature conversion
```typescript
class Temperature {
    private _celsius: number;

    constructor(celsius: number) { this._celsius = celsius; }

    get fahrenheit(): number { return this._celsius * 9/5 + 32; }
    get celsius(): number    { return this._celsius; }

    set celsius(value: number) {
        if (value < -273.15) throw new Error("Below absolute zero!");
        this._celsius = value;
    }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.celsius = 25;
console.log(temp.fahrenheit); // 77
```

---

## 26. Inheritance (extends)

```typescript
class Animal {
    name: string;

    constructor(name: string) { this.name = name; }

    speak(): void { console.log(`${this.name} makes a sound`); }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);  // call parent constructor
        this.breed = breed;
    }

    speak(): void { console.log(`${this.name} barks 🐕`); }

    getInfo(): void {
        console.log(`Name: ${this.name}, Breed: ${this.breed}`);
    }
}

class Bird extends Animal {
    constructor(name: string, public canFly: boolean) {
        super(name);
    }

    speak(): void { console.log(`${this.name} tweets 🐦`); }

    fly(): void {
        this.canFly
            ? console.log(`${this.name} is flying!`)
            : console.log(`${this.name} cannot fly.`);
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak();    // Buddy barks 🐕
dog.getInfo();  // Name: Buddy, Breed: Golden Retriever

const bird = new Bird("Parrot", true);
bird.speak();   // Parrot tweets 🐦
bird.fly();     // Parrot is flying!
```

---

## 27. Method Overriding

```typescript
class Shape {
    constructor(public color: string) {}

    area(): number { return 0; }

    describe(): void {
        console.log(`A ${this.color} shape with area: ${this.area().toFixed(2)}`);
    }
}

class Circle extends Shape {
    constructor(color: string, public radius: number) { super(color); }

    override area(): number { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    override area(): number { return this.width * this.height; }
}

const shapes: Shape[] = [
    new Circle("red", 5),
    new Rectangle("blue", 4, 6)
];

shapes.forEach(s => s.describe());
// A red shape with area: 78.54
// A blue shape with area: 24.00
```

> ✅ `override` keyword (TypeScript 4.3+) makes overrides explicit and catches typos.

### Calling parent with `super`
```typescript
class Vehicle {
    start(): void { console.log("Vehicle starting..."); }
}

class Car extends Vehicle {
    override start(): void {
        super.start();                     // parent behavior
        console.log("Car engine ready!");  // extra behavior
    }
}
```

---

## 28. Abstract Classes

Cannot be instantiated — only used as a **base blueprint**.

```typescript
abstract class Shape {
    protected color: string;

    constructor(color: string) { this.color = color; }

    // Must be implemented by every subclass
    abstract calculateArea(): number;

    // Concrete method — inherited as-is
    describe(): void {
        console.log(`This is a ${this.color} shape with area: ${this.calculateArea().toFixed(2)}`);
    }
}

class Circle extends Shape {
    constructor(color: string, private radius: number) { super(color); }
    calculateArea(): number { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
    constructor(color: string, private width: number, private height: number) {
        super(color);
    }
    calculateArea(): number { return this.width * this.height; }
}

// const s = new Shape("red"); // ❌ Cannot instantiate abstract class

const circle = new Circle("red", 5);
circle.describe();   // This is a red shape with area: 78.54

const rect = new Rectangle("blue", 4, 6);
rect.describe();     // This is a blue shape with area: 24.00
```

---

## 29. Interfaces in OOP

```typescript
interface Printable    { print(): void; }
interface Saveable     { save(): void; }
interface Serializable { serialize(): string; }

class Document implements Printable, Saveable, Serializable {
    constructor(public title: string, public content: string) {}

    print(): void {
        console.log(`--- ${this.title} ---\n${this.content}`);
    }

    save(): void {
        console.log(`"${this.title}" saved. 💾`);
    }

    serialize(): string {
        return JSON.stringify({ title: this.title, content: this.content });
    }
}

const doc = new Document("Report", "This is the Q3 report.");
doc.print();
doc.save();
console.log(doc.serialize());
```

---

## 30. Polymorphism

```typescript
interface Animal {
    speak(): void;
    move(): void;
}

class Cat  implements Animal {
    speak(): void { console.log("Meow 🐱"); }
    move(): void  { console.log("Cat walks"); }
}

class Bird implements Animal {
    speak(): void { console.log("Tweet 🐦"); }
    move(): void  { console.log("Bird flies"); }
}

class Fish implements Animal {
    speak(): void { console.log("...🐟 (silent)"); }
    move(): void  { console.log("Fish swims"); }
}

// Polymorphic call — same interface, different behavior
function makeAnimalAct(animal: Animal): void {
    animal.speak();
    animal.move();
}

const animals: Animal[] = [new Cat(), new Bird(), new Fish()];
animals.forEach(makeAnimalAct);
// Meow 🐱 / Cat walks
// Tweet 🐦 / Bird flies
// ...🐟 (silent) / Fish swims
```

---

## 31. Static Members

Static members belong to the **class**, not to instances.

```typescript
class MathHelper {
    static PI: number = 3.14159;
    static instanceCount: number = 0;

    constructor() { MathHelper.instanceCount++; }

    static circleArea(r: number): number { return MathHelper.PI * r ** 2; }
    static max(a: number, b: number): number { return a > b ? a : b; }
}

console.log(MathHelper.PI);              // 3.14159
console.log(MathHelper.circleArea(5));   // 78.53975
console.log(MathHelper.max(10, 20));     // 20

new MathHelper();
new MathHelper();
console.log(MathHelper.instanceCount);   // 2
```

---

## 32. Generics in Classes

```typescript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void    { this.items.push(item); }
    pop(): T | undefined   { return this.items.pop(); }
    peek(): T | undefined  { return this.items[this.items.length - 1]; }
    get size(): number     { return this.items.length; }
    isEmpty(): boolean     { return this.items.length === 0; }
}

const numStack = new Stack<number>();
numStack.push(10); numStack.push(20); numStack.push(30);
console.log(numStack.peek()); // 30
console.log(numStack.pop());  // 30
console.log(numStack.size);   // 2

const strStack = new Stack<string>();
strStack.push("Hello");
strStack.push("World");
console.log(strStack.pop()); // World
```

---

## 33. Practical OOP Example — Calculator

A complete example combining **types, OOP, literal types, and error handling**.

```typescript
type Operation = "+" | "-" | "*" | "/" | "^";
type Operand   = number;

const add = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;
const mul = (a: number, b: number): number => a * b;
const div = (a: number, b: number): number => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
};
const pow = (a: number, b: number = 2): number => Math.pow(a, b);

type HistoryEntry = { operation: Operation; a: number; b: number; result: number };

class Calculator {
    private history: HistoryEntry[] = [];

    calculate(operation: Operation, a: Operand, b: Operand): number {
        let result: number;

        switch (operation) {
            case "+": result = add(a, b); break;
            case "-": result = sub(a, b); break;
            case "*": result = mul(a, b); break;
            case "/": result = div(a, b); break;
            case "^": result = pow(a, b); break;
            default:
                const _exhaustive: never = operation;
                return _exhaustive;
        }

        this.history.push({ operation, a, b, result });
        return result;
    }

    getHistory(): HistoryEntry[] { return this.history; }
    clearHistory(): void { this.history = []; }
}

const calc = new Calculator();
console.log(calc.calculate("+", 10, 20)); // 30
console.log(calc.calculate("*", 5, 4));   // 20
console.log(calc.calculate("^", 2, 8));   // 256
console.log(calc.getHistory());
```

---

# 🟠 PART 3 — BUILT-IN METHODS

---

## 34. Array Methods

### `map()` — transform every element, returns new array
```typescript
const numbers: number[] = [1, 2, 3, 4, 5];

const doubled  = numbers.map(n => n * 2);
const asString = numbers.map(n => `Item ${n}`);

console.log(doubled);   // [2, 4, 6, 8, 10]
console.log(asString);  // ["Item 1", "Item 2", ...]

// With objects
type Student = { name: string; cgpa: number };
const students: Student[] = [
    { name: "Samrat", cgpa: 3.9 },
    { name: "Karim",  cgpa: 3.2 },
];

const names = students.map(s => s.name);
console.log(names); // ["Samrat", "Karim"]
```

### `filter()` — keep elements that pass a test
```typescript
const nums = [1, 2, 3, 4, 5, 6, 7, 8];

const evens  = nums.filter(n => n % 2 === 0);
const odds   = nums.filter(n => n % 2 !== 0);
const big    = nums.filter(n => n > 4);

console.log(evens); // [2, 4, 6, 8]
console.log(odds);  // [1, 3, 5, 7]
console.log(big);   // [5, 6, 7, 8]

// With objects
const honors = students.filter(s => s.cgpa >= 3.7);
console.log(honors); // [{ name: "Samrat", cgpa: 3.9 }]
```

### `reduce()` — accumulate all elements into a single value
```typescript
const nums = [1, 2, 3, 4, 5];

const sum     = nums.reduce((acc, n) => acc + n, 0);
const product = nums.reduce((acc, n) => acc * n, 1);
const max     = nums.reduce((acc, n) => n > acc ? n : acc, -Infinity);

console.log(sum);     // 15
console.log(product); // 120
console.log(max);     // 5

// Sum a specific property from objects
const totalCgpa = students.reduce((acc, s) => acc + s.cgpa, 0);
const avgCgpa   = totalCgpa / students.length;
console.log(avgCgpa.toFixed(2)); // 3.55
```

### `forEach()` — iterate, no return value
```typescript
const fruits: string[] = ["Apple", "Mango", "Banana"];

fruits.forEach((fruit, index) => {
    console.log(`${index + 1}. ${fruit}`);
});
// 1. Apple
// 2. Mango
// 3. Banana
```

### `find()` — first element that matches, or undefined
```typescript
const users = [
    { id: 1, name: "Samrat" },
    { id: 2, name: "Karim" },
    { id: 3, name: "Jamal" },
];

const user  = users.find(u => u.id === 2);
const noOne = users.find(u => u.id === 99);

console.log(user);   // { id: 2, name: "Karim" }
console.log(noOne);  // undefined
```

### `some()` — true if AT LEAST ONE element passes
```typescript
const nums = [1, 3, 5, 6, 7];

console.log(nums.some(n => n % 2 === 0)); // true  (6 is even)
console.log(nums.some(n => n > 10));      // false
```

### `every()` — true if ALL elements pass
```typescript
const scores = [85, 90, 78, 92];

console.log(scores.every(s => s >= 50)); // true  — all passed
console.log(scores.every(s => s >= 90)); // false — not all >= 90
```

### `sort()` — sort in place
```typescript
// String sort (alphabetical — default)
const names = ["Banana", "Apple", "Mango"];
names.sort();
console.log(names); // ["Apple", "Banana", "Mango"]

// Number sort (must provide comparator!)
const nums = [40, 1, 100, 5, 25];
nums.sort((a, b) => a - b); // ascending
console.log(nums); // [1, 5, 25, 40, 100]

nums.sort((a, b) => b - a); // descending
console.log(nums); // [100, 40, 25, 5, 1]

// Sort objects by property
const students = [
    { name: "Karim",  cgpa: 3.2 },
    { name: "Samrat", cgpa: 3.9 },
    { name: "Jamal",  cgpa: 3.5 },
];

students.sort((a, b) => b.cgpa - a.cgpa); // highest cgpa first
students.forEach(s => console.log(`${s.name}: ${s.cgpa}`));
// Samrat: 3.9 / Jamal: 3.5 / Karim: 3.2
```

### Chaining array methods
```typescript
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .filter(n => n % 2 === 0)   // [2, 4, 6, 8, 10]
    .map(n => n * n)             // [4, 16, 36, 64, 100]
    .reduce((acc, n) => acc + n, 0); // 220

console.log(result); // 220
```

---

## 35. String Methods

```typescript
const str: string = "  Hello, TypeScript World!  ";

// Trim whitespace
console.log(str.trim());           // "Hello, TypeScript World!"
console.log(str.trimStart());      // "Hello, TypeScript World!  "
console.log(str.trimEnd());        // "  Hello, TypeScript World!"

// Case
console.log(str.trim().toUpperCase()); // "HELLO, TYPESCRIPT WORLD!"
console.log(str.trim().toLowerCase()); // "hello, typescript world!"

// indexOf / includes
const clean = str.trim();
console.log(clean.indexOf("TypeScript")); // 7
console.log(clean.includes("World"));     // true
console.log(clean.startsWith("Hello"));   // true
console.log(clean.endsWith("!"));         // true

// substring / slice
console.log(clean.substring(7, 17)); // "TypeScript"
console.log(clean.slice(7, 17));     // "TypeScript"
console.log(clean.slice(-6));        // "orld! " (from end)

// replace / replaceAll
console.log(clean.replace("TypeScript", "JavaScript"));
// "Hello, JavaScript World!"

const repeated = "aababab";
console.log(repeated.replaceAll("ab", "X")); // "aXXX"

// split
const csv   = "Samrat,Karim,Jamal";
const parts = csv.split(",");
console.log(parts);        // ["Samrat", "Karim", "Jamal"]
console.log(parts.length); // 3

const sentence = "Hello World";
console.log(sentence.split(" ")); // ["Hello", "World"]
console.log(sentence.split(""));  // ["H","e","l","l","o"," ",...] (each char)

// charAt / at
console.log(clean.charAt(0));  // "H"
console.log(clean.at(-1));     // "!" (from end — ES2022)

// repeat / padStart / padEnd
console.log("ha".repeat(3));          // "hahaha"
console.log("5".padStart(4, "0"));    // "0005"
console.log("Hi".padEnd(6, "."));     // "Hi...."

// Template literals (backtick strings)
const name = "Samrat";
const age  = 25;
console.log(`Name: ${name}, Age: ${age}`); // Name: Samrat, Age: 25
```

---

## 36. Object Methods

```typescript
type User = { name: string; age: number; dept: string };

const user: User = { name: "Samrat", age: 25, dept: "CSE" };

// Object.keys() — array of property names
const keys = Object.keys(user);
console.log(keys); // ["name", "age", "dept"]

// Object.values() — array of property values
const values = Object.values(user);
console.log(values); // ["Samrat", 25, "CSE"]

// Object.entries() — array of [key, value] pairs
const entries = Object.entries(user);
console.log(entries);
// [["name","Samrat"], ["age",25], ["dept","CSE"]]

// Iterate with entries
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Object.assign() — merge objects (mutates target)
const base    = { name: "Samrat", age: 25 };
const extra   = { dept: "CSE", cgpa: 3.9 };
const merged  = Object.assign({}, base, extra); // {} = new target
console.log(merged); // { name: "Samrat", age: 25, dept: "CSE", cgpa: 3.9 }

// Spread (modern alternative to assign)
const merged2 = { ...base, ...extra };
console.log(merged2); // same result

// Object.freeze() — make object immutable
const config = Object.freeze({ appName: "MyApp", version: "1.0" });
// config.version = "2.0"; // silently ignored (or error in strict mode)

// Object.fromEntries() — array of pairs → object
const pairs: [string, number][] = [["a", 1], ["b", 2], ["c", 3]];
const obj = Object.fromEntries(pairs);
console.log(obj); // { a: 1, b: 2, c: 3 }

// Useful pattern: transform object values
const prices = { apple: 10, mango: 20, banana: 15 };
const doubled = Object.fromEntries(
    Object.entries(prices).map(([key, val]) => [key, val * 2])
);
console.log(doubled); // { apple: 20, mango: 40, banana: 30 }
```

---

## 37. Math Methods

```typescript
// Constants
console.log(Math.PI);  // 3.141592653589793
console.log(Math.E);   // 2.718281828459045

// Rounding
console.log(Math.round(4.5));  // 5  (nearest integer)
console.log(Math.round(4.4));  // 4
console.log(Math.floor(4.9));  // 4  (always round DOWN)
console.log(Math.ceil(4.1));   // 5  (always round UP)
console.log(Math.trunc(4.9));  // 4  (remove decimal — toward zero)
console.log(Math.trunc(-4.9)); // -4

// Min / Max
console.log(Math.max(3, 10, 7, 1)); // 10
console.log(Math.min(3, 10, 7, 1)); // 1

// With spread on arrays
const nums = [5, 2, 8, 1, 9];
console.log(Math.max(...nums)); // 9
console.log(Math.min(...nums)); // 1

// Power and root
console.log(Math.pow(2, 8));  // 256
console.log(Math.sqrt(144));  // 12
console.log(Math.cbrt(27));   // 3

// Absolute value
console.log(Math.abs(-42)); // 42

// Random number between 0 (inclusive) and 1 (exclusive)
console.log(Math.random()); // e.g. 0.7342...

// Random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6));   // dice roll: 1–6
console.log(randomInt(0, 100)); // 0–100
```

---

## 38. Date Methods

```typescript
// Create a Date object
const now  = new Date();               // current date & time
const d1   = new Date("2025-01-15");   // from string
const d2   = new Date(2025, 0, 15);    // year, month (0-based), day
const d3   = new Date(2025, 0, 15, 10, 30, 0); // + hours, min, sec

// Getters
console.log(now.getFullYear()); // e.g. 2025
console.log(now.getMonth());    // 0-11 (0 = January!)
console.log(now.getDate());     // 1-31 (day of month)
console.log(now.getDay());      // 0-6  (0 = Sunday)
console.log(now.getHours());    // 0-23
console.log(now.getMinutes());  // 0-59
console.log(now.getSeconds());  // 0-59

// Setters
const d = new Date("2025-06-15");
d.setFullYear(2026);
d.setMonth(11);  // December (0-based)
d.setDate(25);
console.log(d); // 2026-12-25

// Formatting
console.log(now.toISOString());       // "2025-01-15T10:30:00.000Z"
console.log(now.toLocaleDateString()); // "1/15/2025" (locale-dependent)
console.log(now.toLocaleTimeString()); // "10:30:00 AM"
console.log(now.toLocaleString());     // date + time

// Timestamp (milliseconds since Jan 1, 1970)
console.log(now.getTime());   // e.g. 1736940600000
console.log(Date.now());      // same — static method

// Date arithmetic
const start   = new Date("2025-01-01");
const end     = new Date("2025-12-31");
const diffMs  = end.getTime() - start.getTime();
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
console.log(`Days in 2025: ${diffDays}`); // 364

// Helper: readable month name
const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];
const monthName = months[now.getMonth()];
console.log(`Month: ${monthName}`);
```

---

# 🟣 PART 4 — CALLBACKS & ASYNC

---

## 39. Callbacks & Higher-order Functions

A **callback** is a function passed as an argument to another function.
A **higher-order function** accepts or returns a function.

### Passing Functions as Arguments
```typescript
// Basic callback
function greet(name: string, callback: (msg: string) => void): void {
    const message = `Hello, ${name}!`;
    callback(message);
}

greet("Samrat", (msg) => console.log(msg));     // Hello, Samrat!
greet("Karim",  (msg) => console.log(msg.toUpperCase())); // HELLO, KARIM!

// Typed callback
type MathOperation = (a: number, b: number) => number;

function calculate(a: number, b: number, operation: MathOperation): number {
    return operation(a, b);
}

console.log(calculate(10, 5, (a, b) => a + b)); // 15
console.log(calculate(10, 5, (a, b) => a * b)); // 50
console.log(calculate(10, 5, (a, b) => a - b)); // 5
```

### Higher-order Functions
```typescript
// Function that RETURNS a function
function multiplier(factor: number): (n: number) => number {
    return (n: number) => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(double(9)); // 18

// Function that ACCEPTS and RETURNS a function (decorator pattern)
function withLogging(fn: (...args: number[]) => number) {
    return (...args: number[]): number => {
        console.log(`Calling with args: ${args}`);
        const result = fn(...args);
        console.log(`Result: ${result}`);
        return result;
    };
}

const add = (a: number, b: number): number => a + b;
const loggedAdd = withLogging(add);

loggedAdd(3, 4);
// Calling with args: 3,4
// Result: 7
```

### Built-in Higher-order Functions (array methods as HOFs)
```typescript
const nums = [1, 2, 3, 4, 5];

// map, filter, reduce are all higher-order functions
const result = nums
    .filter((n): boolean => n > 2)   // [3, 4, 5]
    .map((n): number => n * 10)      // [30, 40, 50]
    .reduce((acc, n): number => acc + n, 0); // 120

console.log(result); // 120
```

### Asynchronous Callbacks
```typescript
// setTimeout is a classic async callback
function delayedGreet(name: string, delay: number): void {
    setTimeout(() => {
        console.log(`Hello, ${name}!`);
    }, delay);
}

delayedGreet("Samrat", 1000); // prints after 1 second

// Callback-based async pattern (old style)
type Callback<T> = (error: Error | null, result?: T) => void;

function fetchData(id: number, callback: Callback<string>): void {
    setTimeout(() => {
        if (id <= 0) {
            callback(new Error("Invalid ID"));
        } else {
            callback(null, `Data for ID: ${id}`);
        }
    }, 500);
}

fetchData(1, (err, data) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log(data); // Data for ID: 1
    }
});

// Callback hell — why Promises were invented
fetchData(1, (err, data1) => {
    if (err) return console.error(err);
    fetchData(2, (err, data2) => {
        if (err) return console.error(err);
        fetchData(3, (err, data3) => {
            // deeply nested — hard to read
            console.log(data1, data2, data3);
        });
    });
});
```

---

## 40. Promises

A **Promise** represents a value that will be available in the future.
States: `pending` → `fulfilled` or `rejected`

```typescript
// Creating a Promise
const myPromise = new Promise<string>((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Data loaded successfully!");
    } else {
        reject(new Error("Something went wrong."));
    }
});

// Consuming a Promise
myPromise
    .then((result) => console.log(result))   // "Data loaded successfully!"
    .catch((error) => console.error(error))
    .finally(() => console.log("Done."));    // always runs

// Typed Promise function
function getUser(id: number): Promise<{ name: string; age: number }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ name: "Samrat", age: 25 });
            } else {
                reject(new Error(`User ${id} not found`));
            }
        }, 1000);
    });
}

getUser(1)
    .then(user => console.log(`Name: ${user.name}`)) // Name: Samrat
    .catch(err => console.error(err.message));

getUser(99)
    .then(user => console.log(user))
    .catch(err => console.error(err.message)); // User 99 not found
```

### Promise.all — run multiple promises in parallel
```typescript
function delay(ms: number, value: string): Promise<string> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// All must succeed — returns array of results
Promise.all([
    delay(1000, "Result 1"),
    delay(500,  "Result 2"),
    delay(800,  "Result 3"),
]).then(results => {
    console.log(results); // ["Result 1", "Result 2", "Result 3"]
});

// Promise.allSettled — all finish, regardless of pass/fail
Promise.allSettled([
    Promise.resolve("OK"),
    Promise.reject(new Error("Failed")),
    Promise.resolve("Also OK"),
]).then(results => {
    results.forEach(r => {
        if (r.status === "fulfilled") console.log("✅", r.value);
        else console.log("❌", r.reason.message);
    });
});

// Promise.race — first to finish wins
Promise.race([
    delay(1000, "slow"),
    delay(200,  "fast"),
]).then(winner => console.log(winner)); // "fast"
```

---

## 41. Async / Await

`async/await` is syntactic sugar over Promises — cleaner, easier to read.

```typescript
// async function always returns a Promise
async function fetchUser(id: number): Promise<{ name: string; age: number }> {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (id === 1) return { name: "Samrat", age: 25 };
    throw new Error(`User ${id} not found`);
}

// Using await
async function main(): Promise<void> {
    try {
        const user = await fetchUser(1);
        console.log(`Name: ${user.name}, Age: ${user.age}`);
        // Name: Samrat, Age: 25
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
    }
}

main();
```

### Sequential vs Parallel execution
```typescript
async function fetchScore(subject: string): Promise<number> {
    await new Promise(r => setTimeout(r, 300));
    return Math.floor(Math.random() * 40) + 60; // 60–100
}

// Sequential — waits one by one (slower)
async function sequential(): Promise<void> {
    const math    = await fetchScore("Math");
    const english = await fetchScore("English");
    const science = await fetchScore("Science");
    console.log(`Scores: ${math}, ${english}, ${science}`);
}

// Parallel — all start at once (faster)
async function parallel(): Promise<void> {
    const [math, english, science] = await Promise.all([
        fetchScore("Math"),
        fetchScore("English"),
        fetchScore("Science"),
    ]);
    console.log(`Scores: ${math}, ${english}, ${science}`);
}
```

### Real-world — async Fetch with TypeScript types
```typescript
interface Post {
    id: number;
    title: string;
    body: string;
}

async function getPosts(): Promise<Post[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const posts: Post[] = await response.json();
    return posts;
}

async function displayPosts(): Promise<void> {
    try {
        const posts = await getPosts();
        posts.forEach(p => console.log(`[${p.id}] ${p.title}`));
    } catch (err) {
        console.error("Failed to load posts:", err);
    } finally {
        console.log("Fetch attempt complete.");
    }
}

displayPosts();
```

### async/await vs Callbacks vs Promises — comparison
```typescript
// Same task written 3 ways:

// 1. Callback (old style — hard to read when nested)
fetchData(1, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
});

// 2. Promise chain
fetchUserPromise(1)
    .then(user => console.log(user))
    .catch(err => console.error(err));

// 3. async/await (cleanest — reads like synchronous code)
async function run(): Promise<void> {
    try {
        const user = await fetchUserPromise(1);
        console.log(user);
    } catch (err) {
        console.error(err);
    }
}
```

---

# 🟢 PART 5 — DOM MANIPULATION

> ⚠️ Add `"lib": ["ES6", "DOM"]` in `tsconfig.json` for full DOM type support.

---

## 42. Selecting Elements

```typescript
// By ID
const title = document.getElementById("title") as HTMLHeadingElement;

// By CSS selector (typed)
const btn   = document.querySelector<HTMLButtonElement>(".submit-btn");
const items = document.querySelectorAll<HTMLLIElement>(".list-item");

// By class/tag
const cards      = document.getElementsByClassName("card");
const paragraphs = document.getElementsByTagName("p");

// Safe — instanceof narrows type
const input = document.getElementById("username");
if (input instanceof HTMLInputElement) {
    console.log(input.value);
}
```

---

## 43. Changing Content & Styles

```typescript
const heading = document.getElementById("title") as HTMLHeadingElement;

heading.textContent = "Welcome to TypeScript!";
heading.innerHTML   = "<span style='color:red'>Hello!</span>";

heading.style.color           = "blue";
heading.style.fontSize        = "32px";
heading.style.fontWeight      = "bold";
heading.style.backgroundColor = "#f0f0f0";

const img  = document.querySelector("img")  as HTMLImageElement;
img.src = "new-image.png";
img.alt = "A new image";

const link = document.querySelector("a") as HTMLAnchorElement;
link.href = "https://example.com";
link.setAttribute("target", "_blank");
```

---

## 44. Creating & Appending Elements

```typescript
const newDiv = document.createElement("div");
newDiv.textContent   = "Created dynamically!";
newDiv.className     = "card";
newDiv.style.padding = "10px";

const container = document.getElementById("container")!;
container.appendChild(newDiv);
container.prepend(newDiv);
container.insertAdjacentHTML("beforeend", "<p>New paragraph</p>");

// Build list dynamically
const ul = document.createElement("ul");
["Apple", "Mango", "Banana"].forEach(fruit => {
    const li = document.createElement("li");
    li.textContent = fruit;
    ul.appendChild(li);
});
document.body.appendChild(ul);

// Remove element safely
document.getElementById("old-element")?.remove();
```

---

## 45. Event Listeners

```typescript
const button = document.getElementById("myBtn") as HTMLButtonElement;

button.addEventListener("click", () => { console.log("Clicked!"); });

button.addEventListener("mouseover", () => { button.style.backgroundColor = "yellow"; });
button.addEventListener("mouseout",  () => { button.style.backgroundColor = ""; });

document.addEventListener("keydown", (e: KeyboardEvent) => {
    console.log(`Key: ${e.key}`);
    if (e.key === "Enter") console.log("Enter pressed!");
});

const searchInput = document.getElementById("search") as HTMLInputElement;
searchInput.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("Searching: " + target.value);
});

// One-time listener — removes itself after first click
function handleOnce() {
    console.log("Fired once!");
    button.removeEventListener("click", handleOnce);
}
button.addEventListener("click", handleOnce);
```

---

## 46. Form Handling & Validation

```html
<form id="registerForm">
    <input type="text"     id="username" placeholder="Username" />
    <input type="email"    id="email"    placeholder="Email" />
    <input type="password" id="password" placeholder="Password" />
    <button type="submit">Register</button>
    <p id="errorMsg" style="color:red"></p>
</form>
```

```typescript
const form       = document.getElementById("registerForm") as HTMLFormElement;
const usernameEl = document.getElementById("username")     as HTMLInputElement;
const emailEl    = document.getElementById("email")        as HTMLInputElement;
const passwordEl = document.getElementById("password")     as HTMLInputElement;
const errorMsg   = document.getElementById("errorMsg")     as HTMLParagraphElement;

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const username = usernameEl.value.trim();
    const email    = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (username.length < 3) {
        errorMsg.textContent = "Username must be at least 3 characters."; return;
    }
    if (!email.includes("@")) {
        errorMsg.textContent = "Invalid email address."; return;
    }
    if (password.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters."; return;
    }

    errorMsg.textContent = "";
    alert(`Welcome, ${username}!`);
    form.reset();
});
```

---

## 47. Class & Attribute Manipulation

```typescript
const box = document.getElementById("box") as HTMLDivElement;

box.classList.add("active");
box.classList.remove("hidden");
box.classList.toggle("highlight");
console.log(box.classList.contains("active")); // true/false
box.classList.replace("old-class", "new-class");

box.setAttribute("data-id", "123");
const id = box.getAttribute("data-id"); // "123"
box.removeAttribute("data-id");

// dataset (data-* attributes)
box.dataset.userId = "456";
console.log(box.dataset.userId); // "456"
```

---

## 48. DOM Traversal

```typescript
const parent = document.getElementById("list")!;

const firstChild = parent.firstElementChild;
const lastChild  = parent.lastElementChild;

const item = document.querySelector(".item") as HTMLElement;
const next = item.nextElementSibling;
const prev = item.previousElementSibling;
const parentEl = item.parentElement;
const section  = item.closest("section");

// Apply to all children
Array.from(parent.children).forEach(child => {
    (child as HTMLElement).style.color = "blue";
});
```

---

## 49. Timers

```typescript
// Run once
const id = setTimeout(() => { console.log("After 2s"); }, 2000);
clearTimeout(id); // cancel

// Run repeatedly
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Count: ${count}`);
    if (count === 5) clearInterval(intervalId);
}, 1000);

// DOM countdown
let seconds = 10;
const display = document.getElementById("timer") as HTMLSpanElement;

const countdown = setInterval(() => {
    display.textContent = String(seconds--);
    if (seconds < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up! ⏰";
    }
}, 1000);
```

---

## 50. Fetch API (HTTP Requests)

```typescript
interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

// GET request
async function fetchPosts(): Promise<void> {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const posts: Post[] = await response.json();
        posts.slice(0, 3).forEach(p => console.log(`${p.id}: ${p.title}`));
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// POST request
async function createPost(title: string, body: string): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 })
    });
    const data: Post = await response.json();
    console.log("Created:", data);
}

// Render into DOM
async function renderPosts(): Promise<void> {
    const container = document.getElementById("posts") as HTMLDivElement;
    const posts: Post[] = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
    ).then(res => res.json());

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";
        card.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        container.appendChild(card);
    });
}
```

---

## 51. Full Mini Project — Todo App

Complete TypeScript project: **Types + OOP + DOM**.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TypeScript Todo App</title>
    <style>
        body { font-family: sans-serif; max-width: 500px; margin: 40px auto; }
        .todo-item { display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid #ddd; }
        .todo-item.done span { text-decoration: line-through; color: gray; }
        #addBtn    { background:#2196F3; color:white; border:none; padding:8px 16px; cursor:pointer; }
        .doneBtn   { background:#4CAF50; color:white; border:none; padding:4px 8px; cursor:pointer; }
        .deleteBtn { background:#f44336; color:white; border:none; padding:4px 8px; cursor:pointer; }
    </style>
</head>
<body>
    <h1>📝 Todo App</h1>
    <input type="text" id="todoInput" placeholder="Enter a task..." />
    <button id="addBtn">Add Task</button>
    <ul id="todoList"></ul>
    <p id="summary"></p>
    <script src="dist/app.js"></script>
</body>
</html>
```

```typescript
// src/app.ts

interface TodoItem {
    id: number;
    text: string;
    done: boolean;
}

class TodoManager {
    private todos: TodoItem[] = [];
    private nextId: number    = 1;

    add(text: string): TodoItem {
        const todo: TodoItem = { id: this.nextId++, text, done: false };
        this.todos.push(todo);
        return todo;
    }

    toggleDone(id: number): void {
        const todo = this.todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
    }

    delete(id: number): void {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    getAll(): TodoItem[] { return this.todos; }

    getSummary(): string {
        const done  = this.todos.filter(t => t.done).length;
        const total = this.todos.length;
        return `${done} of ${total} tasks completed`;
    }
}

class TodoUI {
    private manager:   TodoManager;
    private listEl:    HTMLUListElement;
    private inputEl:   HTMLInputElement;
    private summaryEl: HTMLParagraphElement;

    constructor() {
        this.manager   = new TodoManager();
        this.listEl    = document.getElementById("todoList")  as HTMLUListElement;
        this.inputEl   = document.getElementById("todoInput") as HTMLInputElement;
        this.summaryEl = document.getElementById("summary")   as HTMLParagraphElement;

        document.getElementById("addBtn")!
            .addEventListener("click", () => this.addTodo());

        this.inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter") this.addTodo();
        });
    }

    private addTodo(): void {
        const text = this.inputEl.value.trim();
        if (!text) return;
        this.manager.add(text);
        this.inputEl.value = "";
        this.render();
    }

    private render(): void {
        this.listEl.innerHTML = "";

        this.manager.getAll().forEach(todo => {
            const li = document.createElement("li");
            li.className = `todo-item${todo.done ? " done" : ""}`;
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="doneBtn"   data-id="${todo.id}">${todo.done ? "Undo" : "Done"}</button>
                    <button class="deleteBtn" data-id="${todo.id}">Delete</button>
                </div>
            `;

            li.querySelector(".doneBtn")!.addEventListener("click", () => {
                this.manager.toggleDone(todo.id); this.render();
            });
            li.querySelector(".deleteBtn")!.addEventListener("click", () => {
                this.manager.delete(todo.id); this.render();
            });

            this.listEl.appendChild(li);
        });

        this.summaryEl.textContent = this.manager.getSummary();
    }
}

const app = new TodoUI();
```

---

## 🔁 Quick Reference Summary

### Types & Basics
| Concept | Keyword / Pattern |
|---------|-------------------|
| Primitives | `string`, `number`, `boolean` |
| Skip type checking | `any` |
| Safe unknown input | `unknown` |
| No return | `void` |
| Never returns | `never` |
| Typed array | `T[]` or `Array<T>` |
| Fixed array | `[T, U]` (tuple) |
| Either/or | `T \| U` (union) |
| Must be both | `T & U` (intersection) |
| Reusable type | `type X = ...` |
| Exact value | `"a" \| "b"` (literal) |
| Runtime check | `typeof`, `instanceof`, `in` |

### OOP
| Keyword | Purpose |
|---------|---------|
| `class` | Define blueprint |
| `new` | Create object |
| `extends` | Inherit from class |
| `implements` | Implement interface |
| `abstract` | Cannot instantiate |
| `override` | Explicitly override |
| `public` | Accessible everywhere |
| `private` | Only within class |
| `protected` | Class + subclasses |
| `readonly` | Cannot reassign |
| `static` | Belongs to class |
| `get` / `set` | Getters and setters |

### Advanced / Utility Types
| Utility | Effect |
|---------|--------|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | All read-only |
| `Pick<T, K>` | Keep only K |
| `Omit<T, K>` | Remove K |
| `Record<K, V>` | Key-value object type |
| `ReturnType<T>` | Extract function return type |

### Array Methods
| Method | Purpose |
|--------|---------|
| `map(fn)` | Transform each element → new array |
| `filter(fn)` | Keep elements that pass test → new array |
| `reduce(fn, init)` | Accumulate all elements → single value |
| `forEach(fn)` | Iterate — no return value |
| `find(fn)` | First matching element or `undefined` |
| `some(fn)` | `true` if at least one passes |
| `every(fn)` | `true` if all pass |
| `sort(fn)` | Sort in place (provide comparator for numbers) |

### String Methods
| Method | Purpose |
|--------|---------|
| `trim()` | Remove leading/trailing whitespace |
| `toUpperCase()` / `toLowerCase()` | Change case |
| `split(sep)` | Split string → array |
| `replace(a, b)` / `replaceAll(a, b)` | Replace occurrences |
| `substring(s, e)` / `slice(s, e)` | Extract part of string |
| `indexOf(str)` | Find position (-1 if not found) |
| `includes(str)` | Check existence → boolean |
| `padStart(n, ch)` / `padEnd(n, ch)` | Pad to length |

### Object Methods
| Method | Purpose |
|--------|---------|
| `Object.keys(obj)` | Array of property names |
| `Object.values(obj)` | Array of property values |
| `Object.entries(obj)` | Array of `[key, value]` pairs |
| `Object.assign(target, src)` | Merge objects into target |
| `Object.freeze(obj)` | Make object immutable |
| `Object.fromEntries(pairs)` | Array of pairs → object |

### Math Methods
| Method | Purpose |
|--------|---------|
| `Math.round(n)` | Round to nearest integer |
| `Math.floor(n)` | Round down |
| `Math.ceil(n)` | Round up |
| `Math.max(...n)` / `Math.min(...n)` | Largest / smallest |
| `Math.random()` | Random 0–1 |
| `Math.pow(base, exp)` | Exponentiation |
| `Math.sqrt(n)` / `Math.abs(n)` | Square root / absolute value |

### Date Methods
| Method | Purpose |
|--------|---------|
| `new Date()` | Current date/time |
| `getFullYear()` / `getMonth()` / `getDate()` | Get parts |
| `getDay()` | Day of week (0 = Sunday) |
| `setDate()` / `setMonth()` / `setFullYear()` | Set parts |
| `toISOString()` | ISO format string |
| `toLocaleDateString()` | Locale-formatted date |
| `Date.now()` | Current timestamp (ms) |

### Callbacks & Async
| Concept | Purpose |
|---------|---------|
| Callback | Function passed as argument |
| Higher-order function | Accepts or returns a function |
| `new Promise((resolve, reject) => {})` | Create a promise |
| `.then()` / `.catch()` / `.finally()` | Handle promise result |
| `Promise.all([...])` | Run all in parallel, wait for all |
| `Promise.allSettled([...])` | Run all, report each outcome |
| `Promise.race([...])` | First to finish wins |
| `async function` | Function that returns a Promise |
| `await` | Wait for a Promise inside async function |

### DOM
| API | Purpose |
|-----|---------|
| `getElementById` | Select by ID |
| `querySelector<T>` | Select first (typed) |
| `querySelectorAll<T>` | Select all |
| `createElement` | New element |
| `appendChild` / `prepend` | Add to DOM |
| `addEventListener` | Listen for events |
| `classList.add/remove/toggle` | CSS classes |
| `setAttribute` / `dataset` | HTML attributes |
| `fetch` + `async/await` | HTTP requests |
| `setTimeout` / `setInterval` | Timers |

---

*Made for TypeScript Teachers | TypeScript 5.x + ES6 Compatible | Last Updated: 2025*
