// ================= 6.1 — Everything starts from Object =================

// Primitive vs Object
let str = "hello";          // primitive string
let num = 42;               // primitive number
let bool = true;            // primitive boolean

let obj = {};               // object literal
let arr = [1, 2, 3];       // array (object)
function foo() { }           // function (object)
class User { }               // class (function under the hood)

console.log(typeof str); // "string"
console.log(typeof num); // "number"
console.log(typeof bool); // "boolean"
console.log(typeof obj); // "object"
console.log(typeof arr); // "object"
console.log(typeof foo); // "function"
console.log(typeof User); // "function"

// Prototype chain root
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));        // null

// =======================================================================
// ================= 6.2 — Object Literals ==============================

let objLiteral = {};
console.log(objLiteral); // {}
console.log(Object.getPrototypeOf(objLiteral) === Object.prototype); // true
console.log(objLiteral.__proto__ === Object.prototype); // true

// Accessing Object.prototype methods
console.log(objLiteral.toString()); // "[object Object]"
console.log(objLiteral.hasOwnProperty("anyKey")); // false

// Diagram representation (ASCII):
// objLiteral
//  │
//  └──> Object.prototype
//         │
//         └──> null


// Explanation:
// objLiteral inherits from Object.prototype.
// Object.prototype is the top-level object, its prototype is null.
// All objects created as {} have the same prototype chain root.

// ================= 6.3 — Arrays ==============================

let arrONE = [1, 2, 3];

console.log(arrONE);                        // [1, 2, 3]
console.log(Object.getPrototypeOf(arrONE) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

// Array methods come from Array.prototype
console.log(arrONE.push(4)); // 4 (adds 4 at end)
console.log(arrONE);         // [1,2,3,4]
console.log(arrONE.map(x => x * 2)); // [2,4,6,8]

// Prototype chain diagram:
// arr
//  │
//  └──> Array.prototype (push, pop, map, filter, …)
//         │
//         └──> Object.prototype
//                │
//                └──> null

// ================= 6.4 — Functions ===========================

function fooFunc() { }
console.log(Object.getPrototypeOf(fooFunc) === Function.prototype); // true
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); // true

// Functions have call/apply/bind from Function.prototype
fooFunc.custom = "Hello"; // can add properties to functions
console.log(fooFunc.custom); // "Hello"

// Prototype chain diagram:
// fooFunc
//  │
//  └──> Function.prototype (call, apply, bind, …)
//         │
//         └──> Object.prototype
//                │
//                └──> null

// Mind-bender note: Function.prototype itself is a function!
console.log(typeof Function.prototype); // "function"

// ================= 6.5 — Classes are functions too =================

class UserClass { }
console.log(typeof UserClass); // "function"

// Prototype chain checks
console.log(Object.getPrototypeOf(UserClass) === Function.prototype); // true
console.log(Object.getPrototypeOf(UserClass.prototype) === Object.prototype); // true

// Instance of a class
let userInstance = new UserClass();
console.log(Object.getPrototypeOf(userInstance) === UserClass.prototype); // true

// ================= 6.6 — Diagram of Built-in Objects =================

// Instance of class
// userInstance
//  │
//  └──> UserClass.prototype { ...methods }
//         │
//         └──> Object.prototype
//                │
//                └──> null

// Class itself
// UserClass
//  │
//  └──> Function.prototype
//         │
//         └──> Object.prototype
//                │
//                └──> null

// ================= 6.7 — Primitive Wrappers =================

// Primitive string
let strTWO = "abc";
console.log(typeof strTWO); // "string"

// JS automatically wraps it in String object to access methods
console.log(strTWO.toUpperCase()); // "ABC"

// Checking prototype chain
console.log(Object.getPrototypeOf(strTWO) === String.prototype); // true
console.log(Object.getPrototypeOf(String.prototype) === Object.prototype); // true

