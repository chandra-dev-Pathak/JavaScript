/**
 * ==========1.1 Prototype System ==========
 * 
 * [[Prototype]] 
 * - Every object has a hidden link called [[Prototype]]
 * - This link points to another object
 * - This is how "inheritance" and "property lookup chain" works
 * - It’s internal (engine-level), not directly visible to users
 * 
 * obj.__proto__
 * - An old (legacy) way to read/write [[Prototype]]
 * - Works in browsers and Node.js
 * - Still supported but not recommended in production
 * - Instead, use: Object.getPrototypeOf / Object.setPrototypeOf
 * 
 * Fn.prototype
 * - Every function has a normal property called "prototype" (default: an object)
 * - When function is called with "new" → new object’s [[Prototype]] = Fn.prototype
 * - So, methods added on Fn.prototype are inherited by all new objects
 * 
 * ---------- Spec Notes ----------
 * ECMAScript spec: objects have [[Prototype]] internal slot
 * Object.getPrototypeOf(obj) reads this slot
 * __proto__ = a getter/setter on Object.prototype that exposes it
 * 
 * ---------- How [[Prototype]] is decided ----------
 * {}                  → prototype = Object.prototype
 * Object.create(proto) → prototype = proto
 * new Constructor()    → prototype = Constructor.prototype
 * Object.setPrototypeOf(obj, proto) → changes at runtime (slow, not recommended)
 * Object.create(null)  → prototype = null (object without prototype)
 */


// ========== Example 1: Constructor & Prototype ==========
function Person(name) {
    this.name = name;
}
Person.prototype.say = function () {
    console.log(this.name);
};

const p = new Person("Chandra");

console.log(Object.getPrototypeOf(p) === Person.prototype); // true
console.log(p.__proto__ === Person.prototype);              // true (legacy)
console.log(Person.prototype.constructor === Person);       // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true


// ========== Example 2: Legacy __proto__ ==========
const proto = { hello() { return "hi" } };
const o = {};
o.__proto__ = proto; // sets [[Prototype]]
console.log(o.hello()); // 'hi'


/**
 * ---------- Key Differences ----------
 * [[Prototype]] = hidden internal link on every object
 * obj.__proto__ = legacy accessor to that link
 * Fn.prototype = property on functions, used when creating new objects
 * 
 * ---------- Performance ----------
 * Object.getPrototypeOf(obj) → fast, safe
 * Object.setPrototypeOf / __proto__ → slow, can break optimizations
 * Best practice: create objects with correct prototype from the start
 * 
 * ---------- Common Confusions ----------
 * obj.__proto__ is not same as Fn.prototype (unless object created with new Fn())
 * prototype exists only on functions
 * __proto__ exists on all objects
 * Prototype chain ends when prototype = null
 */


/**
 * ========== 1.2 — Property Lookup Algorithm (Easy English) ==========
 * 
 * When you write: obj.someProperty
 * → The engine does not just "look directly".
 * → It follows a step-by-step algorithm using the [[Prototype]] chain.
 * 
 * ---------- Step-by-step ----------
 * 1. Own properties check:
 *    - Engine first checks if property exists directly on the object.
 *    - If found → return it.
 * 
 * 2. Prototype lookup:
 *    - If not found → engine looks at object’s [[Prototype]] 
 *      (Object.getPrototypeOf(obj) or obj.__proto__).
 * 
 * 3. Repeat:
 *    - On that prototype, same check (own properties first).
 *    - If not found → move to its prototype.
 * 
 * 4. Chain end:
 *    - This continues until prototype = null.
 *    - If nothing is found till the end → returns undefined.
 */


// ========== Example 1: Constructor & Method Lookup ==========
function PersonTwo(name) {
    this.name = name;   // own property
}
PersonTwo.prototype.say = function () {
    console.log(this.name);
};

const pTwo = new PersonTwo("Arun");

// Lookup chain
pTwo.say();
// Step 1: check pTwo (no 'say')
// Step 2: check pTwo.__proto__ (Person.prototype) → found 'say'
// Output: "Chandra"

console.log(pTwo.toString());
// Step 1: check pTwo (no 'toString')
// Step 2: Person.prototype (no 'toString')
// Step 3: Object.prototype → found 'toString'
// Output: "[object Object]"


// ========== Example 2: Own vs Prototype ==========
function A() { this.x = 1; }
A.prototype.y = 2;

const a = new A();
a.y = 3;    // own property shadows prototype’s y

