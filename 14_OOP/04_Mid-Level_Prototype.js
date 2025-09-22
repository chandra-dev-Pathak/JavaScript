/**
 * ========== 2.1 — What is a Prototype Chain? ==========
 *
 * Core idea:
 * - Every JavaScript object has a hidden internal slot called [[Prototype]].
 * - This slot points to another object (its prototype).
 * - When you try to access a property or method:
 *     1. JavaScript first checks the object itself.
 *     2. If not found, it automatically looks up the prototype chain.
 *     3. This continues until it reaches null (the end of the chain).
 *
 * How to access prototype:
 * - Old way (legacy): obj.__proto__
 * - Modern way (recommended): Object.getPrototypeOf(obj)
 */


// Example
const person = { name: "Ashok" };
console.log(Object.getPrototypeOf(person) === Object.prototype); // true

// person is a plain object literal.
// Its prototype is Object.prototype.
// And Object.prototype itself has prototype = null (end of chain).


/**
 * Mental Model:
 *
 * Think of it like a ladder:
 *
 * 1. First, search happens on the current step (the object itself).
 * 2. If property not found, move one step up (the prototype).
 * 3. Keep climbing until either:
 *      - The property is found, or
 *      - You reach null (no more steps).
 *
 * This chain of objects linked by [[Prototype]] is called the Prototype Chain.
 */

/**
 * ========== 2.2 — Lookup Algorithm (Step-by-Step) ==========
 *
 * When you write: obj.prop
 * JavaScript runs a systematic search called the property lookup algorithm.
 
 * Plain language summary:
 * 1) Check the object's own properties.
 * 2) If not found, check the object's [[Prototype]].
 * 3) Repeat on each prototype up the chain.
 * 4) If you reach null and nothing was found → result is undefined.
 */


/* ---------- Example setup ---------- */
function PersonTwo(name) {
    this.name = name; // own property
}

PersonTwo.prototype.sayHello = function () {
    console.log("Hello " + this.name);
};

let p = new PersonTwo("Abhi");


/* ---------- Step-by-step lookup for p.sayHello() ---------- */
/*
  1) Own property check:
     - Does p have an own property named "sayHello"?
     - If yes → return that value and stop.
     - In our example: no.

  2) Prototype check:
     - Get Object.getPrototypeOf(p) (same as p.__proto__).
     - That is PersonTwo.prototype.
     - Check PersonTwo.prototype for own property "sayHello".
     - If found → return it.
     - In our example: found PersonTwo.prototype.sayHello.

  3) Repeat up the chain:
     - If not found on PersonTwo.prototype, move to
       Object.getPrototypeOf(PersonTwo.prototype) which is Object.prototype,
       then check Object.prototype, and so on.

  4) Chain end:
     - When prototype is null, stop.
     - If nothing found → result is undefined.
*/

/* Demonstration: */
p.sayHello(); // Step-through: p has no 'sayHello' → PersonTwo.prototype has it → prints "Hello Abhi"

console.log('sayHello' in p); // true  (exists somewhere in chain)
console.log(p.hasOwnProperty('sayHello')); // false (not an own property)
console.log(Object.getPrototypeOf(p) === PersonTwo.prototype); // true


/* ---------- Visualization (ASCII) ----------
 *
 * p  (own props: name = "Abhi")
 * ├─ name = "Abhi"        <- own property found quickly for p.name
 * └─ [[Prototype]] → PersonTwo.prototype
 *                      ├─ sayHello()    <- found here for p.sayHello
 *                      └─ [[Prototype]] → Object.prototype
 *                                            ├─ toString()
 *                                            └─ [[Prototype]] → null
 *
 * Lookup examples:
 * - p.name       -> found on p (own) -> value returned
 * - p.sayHello   -> not on p, found on PersonTwo.prototype -> function returned
 * - p.toString   -> not on p, not on PersonTwo.prototype, found on Object.prototype
 * - p.xyz        -> not found anywhere -> undefined
 */


/* ---------- Dynamic behavior example ----------
 * Lookup is dynamic: if you add a property to a prototype later,
 * existing instances see it immediately because lookup happens at access time.
 */
PersonTwo.prototype.wave = function () { return "Ting tong"; }; // added after instance creation
console.log(p.wave()); // works, because lookup finds wave on PersonTwo.prototype