// Similarly for numbers
let numTWO = 42;
console.log(typeof numTWO); // "number"
console.log(Object.getPrototypeOf(numTWO) === Number.prototype); // true

// Boolean
let boolTWO = true;
console.log(Object.getPrototypeOf(boolTWO) === Boolean.prototype); // true

// Diagram:
// "abc" --> String.prototype --> Object.prototype --> null
// 42     --> Number.prototype --> Object.prototype --> null
// true   --> Boolean.prototype --> Object.prototype --> null

// ================= 6.8 — Object.create(null) =================

// Creates a "pure" object without prototype
let pureDict = Object.create(null);

console.log(Object.getPrototypeOf(pureDict)); // null

// No inherited properties like toString, hasOwnProperty
console.log(pureDict.toString); // undefined

// Useful for dictionary-style objects
pureDict.key = "value";
console.log(pureDict.key); // "value"

// ================= 6.9 — Important Interview Traps =================

// Q1: Function.__proto__ === Function.prototype ?
console.log(Function.__proto__ === Function.prototype);
// true — because Function itself is a function; its prototype is Function.prototype

// Q2: Object.__proto__ === Function.prototype ?
console.log(Object.__proto__ === Function.prototype);
// true — because Object is also a constructor function; all constructors inherit from Function.prototype

// Q3: Function.prototype.__proto__ === Object.prototype ?
console.log(Function.prototype.__proto__ === Object.prototype);
// true — because Function.prototype itself is an object

// Q4: Root of all — Object.prototype.__proto__ === null ?
console.log(Object.prototype.__proto__ === null);
// true — because Object.prototype is the root of the prototype chain

// ================= 6.10 — Quick Table of Common Built-ins =================

// {} → Object.prototype
let obj_Three = {};
console.log(Object.getPrototypeOf(obj_Three) === Object.prototype); // true

// [] → Array.prototype → Object.prototype
let arrTHREE = [];
console.log(Object.getPrototypeOf(arrTHREE) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

// function(){} → Function.prototype → Object.prototype
function fn() { }
console.log(Object.getPrototypeOf(fn) === Function.prototype); // true
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); // true

// class X {} → Function.prototype (class itself)
class X { }
console.log(typeof X); // "function"
console.log(Object.getPrototypeOf(X) === Function.prototype); // true
console.log(Object.getPrototypeOf(X.prototype) === Object.prototype); // true

// "abc" → String.prototype → Object.prototype
let s = "abc";
console.log(Object.getPrototypeOf(s) === String.prototype); // true
console.log(Object.getPrototypeOf(String.prototype) === Object.prototype); // true

// ==================================================================================
// ==================================================================================

// 7.1 — What is Inheritance in JavaScript
// ---------------------------------------
// Inheritance means one object can use the properties and methods of another object.
// JavaScript uses the prototype chain to do this.

let animal = {
    eats: true,                          // property of parent
    eat() {
        console.log("Animal eats");        // method of parent
    }
};

// Create a new object whose prototype is 'animal'
let dog = Object.create(animal);

// Add dog-specific property/method
dog.bark = function () {
    console.log("Dog barks");
};

// Usage:
dog.eat();  // "Animal eats" (inherited from animal)
dog.bark(); // "Dog barks" (dog’s own method)

// Prototype chain here:
// dog → animal → Object.prototype → null



// 7.2 — Classical (Constructor + Prototype) Approach
// --------------------------------------------------
// Before ES6 classes, inheritance was done with constructor functions and prototypes.

// Step 1: Parent constructor
function Animal_Two(name) {
    this.name = name; // own property of Animal_Two
}

// Step 2: Shared method on Animal_Two's prototype
Animal_Two.prototype.eat = function () {
    console.log(this.name + " eats");
};

// Step 3: Child constructor (Dog_Two)
function Dog_Two(name, breed) {
    // Call parent constructor to set parent properties on 'this'
    Animal_Two.call(this, name);
    this.breed = breed; // Dog_Two's own property
}

