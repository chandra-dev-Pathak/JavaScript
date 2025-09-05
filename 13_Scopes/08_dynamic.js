/*
-----------------------------------
8. DYNAMIC SCOPE (Conceptual, via "this")
-----------------------------------

Meaning:
- JavaScript does NOT truly have dynamic scope.
- But the keyword `this` behaves *like* dynamic scope
  because its value depends on HOW a function is called,
  not where it is written.

Reminder:
- Lexical scope = decided at write time.
- `this` = decided at call time.

Example 1: Global/Function Context
*/

function showThis() {
    console.log(this);
}

showThis();
// In browser: Window object (global object)
// In strict mode: undefined


/*
Example 2: this inside objects
*/

const user = {
    name: "Alice",
    greet: function () {
        console.log("Hello, I am " + this.name);
    }
};

user.greet(); // "Hello, I am Alice"

const greetFn = user.greet;
greetFn();
// "this" lost context
// In browser: Window.name (often empty string)


/*
Example 3: this inside constructors
*/

function Person(name) {
    this.name = name;
}

const p1 = new Person("Bob");
console.log(p1.name); // "Bob"


/*
Example 4: Arrow Functions and this
- Arrow functions do NOT have their own `this`.
- They capture `this` from the surrounding lexical scope.
*/

const obj = {
    value: 10,
    regular: function () {
        console.log("regular this:", this.value);
    },
    arrow: () => {
        console.log("arrow this:", this.value);
    }
};

obj.regular(); // 10
obj.arrow();   // undefined (arrow takes `this` from outside obj)


/*
Why we call it "dynamic scope" (conceptually):
- Normal variables follow lexical scope (decided by code location).
- `this` changes depending on the call site.
- That makes it feel dynamic.

Good Practice:
- Use arrow functions for callbacks if you want to preserve `this`.
- Be careful when passing methods around (they may lose `this`).
- Use .bind(), .call(), or .apply() to control `this` explicitly.
*/