/* ---------- Important practical notes ----------
 * - Every property access may require a chain traversal until a match is found.
 * - Engines (V8, SpiderMonkey, JavaScriptCore) heavily optimize common access patterns
 *   using techniques like hidden classes and inline caches, so repeated access is fast.
 * - Changing prototypes at runtime (Object.setPrototypeOf or modifying __proto__)
 *   can prevent or undo those optimizations and hurt performance.
 */


//  * ========== 2.3 — Example: Own vs Prototype Properties ==========

/* ---------- Example  ---------- */
function Car(model) {
    this.model = model;   // own property (each instance gets its own copy)
}

Car.prototype.wheels = 4; // prototype property (shared by all instances)

let bmw = new Car("BMW");


/* ---------- Access examples ---------- */
console.log(bmw.model);      // "BMW"  ← found directly on bmw (own property)
console.log(bmw.wheels);     // 4      ← not on bmw, found on Car.prototype
console.log("toString" in bmw); // true (inherited from Object.prototype)


/* ---------- Lookup breakdown ----------
 *
 * bmw.model
 * - Check bmw itself → found (own property).
 *
 * bmw.wheels
 * - Check bmw → not found.
 * - Check Car.prototype → found (shared property).
 *
 * bmw.toString
 * - Check bmw → not found.
 * - Check Car.prototype → not found.
 * - Check Object.prototype → found (built-in method).
 */


/* ---------- Visualization (ASCII diagram) ----------
 *
 * bmw (own: model = "BMW")
 *  │
 *  └──> Car.prototype (has: wheels = 4)
 *         │
 *         └──> Object.prototype (has: toString, hasOwnProperty, ...)
 *                │
 *                └──> null
 *
 */


/* ---------- Key point ----------
 *
 * - Constructor function (Car) → adds own properties to each new object.
 * - Prototype object (Car.prototype) → provides shared properties/methods.
 * - Built-in Object.prototype → top of the chain, provides core methods.
 */

/**
 * ========== 2.4 — Shadowing in Prototype Chain ==========
 *
 * Shadowing means:
 * - If a property exists both on the object itself (own property)
 *   and somewhere in its prototype chain,
 *   the object's own property always takes priority.
 *
 * The prototype's property is not deleted or changed,
 * it is simply "hidden" during lookup.
 */


/* ---------- Example ---------- */
function Bike() { }

Bike.prototype.wheels = 2; // property on the prototype

let honda = new Bike();
bmw.wheels = 6;           // own property added → shadows the prototype property

console.log(honda.wheels);           // 6  (own property wins)
console.log(honda.__proto__.wheels); // 2  (prototype property still exists)


/* ---------- How it works ----------
 *
 * - honda.wheels = 6 → creates a new property directly on honda.
 * - When we access honda.wheels:
 *     1. JS first checks honda itself.
 *     2. It finds the own property wheels = 6.
 *     3. Lookup stops, prototype chain is not checked.
 * - The prototype property (wheels = 2) is untouched,
 *   but is now shadowed by the own property.
 */


/* ---------- Shadowing and delete ----------
 * If you delete the own property, the prototype’s property becomes visible again.
 */
delete honda.wheels;

console.log(honda.wheels);           // 2 (falls back to prototype)
console.log(honda.hasOwnProperty("wheels")); // false
console.log("wheels" in honda);      // true (found in prototype)


/* ---------- Interview angle ----------
 *
 * - Shadowing does NOT overwrite or remove the prototype’s property.
 * - It only creates a new property on the instance that hides the prototype one.
 * - Deleting the own property reveals the prototype property again.
 */

/**
 * ========== 2.5 — "in" vs "hasOwnProperty" ==========
 *
 * In JavaScript, we often need to check whether a property exists on an object.
 * There are two common ways: the "in" operator and the "hasOwnProperty" method.
 */


/* ---------- 1. in operator ----------
 * Syntax: 'prop' in obj
 *
 * - Checks both:
 *     1. Own properties of the object
 *     2. Properties inherited via the prototype chain
 */
let parent = { b: 2 };
let obj = { a: 1 };
let one = Object.setPrototypeOf(obj, parent); // obj now inherits from parent

console.log("a" in obj); // true  (own property)
console.log("b" in obj); // true  (inherited from prototype)
console.log("toString" in obj); // true (inherited from Object.prototype)


/* ---------- 2. hasOwnProperty method ----------
 * Syntax: obj.hasOwnProperty('prop')
 *
 * - Checks ONLY the object's own properties.
 * - Ignores properties on the prototype chain.
 */
console.log(obj.hasOwnProperty("a")); // true  (own property)
console.log(obj.hasOwnProperty("b")); // false (prototype property)
console.log(obj.hasOwnProperty("toString")); // false (inherited)