// Step 4: Link Dog_Two.prototype to Animal_Two.prototype (inheritance)
Dog_Two.prototype = Object.create(Animal_Two.prototype);

// Step 5: Reset Dog_Two.prototype.constructor (important after Object.create)
Dog_Two.prototype.constructor = Dog_Two;

// Step 6: Add child-specific method
Dog_Two.prototype.bark = function () {
    console.log(this.name + " barks");
};

// Step 7: Create an instance
let d_Two = new Dog_Two("Tommy", "Labrador");

// Step 8: Test inherited and own methods
d_Two.eat();  // "Tommy eats" (from Animal_Two.prototype)
d_Two.bark(); // "Tommy barks" (from Dog_Two.prototype)


// How the lookup works:

// - d_Two.eat(): not found in d_Two → not found in Dog_Two.prototype → found in Animal_Two.prototype → run it

// - d_Two.bark(): not found in d_Two → found in Dog_Two.prototype → run it

// Prototype chain for 'd_Two':
// d_Two → Dog_Two.prototype (bark) → Animal_Two.prototype (eat) → Object.prototype → null


// ========= Prototypal (Object.create) Direct Object-to-Object Inheritance ===========
// ------------------------------------------------------------
// What it is:
// This is the modern and simpler way of doing inheritance in JavaScript.

// We don’t need constructor functions, 'new' keyword, or prototype boilerplate.

// Just create a "template" object and make new objects linked to it with Object.create(proto).

// Step 1: Create a template object (parent)
let animal_three = {
    // shared method for all animals_three
    eat() {
        console.log(this.name + " eats");
    }
};

// Step 2: Create a new object that inherits from 'animal'
let dog_three = Object.create(animal_three);
// Now dog_three.__proto__ = animal_three

// Step 3: Add own properties and methods to 'dog_three'
dog_three.name = "Tommy"; // property specific to this dog_three

dog_three.bark = function () { // method specific to dog_three
    console.log(this.name + " barks");
};

// Step 4: Use inherited and own methods
dog_three.eat();  // Inherited from 'animal_three' → Output: Tommy eats
dog_three.bark(); // Defined on dog_three → Output: Tommy barks

// How lookup works internally:

// - dog_three.eat(): JS checks dog_three first → not found → looks in dog_three.__proto__ (animal_three) → found eat() → runs it

// - dog_three.bark(): JS checks dog_three first → found bark() → runs it

// Prototype chain here:
// dog_three { name, bark }
//    │
//    └──> animal_three { eat }
//           │
//           └──> Object.prototype (toString, hasOwnProperty…)
//                  │
//                  └──> null (end of chain)

// ==============================================
// 7.4 Pattern 3: Mixins (Behavior Reuse)
// ==============================================

// Definition:
// Mixins are plain objects or functions that contain methods.
// These methods can be copied into other objects or class prototypes.
// Useful for reusing behaviors across multiple objects without deep inheritance chains.

// Example: 

let canEat = {
    eat() {
        console.log(this.name + " eats");
    }
};

let canBark = {
    bark() {
        console.log(this.name + " barks");
    }
};

// Constructor function
function Dog_Four(name) {
    this.name = name; // instance-specific property
}

// Copy behaviors from mixins into Dog_Four.prototype
Object.assign(Dog_Four.prototype, canEat, canBark);

// Create a Dog instance
let d_Four = new Dog_Four("Tommy");

// Using the methods
d_Four.eat();  // Tommy eats (from canEat)
d_Four.bark(); // Tommy barks (from canBark)

// How it works:
// - Object.assign copies all methods from canEat and canBark into Dog_Four.prototype
// - Now every Dog_Four instance can use eat() and bark()
// - No need for multiple inheritance levels

// =====================================================
// 7.5 Pattern 4: Composition over Inheritance
// =====================================================

// Definition:
// Instead of deep inheritance chains, create small, independent capabilities
// and combine (compose) them into objects. This approach is modular and easy to test.