console.log(a.y); // 3 (own property wins)
delete a.y;
console.log(a.y); // 2 (falls back to prototype)


// ========== Example 3: Chain Termination ==========
console.log(Object.getPrototypeOf(Object.prototype));
// → null (lookup ends here)


/**
 * ---------- Key Observations ----------
 * - Lookup is dynamic:
 *   If you add property to prototype later, all existing objects can access it.
 * 
 * - Own property wins (shadows prototype):
 *   If object has its own property with same name, prototype version is ignored.
 * 
 * - If property not found until prototype = null → result = undefined.
 * 
 * ---------- Visual Lookup Path ----------
 * p  (own props: name)
 *  │
 *  └──> Person.prototype (has: say)
 *        │
 *        └──> Object.prototype (has: toString, valueOf, …)
 *              │
 *              └──> null
 */

/**
 * ========== 1.3 — Visual (Simple) ==========
 * 
 * Best way to understand property lookup + prototype chain = diagram.
 * 
 * ---------- Example Setup ----------
 */
function PersonThree(name) {
    this.name = name;        // own property
}
PersonThree.prototype.say = function () {
    console.log(this.name);  // method on prototype
};

const pThree = new PersonThree("Raghaw");


/**
 * ---------- Prototype Chain Diagram ----------
 * 
 * pThree (instance)
 * ├─ own property: name = "Chandra"
 * └─ [[Prototype]] → PersonThree.prototype
 *                      ├─ method: say()
 *                      └─ [[Prototype]] → Object.prototype
 *                                            ├─ toString()
 *                                            ├─ hasOwnProperty()
 *                                            └─ [[Prototype]] → null
 * 
 * ---------- Property Lookup Example ----------
 * 
 * pThree.name       → found in own property
 * pThree.say        → not in own, found in Person.prototype
 * pThree.toString   → not in p, not in Person.prototype, found in Object.prototype
 * pThree.xyz        → not found anywhere → undefined
 */

console.log(pThree.name);       // "Chandra"
pThree.say();                   // "Chandra"
console.log(pThree.toString()); // "[object Object]"
console.log(pThree.xyz);        // undefined

/**
 * ========== 1.4 — prototype (on functions) vs __proto__ (on objects) ==========
 * 
 * ---------- 1. Core Difference ----------
 * 
 * prototype (function property)
 * - A normal property on every function object (by default an object).
 * - Only matters when function is used as constructor with "new".
 * - When "new Fn()" is called → new object’s [[Prototype]] = Fn.prototype.
 * 
 * __proto__ (object accessor)
 * - Every object has this accessor (getter/setter).
 * - It shows the internal [[Prototype]] link of the object.
 * - In short: "which prototype is this object linked to?"
 * 
 * 
 * ---------- 2. Example: Function vs Instance ----------
 */
function Foo() { }

// Function object itself
console.log(Foo.prototype);    // special object, used for new instances
console.log(Foo.__proto__);    // Function.prototype (because functions are also objects)

// Instance created from Foo
const i = new Foo();
console.log(i.__proto__ === Foo.prototype); // true


/**
 * ---------- 3. Prototype Chains in Detail ----------
 * 
 * Function object (Foo)
 * Foo (callable function object)
 * ├─ .prototype  → template for new instances
 * └─ __proto__   → Function.prototype
 * 
 * Instance (i = new Foo())
 * i (instance object)
 * ├─ own properties (from constructor)
 * └─ __proto__   → Foo.prototype
 *                   └─ __proto__ → Object.prototype
 *                                     └─ __proto__ → null
 */


/**
 * ---------- 4. Why Confusion Happens ----------
 * - prototype exists only on functions
 * - __proto__ exists on all objects
 * - BUT functions are also objects!
 *   → So functions have BOTH:
 *     - Foo.prototype
 *     - Foo.__proto__
 * 
 * Example: Foo.prototype is the template for instances
 *          Foo.__proto__ shows function’s own prototype chain
 */


/**
 * ---------- 5. Interview-style Checks ----------
 */
function Bar() { }

const b = new Bar();

console.log(b.__proto__ === Bar.prototype);                 // true
console.log(Bar.__proto__ === Function.prototype);          // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__);                    // null


/**
 * ---------- 6. Mental Model ----------
 * 
 * Fn.prototype → "template object" (blueprint for new objects).
 * obj.__proto__ → "actual internal link" set inside the object.
 */