/* ---------- 3. Special case: prototype-less objects ----------
 * - Objects created via Object.create(null) have no prototype,
 *   so .hasOwnProperty method does not exist.
 */
let dict = Object.create(null);
// console.log(dict.hasOwnProperty("x")); // ERROR: undefined

// Safe way to check properties in such cases:
console.log(Object.prototype.hasOwnProperty.call(dict, "x")); // false


/* ---------- Key Takeaways ----------
 * - "in" → checks both own and inherited properties.
 * - hasOwnProperty → checks only own properties.
 * - For prototype-less objects, use Object.prototype.hasOwnProperty.call().
 */

function A() { }
A.prototype.sayA = function () { console.log("A"); };

function B() { }
B.prototype = Object.create(A.prototype); // B inherits from A

B.prototype.constructor = B;
B.prototype.sayB = function () { console.log("B"); };

let b = new B();
b.sayA(); // "A"  (inherited from A.prototype)
b.sayB(); // "B"  (own prototype method)

/**
 * ========== 2.6 — Multi-level Prototype Chain Example ==========
 *
 * This example demonstrates multi-level inheritance
 * and how JavaScript traverses the prototype chain to find properties.
 */


/* ---------- Example ---------- */
function A() { }
A.prototype.sayA = function () { console.log("A"); };

function B() { }
B.prototype = Object.create(A.prototype); // B inherits from A
B.prototype.constructor = B;              // restore constructor
B.prototype.sayB = function () { console.log("B"); };

let c = new B();


/* ---------- Method calls ---------- */
c.sayA(); // "A"  (inherited from A.prototype)
c.sayB(); // "B"  (own prototype method)
console.log(c.toString()); // inherited from Object.prototype


/* ---------- Lookup Chain Diagram ----------
 *
 * c
 * │
 * └──> B.prototype { sayB }
 *        │
 *        └──> A.prototype { sayA }
 *               │
 *               └──> Object.prototype { toString, hasOwnProperty, ... }
 *                      │
 *                      └──> null
 */


/* ---------- Step-by-step property access ----------
 *
 * c.sayB()
 * - Check c → not found
 * - Check B.prototype → found → returns "B"
 *
 * c.sayA()
 * - Check c → not found
 * - Check B.prototype → not found
 * - Check A.prototype → found → returns "A"
 *
 * c.toString()
 * - Check c → not found
 * - Check B.prototype → not found
 * - Check A.prototype → not found
 * - Check Object.prototype → found → returns function
 */


/* ---------- Key Points ----------
 *
 * - Multi-level inheritance allows one prototype to inherit from another.
 * - Property lookup goes level by level up the chain until found or null.
 * - Deep prototype chains increase lookup time (O(depth)), so avoid overly deep chains.
 * - JS engines optimize common access patterns (hidden classes, inline caches).
 */

// =====================================================================================
// =====================================================================================

/**
 * ========== 3.1 — Constructor Function ==========
 *
 * A constructor function is just a normal function,
 * but it is used to create objects using the `new` keyword.
*
* Conventions:
 * - Name starts with a capital letter (e.g., User, Car, Person).
 * - When called with `new`, JavaScript:
 *    1. Creates a fresh empty object.
 *    2. Sets `this` inside the function to that new object.
 *    3. Links the object’s [[Prototype]] to the constructor’s prototype.
 *    4. Returns the new object.
*/


/* ---------- Example ---------- */
function Car(name, model) {
    this.name = name; // property assigned to new object
    this.model = model;
}

let u1 = new Car("alto", 2012);
let u2 = new Car("XUV", 2021);

console.log(u1.name); // "alto"
console.log(u2.model);  // 2021


/* ---------- Notes ----------
 *
 * - Without `new` → Car runs like a normal function,
 *   and `this` may refer to global / undefined (in strict mode).
*
* - With `new` → a new object is created automatically,
 *   and properties are assigned to it.
 *
 * - Constructor functions work like blueprints —
 *   you can create multiple objects with the same structure.
*/


/* ---------- Mental Model ----------
 *
 * new Car("alto", 2012) internally does:
*
 * let temp = {};
 * temp.__proto__ = Car.prototype;
 * User.call(temp, "alto", 2012);
 * return temp;
 *
*/

/**
 * ========== 3.2 — What the `new` keyword does (step-by-step) ==========
 *
 * When you write: let u = new User("Chandra", 12);
 * JavaScript performs several internal steps to create and return the instance.
 * Below is a clear, small-step breakdown plus examples.
*/