// Example:

let canEat2 = {
    eat() {
        console.log(this.name + " eats");
    }
};

let canBark2 = {
    bark() {
        console.log(this.name + " barks");
    }
};

// Factory function creates a new dog object and composes behaviors
function createDog(name) {
    let dog = { name }; // own property
    // Copy behaviors into the new object
    return Object.assign(dog, canEat2, canBark2);
}

// Create a dog instance
let dog1 = createDog("Tommy");

// Using the methods
dog1.eat();  // Tommy eats
dog1.bark(); // Tommy barks

// How it works:
// - Each dog object is created fresh with its own properties
// - Behaviors are copied using Object.assign
// - No prototype chaining needed


// ======================================
// 8.1 Engine Prototype Handling
// ======================================

// Definition:

// JavaScript engines like V8 (Chrome) or SpiderMonkey (Firefox) optimize prototype chain lookups.

// Normally, if you access a property, JS engine traverses the prototype chain until it finds it.

// This traversal can be slow for deep chains.

// Engines use optimizations like Hidden Classes and Inline Caching to make property access fast.

// Example of prototype chain lookup:

let parent = {
    greet() { console.log("Hello!"); }
};

let child = Object.create(parent);
child.name = "Tommy";

// Accessing properties
console.log(child.name);  // Tommy  -> found directly on child
child.greet();            // Hello! -> not on child, found on parent

// How engine optimizes:
// - Tracks object shapes (Hidden Classes)
// - Stores property offsets internally
// - Uses inline caching so next time same property is accessed, it is faster

// Tip:

// If an object’s structure (properties) is predictable and consistent, engine can optimize access faster.

// Avoid adding/removing properties dynamically in random order.

// ===========================
// 8.2 Hidden Classes
// ===========================

// Definition:
// JS engines (V8) do not have real classes internally.
// But for optimization, V8 creates hidden classes for objects.
// Hidden Class tracks properties and their memory offsets, so property access is faster.

// Example:

function User_8_1(name) {
    this.name = name;
    this.age = 12;
}

// Creating two objects with same constructor
let u1 = new User_8_1("A");
let u2 = new User_8_1("B");

// Both u1 and u2 have the same hidden class because:
// - They have the same properties
// - Properties are assigned in the same order

// Engine can now access properties faster via offsets in hidden class

// If we create properties in different order or add new ones dynamically:

let u3 = {};
u3.age = 12;
u3.name = "C";  // different order than User constructor

// u3 gets a different hidden class -> slower property access

// Tip for developers:
// - Always initialize properties in constructor in the same order
// - Avoid adding random properties after object creation
// This helps engine optimize property access

// Summary:-

// Engine Prototype Handling:--

// JS normally traverses the prototype chain to find properties.
// Engines optimize this using Hidden Classes and Inline Caching for faster access.
// Keep object structures predictable for best performance.

// Hidden Classes:--

// V8 creates internal hidden classes to track property positions.
// Objects with same properties in same order share the same hidden class → fast.
// Different order → new hidden class → slower.

// =====================================
// 8.3 Inline Caching (IC)
// =====================================

// Definition:
// JavaScript engines like V8 optimize property/method lookup by caching the access site.
// This is called Inline Caching (IC).
// If a property is accessed frequently, engine remembers its location (offset), 
// so it doesn't traverse the prototype chain repeatedly.

// Example:

function printName(u) {
    console.log(u.name);
}

// Objects with same shape (same hidden class)
let xy1 = { name: "A" };
let xy2 = { name: "B" };

// Access the property multiple times
printName(xy1); // A
printName(xy2); // B

/*
Step by step:
1. xy1 and xy2 have the same property "name" and same hidden class.
2. When printName(u1) is called, engine finds offset of 'name' in hidden class.
3. When printName(u2) is called, engine uses cached offset → very fast.
4. If objects have different shapes (e.g., sometimes {name}, sometimes {age}), cache is busted → slower.
*/