/**
 * ========== 1.5 — constructor property (deep dive) ==========
 * 
 * ---------- 1. Default Behavior ----------
 * - When you create a function, JavaScript automatically gives its prototype 
 *   object a "constructor" property that points back to that function.
 * 
 * Example:
 */
function Loo() { }
console.log(Loo.prototype.constructor === Loo); // true
// The default prototype chain uses this "constructor" to identify the base function.


/**
 * ---------- 2. What Happens on Replacement ----------
 * - If you replace Loo.prototype with a new object, the default constructor is lost.
 */
function BarTwo() { }
BarTwo.prototype = { say() { } };

console.log(BarTwo.prototype.constructor === BarTwo);    // false
console.log(BarTwo.prototype.constructor === Object); // true

// Why?
// Because { say() {} } is just a plain object → its default constructor = Object.


/**
 * ---------- 3. Fixing the Issue ----------
 * - If you want to keep the correct constructor, set it back manually.
 */
function BazTwo() { }
BazTwo.prototype = {
    constructor: BazTwo,
    say() { }
};

console.log(BazTwo.prototype.constructor === BazTwo); // true


/**
 * ---------- 4. Why It Matters ----------
 * - Reflection / debugging:
 *   Sometimes code checks instance.constructor to know which class/function made it.
 *   If constructor is wrong, it will give misleading results.
 * 
 * - Inheritance chains:
 *   When building inheritance manually (before ES6 classes), 
 *   having the right constructor helps to track the correct function.
 */


/**
 * ---------- 5. Advanced — ES6 Class ----------
 * - With ES6 classes, JavaScript automatically sets the constructor properly.
 */
class Qux {
    say() { }
}
console.log(Qux.prototype.constructor === Qux); // true

// But if you replace Qux.prototype = {} manually, the problem still happens.

/**
 * ========== 1.6 — Object.create(proto) (deep dive) ==========
 * 
 * ---------- 1. What it does ----------
 * - Object.create(proto) makes a new object.
 * - That object’s internal [[Prototype]] is set to the proto you give.
 * - This is the cleanest and most explicit way to create an object with a chosen prototype.
 */


// ---------- 2. Example ----------
let parent = { x: 1 };
let child = Object.create(parent);

console.log(child.x); // 1 (inherited from parent)
console.log(Object.getPrototypeOf(child) === parent); // true

// child does not have x in its own properties,
// but lookup finds it in parent.


/**
 * ---------- 3. Comparison with constructor ----------
 */
function Parent() { }
Parent.prototype.say = function () { console.log("hello"); };

const child1 = new Parent(); // uses constructor
const child2 = Object.create(Parent.prototype); // only sets prototype link

// Difference:
// - new Parent() → runs constructor code, sets instance properties.
// - Object.create(Parent.prototype) → creates an empty object linked to Parent.prototype.


/**
 * ---------- 4. Object.create(null) ----------
 * - Special case: makes a "pure" object with no prototype at all.
 */
let dict = Object.create(null);
console.log(Object.getPrototypeOf(dict)); // null

// No toString, no hasOwnProperty, just a clean object.
// Useful for making safe dictionaries or maps.


/**
 * ---------- 5. Property descriptors with Object.create ----------
 * - You can also directly define properties when creating.
 */
let pro = { greet: () => "hi" };
let obj = Object.create(pro, {
    name: {
        value: "Chandra",
        writable: true,
        enumerable: true
    }
});

console.log(obj.greet()); // "hi" (from prototype)
console.log(obj.name);    // "Chandra" (own property)


/**
 * ---------- 6. Performance / Best Practices ----------
 * - Object.create is optimized by JS engines.
 * - Prefer it instead of changing prototypes later with Object.setPrototypeOf or __proto__,
 *   because those are slower.
 * - Great for making inheritance chains without running constructors.
 */

/**
 * ========== 1.7 — in vs hasOwnProperty vs Object.keys (deep dive) ==========
 * 
 * ---------- 1. in operator ----------
 * Syntax:
 *   'prop' in obj
 * 
 * - Checks if a property exists in the object OR anywhere in its prototype chain.
 * - Does not care if it is own or inherited.
 */
const pr = { z: 3 };
const j = Object.create(pr);
j.a = 1;

console.log('a' in j);        // true (own property)
console.log('z' in j);        // true (inherited from pr)
console.log('toString' in j); // true (inherited from Object.prototype)