/* ---------- Example constructor ---------- */
function User(name, age) {
    this.name = name;
    this.age = age;
}
let u = new User("Chandra", 12);


/* ---------- Internal steps (behind the scenes) ----------
 *
 * 1) Create a fresh blank object
 *    let obj = {};
 *
 * 2) Set the object's internal prototype to the constructor's prototype
 *    obj.__proto__ = User.prototype;
 *    (equivalently: let obj = Object.create(User.prototype))
 *
 * 3) Call the constructor function with `this` bound to that object
 *    let result = User.call(obj, "Chandra", 12);
 *    - Inside User, `this` refers to obj.
 *    - The constructor may add properties to `this`.
 *
 * 4) Return rule:
 *    - If the constructor returned an object (non-null) or function, return that value.
 *    - Otherwise (no return or primitive return), return the newly created obj.
 *
 * In short:
 *    new = create object + link prototype + run constructor + return object (or returned object)
 */


/*

### ================= 3.3 — Why put methods on the prototype =================

When you define a method inside the constructor function, every time you create a new object it creates a new copy of that method.
That means more memory use and each object has its own separate function object.

When you define a method on the prototype, all objects created from that constructor share one single method.
That means less memory and consistent behavior.
*/


// #### Example 1: Inside constructor(Bad Practice)

function Pikku(name) {
    this.name = name;
    this.sayHi = function () {
        console.log("Hi " + this.name);
    };
}

let o1 = new Pikku("A");
let o2 = new Pikku("B");

console.log(o1.sayHi === o2.sayHi);
// false → different function objects (memory waste)

// Every `new Pikku()` call creates a new function object for `sayHi`.


// #### Example 2: Prototype method(Good Practice)

function Niku(name) {
    this.name = name;
}
Niku.prototype.sayHi = function () {
    console.log("Hi " + this.name);
};

let p1 = new Niku("A");
let p2 = new Niku("B");

console.log(p1.sayHi === p2.sayHi);
// true → same shared method (memory efficient)

// Here both `p1` and `p2` point to the same function on `User.prototype`.


// #### Benefits of putting methods on the prototype

// * Memory efficient(one function shared across all instances)
// * Same identity(useful for removing event listeners or comparisons)
// * Standard JavaScript practice


// #### Rule of Thumb

// * Properties / data → inside constructor(each object’s own state)
// * Methods / behavior → on prototype(shared across all objects)

// ============== 3.7 – Pitfalls of `new` keyword in JavaScript ================

// ===============================
// Pitfall 1: Forgetting `new`
// ===============================

function UserExample(name) {
    this.name = name;
}

// Forgot to use new:
let wrongUser = UserExample("Chandra"); // no `new`
console.log(wrongUser);                 // undefined
console.log(globalThis.name);           // "Chandra" (pollution in non-strict mode)

// Correct way:
let correctUser = new UserExample("Chandra");
console.log(correctUser.name);          // "Chandra"

// In strict mode, `this` would be undefined instead of polluting global object
"use strict";
function StrictUserExample(name) {
    this.name = name;
}
// let badStrict = StrictUserExample("Alex"); // would throw error because this = undefined



// ===============================
// Pitfall 2: Constructor returning an object
// ===============================

function FooExample() {
    this.a = 10;
    return { a: 20 }; // explicitly returning object
}

let fooInstance = new FooExample();
console.log(fooInstance.a); // 20
// If constructor returns an object, that object replaces `this` automatically.



// ===============================
// Pitfall 3: Constructor returning a primitive
// ===============================

function BarExample() {
    this.b = 30;
    return 100; // primitive returned
}

let barInstance = new BarExample();
console.log(barInstance.b); // 30
// If constructor returns a primitive, it is ignored and `this` is returned.



// ===============================
// Summary Table (as comments)
// ===============================

// Case                    | Behavior
// return object           | object returned, `this` ignored
// return primitive        | primitive ignored, `this` returned
// no return               | `this` returned

// ================ 3.7 – Polyfill of `new`  ============

// =======================================
// Polyfill Implementation of `new`
// =======================================

function createInstancePolyfill(ConstructorFn, ...args) {
    // 1. Create a blank object linked to ConstructorFn.prototype
    let instance = Object.create(ConstructorFn.prototype);

    // 2. Call the constructor with `this` bound to the new object
    let returnedValue = ConstructorFn.apply(instance, args);

    // 3. If constructor returned an object, use it; otherwise return the new instance
    if (returnedValue !== null && (typeof returnedValue === "object" || typeof returnedValue === "function")) {
        return returnedValue;
    }
    return instance;
}