// Tip:
// Always pass objects with consistent property order/shape for faster access.


// ===========================
// 8.4 Prototype Chain Depth
// ===========================

// Definition:
// The longer the prototype chain, the more steps JS engine must traverse for property lookup.
// Deep chains can impact performance, though engines optimize simple chains.

// Example:

let obj1 = { a: 1 };
let obj2 = Object.create(obj1); // obj2 → prototype is obj1
let obj3 = Object.create(obj2); // obj3 → prototype is obj2

console.log(obj3.a); // 1

/*
Step by step:
1. obj3.a is not in obj3 → check obj3.__proto__ (obj2)
2. obj2.a is not found → check obj2.__proto__ (obj1)
3. obj1.a found → return 1
*/

// Guidelines:
// - 1–2 prototype levels → fine, no noticeable cost
// - 10+ levels → slower property lookup
// - Avoid unnecessarily deep inheritance chains for performance

// Tip:
// Prefer composition or shallow prototype chains when possible.

// ===========================
// 8.5 Property Shadowing (Easy English)
// ===========================

// Definition:
// When an object has its own property with the same name as a property in its prototype,
// the object's property "shadows" the prototype property.
// This means the object's property is used first.
// Frequent shadowing can slightly slow down performance.

let parentObj = { color: "red" };   // prototype object
let childObj = Object.create(parentObj);  // childObj inherits from parentObj

console.log(childObj.color); // "red" (inherited from prototype)

// Shadowing: define the same property on the child object
childObj.color = "blue";

console.log(childObj.color);   // "blue" (own property shadows prototype)
console.log(parentObj.color);  // "red" (prototype remains unchanged)

/*
Step by Step:
1. childObj initially does not have 'color' → engine looks in parentObj → finds "red"
2. After childObj.color = "blue" → childObj now has its own 'color' → shadows parentObj
3. Shadowing frequently can cause small slowdowns in engines because caches need updating
*/

// Tip:
// Avoid too much shadowing in performance-critical code.


// ====================================================
// 8.6 Object.setPrototypeOf / __proto__ Performance
// ====================================================

// Definition:
// Changing an object's prototype at runtime is very expensive.
// Engines like V8 must throw away hidden classes and inline caches, 
// and create new ones → slows down performance.

let mainObj = {};         // original object
let protoObj = { greet: "hello" };  // prototype object

console.log(mainObj.greet); // undefined (no prototype yet)

// Runtime prototype change
Object.setPrototypeOf(mainObj, protoObj);

console.log(mainObj.greet); // "hello" (inherited from protoObj)

// Step by step explanation:
// 1. mainObj initially has no properties and no prototype linked to greet.
// 2. Object.setPrototypeOf sets protoObj as the prototype of mainObj.
// 3. Now, mainObj.greet looks up protoObj and finds "hello".

// Tip:
// Always set correct prototype during object creation using Object.create(protoObj)
// Avoid Object.setPrototypeOf or mainObj.__proto__ at runtime → slows down code

// ===================================================
// 8.7 Functions as Constructors vs Factory Functions 
// ===================================================

// 1 Constructor Function Approach
function PersonConstructor(fullName, ageYears) {
    this.fullName = fullName;
    this.ageYears = ageYears;
}

// Create instances using "new"
let personA = new PersonConstructor("Alice", 25);
let personB = new PersonConstructor("Bob", 30);

console.log(personA.fullName); // Alice
console.log(personB.ageYears); // 30

// Features / Pros:
// - Engine applies hidden class optimization (fast property lookup)
// - Methods can be added to prototype and shared → memory efficient
// - "new" automatically binds this and sets prototype link

// Cons:
// - If properties are added in different order → new hidden class created → slower
// - Forgetting "new" → global pollution or undefined return

// -----------------------------

// 2 Factory Function Approach (Object.create)
let protoMethods = {
    greet() { console.log("Hello, " + this.fullName); }
};