/**
 * ---------- 2. hasOwnProperty ----------
 * Syntax:
 * - obj.hasOwnProperty('prop')
 * 
 * - Checks only own properties (ignores prototype Link).
 */
console.log(j.hasOwnProperty('a')); // true
console.log(j.hasOwnProperty('z')); // false

// Important note:
// If object is created with Object.create(null), it has no prototype,
// so .hasOwnProperty will not exist.
let noProto = Object.create(null);
// console.log(noProto.hasOwnProperty); // undefined

// Solution:
console.log(Object.prototype.hasOwnProperty.call(j, 'a')); // true

/**
 * ---------- 3. Object.keys(obj) ----------
 * - Returns an array of own, enumerable property names.
 * - Does not include inherited properties.
 * - Does not include non-enumerable properties.
 */
console.log(Object.keys(j)); // ["a"]
console.log(Object.keys(pr)); // ["z"]


/**
 * ---------- 4. Comparison Table ----------
 * 
 * Method              Checks own?   Checks prototype?   Only enumerable?
 * 'prop' in obj       Yes           Yes                 N/A (boolean result)
 * obj.hasOwnProperty  Yes           No                  N/A (boolean result)
 * Object.keys(obj)    Yes           No                  Yes
 */


/**
 * ---------- 5. Extra: Object.getOwnPropertyNames ----------
 * - Similar to Object.keys but includes non-enumerable properties too.
 */
const o2 = Object.create({}, {
    hidden: { value: 42, enumerable: false }
});
console.log(Object.getOwnPropertyNames(o2)); // ["hidden"]


/**
 * ---------- 6. Interview Trap ----------
 * - for...in loop → iterates over enumerable own + inherited properties.
 * - Usually needs hasOwnProperty filter to skip inherited ones.
 */
for (let key in j) {
    if (j.hasOwnProperty(key)) {
        console.log("own:", key); // "own: a"
    }
}


/**
 * ========== 1.8 — Shadowing (own prop overrides prototype prop) ==========
 * 
 * ---------- 1. What is shadowing? ----------
 * - Shadowing happens when an object defines its own property with the same name as one it would inherit from its prototype chain.
 * - During lookup, the own property always has higher priority than prototype.
 * - The prototype property is not deleted, just "hidden" until the own one is removed.
 */


// ---------- 2. Example ----------
const l = { name: "proto" };
const r = Object.create(proto);

console.log(r.name); // "proto" (from prototype)

r.name = "own";      // define own property with same key
console.log(r.name); // "own" (shadows prototype's property)

delete r.name;       // remove own property
console.log(r.name); // "proto" (falls back to prototype again)


/**
 * ---------- 3. Important Points ----------
 * - Shadowing does NOT delete or change the prototype property.
 *   It only overrides it during lookup.
 * - If the prototype has a method and you add an own method 
 *   with the same name, the prototype’s version becomes inaccessible
 *   until you delete or rename the own property.
 */


// ---------- 4. Example with method ----------
const proto2 = {
    greet() { return "hello from proto"; }
};

const obj1 = Object.create(proto2);

console.log(obj1.greet()); // "hello from proto"

obj1.greet = function () { return "hello from own"; };
console.log(obj1.greet()); // "hello from own" (shadows proto)

delete obj1.greet;
console.log(obj1.greet()); // "hello from proto"


/**
 * ---------- 5. Edge Case — Data vs Accessor ----------
 * - If the prototype has a getter/setter, and you set a data property 
 *   with the same name on the object, it still counts as shadowing.
 */
const proto3 = {
    get value() { return 42; }
};

const obj2 = Object.create(proto3);

console.log(obj2.value); // 42 (getter on prototype)

obj2.value = 100;        // shadowed by data property
console.log(obj2.value); // 100 (own data property)


/**
 * ========== 1.9 — Built-in prototypes & primitive wrappers ==========
 *
 * ---------- 1. Built-in prototype chains ----------
 * - Every built-in object in JS (Array, String, Number, Function, RegExp, etc.)
 *   has its own prototype object where its methods are stored.
 * - Instances inherit from those prototypes.
 */

const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

const str = "abc";
console.log(Object.getPrototypeOf(str)); // String.prototype (via temporary wrapper)

/**
 * ---------- 2. Prototype chain examples ----------
 * Array:
 *   arr → Array.prototype → Object.prototype → null
 *
 * Function:
 *   fn → Function.prototype → Object.prototype → null
 *
 * Plain object:
 *   obj → Object.prototype → null
 */