// =======================================
// Usage Example
// =======================================

function VehicleExample(model) {
    this.model = model;
}

let v1 = createInstancePolyfill(VehicleExample, "BMW");

console.log(v1.model); // "BMW"
console.log(v1.__proto__ === VehicleExample.prototype); // true

// =======================================
// Step-by-step how createInstancePolyfill works:
// 1. Object.create(ConstructorFn.prototype) → new object with correct prototype
// 2. ConstructorFn.apply(instance, args) → calls constructor, binds `this` = instance
// 3. If constructor returns an object → return it; else return the created instance
// This replicates exactly what `new` does internally.

// =====================================================================================
// =====================================================================================

// ==================== 4.1 – Object.create(proto) ========================

// =======================================
// What Object.create(proto) does
// =======================================
// - Creates a new object whose internal [[Prototype]] you can specify.
// - This is the cleanest and most recommended way to create an object 
//   with a desired prototype.
// - Syntax: Object.create(proto, [propertiesObject])
//   proto → the object to use as the prototype.
//   propertiesObject (optional) → property descriptors.

// =======================================
// Example Usage
// =======================================

let animalExample = {
    eats: true,
    walk() { console.log("Animal walking"); }
};

// Create a new object whose prototype = animalExample
let rabbitExample = Object.create(animalExample);
rabbitExample.jumps = true;

console.log(rabbitExample.eats);  // true (inherited from prototype)
rabbitExample.walk();             // "Animal walking"
console.log(Object.getPrototypeOf(rabbitExample) === animalExample); // true

// =======================================
// Diagram of the prototype chain
// =======================================
//
// rabbitExample { jumps: true }
//      │
//      └──> animalExample { eats: true, walk() }
//                │
//                └──> Object.prototype
//                        │
//                        └──> null
//
// Key Takeaways:
// - Object.create(proto) = create a new object with given prototype.
// - Does not call any constructor.

// ===================== 4.2 – Object.getPrototypeOf(obj) ===================

// =======================================
// What Object.getPrototypeOf(obj) does
// =======================================
// - Returns the prototype of the given object.
// - Official, safe and standard alternative to the non-standard __proto__.
// - Only for reading the prototype (does not change it).
// - Syntax: Object.getPrototypeOf(obj)

// =======================================
// Example Usage
// =======================================

let protoExample = { x: 1 };
let objExample = Object.create(protoExample);

console.log(Object.getPrototypeOf(objExample) === protoExample); // true

// Here objExample’s prototype is protoExample, so this prints true.

// Key Takeaways:
// - Use Object.getPrototypeOf(obj) to check an object’s prototype.
// - This is the modern replacement for obj.__proto__.
// - It is read-only (does not modify the prototype).

// ================= 4.3 – Object.setPrototypeOf(obj, proto) ================
// This file explains what Object.setPrototypeOf does and shows an example.

// =======================================
// What Object.setPrototypeOf(obj, proto) does
// =======================================
// - Changes the prototype of an existing object at runtime.
// - Official, modern alternative to using obj.__proto__ = proto.
// - Syntax: Object.setPrototypeOf(obj, proto)

// =======================================
// Example Usage
// =======================================

let aONE = {};
let bONE = { hello: "world" };

Object.setPrototypeOf(aONE, bONE);

console.log(aONE.hello); // "world" (inherited from prototype)
console.log(Object.getPrototypeOf(aONE) === bONE); // true

// Now aONE’s prototype is bONE, so aONE can access properties from bONE.

// =======================================
// Warnings & Best Practice
// =======================================
// - Changing prototypes at runtime is slow and can break engine optimizations.
// - Best practice: create objects with the correct prototype from the start using Object.create().

// Key Takeaways:
// - Object.setPrototypeOf(obj, proto) → modifies prototype.
// - Object.getPrototypeOf(obj) → reads prototype.
// - Object.create(proto) → creates new object with given prototype.

// ===================== 4.4 – Object.create(proto, descriptors) ====================

// ================================================
// What Object.create(proto, descriptors) does
// ================================================
// - Creates a new object with a specific prototype.
// - Lets you define initial properties with full control (value, writable, enumerable, configurable).

// - Syntax:
//   Object.create(proto, {
//     propName: {
//       value: someValue,
//       writable: true/false,
//       enumerable: true/false,
//       configurable: true/false
//     }
//   });

// Example Usage