function createPerson(fullName, ageYears) {
    let newPerson = Object.create(protoMethods); // set prototype manually
    newPerson.fullName = fullName;
    newPerson.ageYears = ageYears;
    return newPerson;
}

// Create instances
let personC = createPerson("Charlie", 28);
let personD = createPerson("Dana", 35);

personC.greet(); // Hello, Charlie
personD.greet(); // Hello, Dana

// Features / Pros:
// - Flexible, no "new" needed
// - Prototype link is controlled manually
// - Works well with composition / mixins

// Cons:
// - Unpredictable object shapes → engine optimizations break
// - Prototype methods need manual linking

// ===========================
// Summary Tips:
// ===========================
// 1. Keep object property order consistent → fast hidden class lookup
// 2. Prototype methods → memory efficient, share across instances
// 3. Instance-specific properties → set in constructor/factory
// 4. Avoid changing prototype at runtime

// ========================================
// 8.8 Static Methods vs Prototype Methods
// ========================================

// 1 Prototype / Instance Methods
class Employee {
    constructor(fullName) {
        this.fullName = fullName;
    }

    introduce() {  // prototype method
        console.log("Hi, I am " + this.fullName);
    }
}

let empA = new Employee("Alice");
let empB = new Employee("Bob");

empA.introduce(); // Hi, I am Alice
empB.introduce(); // Hi, I am Bob

// Key Points:
// - introduce() stored on Employee.prototype
// - All instances share the same method → memory efficient
// - Engine can optimize prototype lookups (hidden classes, inline caching)

// -----------------------------

// 2 Static Methods
class EmployeeWithStatic {
    constructor(fullName) {
        this.fullName = fullName;
    }

    static companyInfo() {
        console.log("We are Acme Corp");
    }

    showName() {  // prototype method
        console.log("Employee: " + this.fullName);
    }
}

let empC = new EmployeeWithStatic("Charlie");

empC.showName();      // Employee: Charlie
EmployeeWithStatic.companyInfo(); // We are Acme Corp
// empC.companyInfo(); Error: instance cannot access static method

// Summary Tips:
// 1. Common behavior for instances → prototype methods
// 2. Utility or helper functions → static methods
// 3. Instance calls prototype methods; class calls static methods

// ========================================
// 8.9 Property Access Tips for Speed
// ========================================

// 1 Consistent Property Order
function UserFast(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

let user1 = new UserFast("Alice", "Smith");
let user2 = new UserFast("Bob", "Brown");

// Always assign properties in the same order
// - Engine (V8) creates a predictable hidden class
// - Property offsets known → fast access

// -----------------------------

// 2 Avoid Adding/Deleting Properties After Object Becomes "Hot"
user1.age = 25;        // avoid if object used frequently
delete user1.age;      // avoid

// - Adding/deleting properties at runtime breaks engine optimizations
// - Inline caches may invalidate → slower property access

// -----------------------------

// 3Prefer Object.create over Object.setPrototypeOf
let proto = { greet() { console.log("Hello"); } };
let objFast = Object.create(proto); // fast
// Object.setPrototypeOf(objFast, proto); // slow at runtime

// - Runtime prototype change is expensive
// - Engine discards caches and hidden classes

// -----------------------------

// 4 Keep Prototype Chains Shallow
let base = { a: 1 };
let level1 = Object.create(base);
let level2 = Object.create(level1);

console.log(level2.a); // 1

// - 1–2 levels → fine
// - 10+ levels → noticeable slowdown
// - Prefer composition over deep inheritance

// ===========================
// Quick Summary Table
// ===========================
// Tip                             ==>>  Reason
// Same property order             ==>>  Hidden class optimized offsets
// Avoid adding/deleting           ==>>  Breaks inline caching
// Use Object.create               ==>>  Runtime prototype change expensive
// Keep prototype chain shallow    ==>>  Faster prototype lookup