/**
 * ---------- 3. Primitive wrappers ----------
 * - Primitives (string, number, boolean, symbol, bigint) are not objects.
 * - But when you call a method on them, JS auto-creates
 *   a short-lived wrapper object so that methods can run.
 */

console.log("abc".toUpperCase()); // "ABC"
// Internally:
// let temp = new String("abc");
// temp.toUpperCase();

console.log("abc".__proto__ === String.prototype); // true
console.log((42).__proto__ === Number.prototype);  // true
console.log((true).__proto__ === Boolean.prototype); // true

// These wrapper objects are temporary and garbage-collected right after use.


/**
 * ---------- 4. Special objects ----------
 * - Object.prototype → top-most prototype (almost everything inherits from it).
 *   Its prototype is null.
 *
 * - Function.prototype → itself a function, inherited by all functions.
 *
 * - Array.prototype → contains array methods like push, map, filter, etc.
 */


/**
 * ---------- 5. Built-in prototype modifications ----------
 * - You can add methods to built-in prototypes,
 *   and all instances will immediately see them.
 */
Array.prototype.first = function () {
    return this[0];
};

console.log([10, 20, 30].first()); // 10

/**
 * Warning:
 * Avoid modifying built-in prototypes in production code.
 * It can cause conflicts, bugs, and unexpected behavior.
 */

/**
 * ========== 1.10 — Practical Pitfalls (Common Interview Traps) ==========
 *
 * These are mistakes developers (and even interview candidates) often make while working with prototypes.
 */

/**
 * ---------- 1. "this" inside prototype methods ----------
 *
 * - Methods defined on prototypes are NOT bound to the object forever.
 * - The value of "this" depends on HOW the function is called
 *   (the call-site), not where it was defined.
 */

function PersonFive(name) {
    this.name = name;
}
PersonFive.prototype.say = function () {
    console.log(this.name);
};

const g = new PersonFive("Chandra");

g.say();         // "Chandra" (because called with g as receiver)
const f = g.say;
f();             // undefined in strict mode (or global object in non-strict)

// Key point: Prototype methods are normal functions.
// They are not arrow functions, so "this" is dynamic.
// Fix: If you want lexical "this", use arrow functions OR bind().


/**
 * ---------- 2. Replacing the prototype object ----------
 *
 * - If you reassign Fn.prototype to a completely new object,
 *   you lose the default "constructor" property,
 *   and old instances are still linked to the old prototype.
 */

function koo() { }
const a = new koo();

koo.prototype = { greet() { return "hi"; } };  // new prototype
const d = new koo();

console.log(typeof a.greet);   // undefined (a is linked to old prototype)
console.log(d.greet());        // "hi" (d is linked to new prototype)
console.log(d.constructor);    // Object (constructor lost)

// Fix: Always reset constructor manually when replacing:
koo.prototype.constructor = koo;


/**
 * ---------- 3. Using __proto__ directly ----------
 *
 * - __proto__ is an old, legacy feature.
 * - Modifying it directly is slower and can break engine optimizations.
 * - Even Object.setPrototypeOf(obj, proto) is slow at runtime.
 *
 * Best practice: Create objects with the correct prototype from the start
 * using Object.create().
 */

let proto5 = { greet: () => "hello" };
let obj6 = Object.create(proto5);
console.log(obj6.greet()); // "hello"


/**
 * ---------- 4. for...in pitfalls ----------
 *
 * - A for...in loop iterates over both:
 *   1. Own enumerable properties
 *   2. Inherited enumerable properties from prototype
 */

const base = { z: 3 };
const m = Object.create(base);
m.a = 1;

for (let k in m) {
    console.log(k); // "a", then "z" (includes inherited)
}

// Fix: Use hasOwnProperty to filter only own properties
for (let k in m) {
    if (m.hasOwnProperty(k)) console.log("own:", k); // "a"
}


/**
 * ---------- 5. Accidentally shadowing ----------
 *
 * - If you create an own property with the same name
 *   as a property on the prototype, it hides (shadows) the prototype's property.
 */

const proto4 = { name: "from proto" };
const obj5 = Object.create(proto4);

console.log(obj5.name); // "from proto" (inherited)

obj5.name = "from own"; // shadowing
console.log(obj5.name); // "from own"

delete obj5.name;       // remove shadow
console.log(obj5.name); // "from proto" (prototype visible again)

// Key point: Shadowing does not remove or change the prototype’s property.
// It just hides it until the own property is gone.