let personProto = {
    greet() { console.log("Hello " + this.name); }
};

let john = Object.create(personProto, {
    name: {
        value: "John",
        writable: true,
        enumerable: true,
        configurable: true
    }
});

john.greet(); // "Hello John"
console.log(john.name); // "John"

// =======================================
// Explanation
// =======================================
// - john’s prototype is personProto.
// - john also has its own property 'name' with specified descriptors.
// - This is similar to using a constructor but without actually writing one.

// 4.5 – new vs Object.create in JavaScript
// This file compares how 'new' and 'Object.create' differ.

// =======================================
// Comparison Table
// =======================================
// Feature           | new                             | Object.create
// ------------------|---------------------------------|------------------------------
// Constructor call? | Yes – constructor function runs | No – no function runs
// Prototype set?    | Automatically from Fn.prototype | Whatever proto you pass
// Use case          | Constructor pattern (init + proto link) | Pure prototypal inheritance (no init)

// Example with 'new'

function New_Call(name) {
    this.name = name;
}
New_Call.prototype.sayHi = function () {
    console.log("Hi " + this.name);
};

let i1 = new New_Call("A"); // constructor runs
i1.sayHi(); // "Hi A"

// =======================================
// Example with Object.create
// =======================================

function Create_call(name) {
    this.name = name;
}
Create_call.prototype.sayHi = function () {
    console.log("Hi " + this.name);
};

let i2 = Object.create(Create_call.prototype); // only prototype link set
i2.name = "B"; // manually add property
i2.sayHi(); // "Hi B"

// Explanation
// new = object creation + constructor call + prototype link
// Object.create(proto) = object creation + prototype link (no constructor call)


class P_NINE {

    #n = "LAPPI"

    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hey ${this.name}`);
    }

    getNAME() {
        console.log(`${this.#n}`);

    }

}

class E_NINE extends P_NINE {

    constructor() {
        super(name);
    }

    work() {
        console.log(`Manage bank deatils ${this.name}`);
    }

    static aboutWork() {
        console.log(`Bank Deatils Empoloyee Name is ${this.name}`);
    }

}

let val = new E_NINE("HAM");

val.sayHello();
val.getNAME();
val.work();
E_NINE.aboutWork();

// =====================================================================================

// =====================================================================================

// ===================== 5.1 – Class Syntax in JavaScript =====================
// ES6 introduced 'class' as a cleaner way to define constructor functions + prototype methods.

// =======================================
// Class Example
// =======================================
class UserTEN {
    constructor(name) {           // Constructor runs when new User() is called
        this.name = name;           // Assign property to instance
    }

    sayHi() {                     // This becomes a method on User.prototype
        console.log("Hi " + this.name);
    }
}

let uTEN = new UserTEN("RAM");     // Create new instance
uTEN.sayHi();                       // "Hi RAM"

// =======================================
// What actually happens internally
// =======================================

// The above class is roughly equivalent to:

function UserFnONE(name) {
    this.name = name;
}
UserFnONE.prototype.sayHi = function () {
    console.log("Hi " + this.name);
};

// Using the constructor-function approach
let u2ONE = new UserFnONE("Alex");
u2ONE.sayHi(); // "Hi Alex"

// =======================================
// Explanation
// =======================================
// - 'class' in JS is syntactic sugar over constructor functions + prototypes.
// - Inside a class:
//   - 'constructor()' becomes the function body of the constructor.
//   - All other methods become methods on the class's prototype.
// - Classes make code more readable but behave like functions + prototypes under the hood.

// ===================== Section_5_2_Class_Inside =====================
// Understanding what happens inside a class in JavaScript

// 1) Constructor method
// - Special method that runs automatically when we create a new instance using 'new'
// - Used to initialize instance properties

// 2) Normal methods
// - Any method defined inside the class (without static) is attached to the class prototype
// - Shared across all instances (no duplicate copies per object)

// 3) Static methods
// - Methods defined with 'static' keyword
// - Attached directly to the class object, not to the prototype
// - Cannot be called from instances, only from the class itself

// Example
class Car_5_2 {
    constructor(model) {              // constructor() runs for each new instance
        this.model = model;             // instance property
    }

    drive() {                         // normal method → goes to Car_5_2.prototype
        console.log(`${this.model} is driving`);
    }

    static info() {                   // static method → attached to class directly
        console.log("I am Car_5_2 class");
    }
}

// Creating an instance
let carInstance_5_2 = new Car_5_2("BMW");

// Using the prototype method
carInstance_5_2.drive();  // Output: "BMW is driving"

// Using the static method
Car_5_2.info();           // Output: "I am Car_5_2 class"

// Conceptual diagram:

// Car_5_2 (class function object itself)
// │
// ├── static methods: info()
// └── Car_5_2.prototype
//       ├── drive()   // prototype method
//       └── Object.prototype


// ===================== Section_5_3_Class_Inheritance =====================
// Understanding class inheritance in JavaScript using extends + super

// 1) extends keyword
// - Used to make one class inherit from another
// - Automatically sets up prototype chain

// 2) super()
// - Calls parent class constructor inside derived class constructor
// - Must be called before using 'this' in child constructor

// 3) Prototype chain under the hood
// - Child instance → ChildClass.prototype → ParentClass.prototype → Object.prototype
// - Child class object → ChildClass.__proto__ → ParentClass (for static inheritance)

class Animal_5_3 {
    constructor(name) {
        this.name = name; // instance property
    }

    eat() {            // prototype method
        console.log(`${this.name} eats`);
    }
}

class Dog_5_3 extends Animal_5_3 {
    constructor(name, breed) {
        super(name);      // parent constructor call
        this.breed = breed;
    }

    bark() {           // prototype method
        console.log(`${this.name} barks`);
    }
}

// Creating a child instance
let dog_5_3 = new Dog_5_3("Tommy", "Labrador");

// Accessing inherited method
dog_5_3.eat();  // Output: "Tommy eats"

// Accessing child method
dog_5_3.bark(); // Output: "Tommy barks"

// Internal prototype chain:

// Dog_5_3.prototype.__proto__ === Animal_5_3.prototype  // instance methods
// Dog_5_3.__proto__ === Animal_5_3                     // static methods

// Conceptual diagram:

// dog_5_3 (instance)
// │
// └──> Dog_5_3.prototype { bark }
//       │
//       └──> Animal_5_3.prototype { eat }
//              │
//              └──> Object.prototype


// Takeaways:-
// extends sets up prototype inheritance automatically.
// super() calls parent constructor and is mandatory before using this.
// Prototype chain ensures all inherited methods are accessible from child instance.

// ===================== Section_5_4_Class_Under_Hood =====================
// Understanding what happens behind the scenes with JavaScript classes

// ES6 class syntax is just syntactic sugar
// Internally, class = constructor function + prototype methods

// Example using class syntax
class Animal_5_4 {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(this.name + " eats");
    }
}

class Dog_5_4 extends Animal_5_4 {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    bark() {
        console.log(this.name + " barks");
    }
}

// Create instance
let dog_5_4 = new Dog_5_4("Tommy", "Labrador");
dog_5_4.eat();  // Output: Tommy eats
dog_5_4.bark(); // Output: Tommy barks

// Equivalent using constructor functions + prototype(What inside The class)

function AnimalFunc_5_4(name) {
    this.name = name;
}
AnimalFunc_5_4.prototype.eat = function () {
    console.log(this.name + " eats");
};

function DogFunc_5_4(name, breed) {
    AnimalFunc_5_4.call(this, name); // super call
    this.breed = breed;
}
DogFunc_5_4.prototype = Object.create(AnimalFunc_5_4.prototype);
DogFunc_5_4.prototype.constructor = DogFunc_5_4;
DogFunc_5_4.prototype.bark = function () {
    console.log(this.name + " barks");
};

// Key Points:
// - Methods written in class → attached to prototype automatically
// - extends → internally does Object.create(Parent.prototype)
// - super() → internally calls Parent.call(this, ...)
// - Class syntax = cleaner, modern, but prototype behavior same
// - Class methods are non-enumerable by default
// - Inheritance, prototype chain, static methods all follow same rules

// ===================== Section_5_5_Class_Special_Features =======================
// Understanding special behaviors of ES6 classes

// 1. Strict mode automatically
// Code inside class is always in strict mode
class UserClass_5_5 {
    constructor(name) {
        // In strict mode, assigning to undeclared variable throws error
        // Uncommenting below will throw ReferenceError
        // age = 20; // ReferenceError: age is not defined

        this.name = name;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}

let u5_5 = new UserClass_5_5("Alice");
u5_5.greet(); // Hello Alice

// 2. No hoisting
// Class declarations are not hoisted like function declarations
// Uncommenting below line will throw ReferenceError
// let test = new NoHoistClass(); // ReferenceError
class NoHoistClass { }

// 3. Methods are non-enumerable
// Class methods appear on prototype but are not enumerable
for (let key in UserClass_5_5.prototype) {
    // console.log(key); // nothing prints because methods are non-enumerable
}

// They still exist and work
u5_5.greet(); // Hello Alice

// 4. Cannot call class without 'new'
class TestClass_5_5 { }
// Uncommenting below will throw TypeError
// TestClass_5_5(); // TypeError: Class constructor TestClass_5_5 cannot be invoked without 'new'

// Correct way:
let t5_5 = new TestClass_5_5();

// Takeaways:
// - Class code = strict mode automatically
// - Class declarations are not hoisted
// - Methods = non-enumerable on prototype
// - Must use 'new' to instantiate

// ============================ Section_5_6_Super_Keyword ==========================
// Understanding how super works in ES6 classes

// 1. Using super() in constructor
// In derived classes (classes using extends), calling super() in constructor is mandatory
// before using 'this'. It calls the parent class constructor.

class ParentClass_5_6 {
    constructor(name) {
        this.name = name;
    }
}

class ChildClass_5_6 extends ParentClass_5_6 {
    constructor(name, age) {
        super(name); // Call parent constructor
        this.age = age;
    }
}

const child5_6 = new ChildClass_5_6("Abhi", 12);
console.log(child5_6.name); // Abhi
console.log(child5_6.age);  // 12

// 2. Using super.method() in normal methods
// Calls parent class method via prototype chain

class ParentMethod_5_6 {
    greet() {
        console.log("Hello from Parent");
    }
}

class ChildMethod_5_6 extends ParentMethod_5_6 {
    greet() {
        super.greet(); // Call parent method
        console.log("Hello from Child");
    }
}

new ChildMethod_5_6().greet();
// Output:
// Hello from Parent
// Hello from Child

// Takeaways:
// - super() calls parent constructor inside derived class constructor
// - super.method() calls a parent class prototype method

// ====================== Section_5_8_PrivateFieldsAndMethods ===================
// Demonstrating private fields and methods in ES2022+

// Base class: BankAccount
class BankAccount_5_8 {
    #balance = 0;             // private field
    #pinCode;                 // private field for security

    constructor(owner, pin) {
        this.owner = owner;     // public property
        this.#pinCode = pin;    // initialize private field
    }

    // Public method to deposit money
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            console.log(`${this.owner} deposited $${amount}. Current balance: $${this.#balance}`);
        } else {
            console.log("Invalid deposit amount");
        }
    }

    // Public method to check balance (requires PIN)
    checkBalance(pin) {
        if (this.#verifyPin(pin)) {      // calling private method
            return this.#balance;
        } else {
            console.log("Invalid PIN");
            return null;
        }
    }

    // Private method to verify PIN
    #verifyPin(pin) {
        return pin === this.#pinCode;
    }

    // Private method to reset balance
    #resetBalance() {
        this.#balance = 0;
    }

    // Public method to reset account (uses private reset method)
    resetAccount(pin) {
        if (this.#verifyPin(pin)) {
            this.#resetBalance();
            console.log(`${this.owner}'s account has been reset`);
        } else {
            console.log("Invalid PIN, cannot reset account");
        }
    }
}

// Derived class: SavingsAccount
class SavingsAccount_5_8 extends BankAccount_5_8 {
    constructor(owner, pin, interestRate) {
        super(owner, pin);
        this.interestRate = interestRate;
    }

    // Method to add interest
    addInterest(pin) {
        const balance = this.checkBalance(pin);
        if (balance !== null) {
            const interest = balance * this.interestRate / 100;
            this.deposit(interest);
            console.log(`Interest $${interest} added for ${this.owner}`);
        }
    }
}

// Usage
const myAccount = new SavingsAccount_5_8("Chandra", 1234, 5);

myAccount.deposit(1000);               // deposit $1000
console.log(myAccount.checkBalance(1234));  // check balance: 1000

myAccount.addInterest(1234);           // add 5% interest
console.log(myAccount.checkBalance(1234));  // check balance: 1050

myAccount.resetAccount(1234);          // reset account
console.log(myAccount.checkBalance(1234));  // check balance: 0

// Trying to access private fields/methods directly will fail
// console.log(myAccount.#balance);    // SyntaxError
// myAccount.#resetBalance();          // SyntaxError

/*
Key Points:
- Private fields (#balance, #pinCode) are accessible only inside class methods.
- Private methods (#verifyPin, #resetBalance) can only be called inside class.
- Inheritance works: derived classes can use public methods to interact with private data.
- Provides encapsulation and prevents external code from modifying sensitive data.
*/
