/*
-----------------------------------
 1. GLOBAL SCOPE in JavaScript
-----------------------------------

Meaning:
- A variable or function is said to be in global scope if it is declared outside of any function, block ({}), or module.
- It can be accessed from anywhere in the program.

In Browser:
- Variables declared with var in global scope attach to the window object.
- Variables declared with let or const in global scope do not attach to window.

In Node.js:
- There is no window object. Instead, there is a global object.
- Global variables declared with var, let, or const are not automatically attached to global.

-----------------------------------
 2. Declaring Global Variables
-----------------------------------

Example:
*/

var globalVar = "I am a global variable (var)";
let globalLet = "I am a global variable (let)";
const globalConst = "I am a global variable (const)";

console.log(globalVar);   // Accessible anywhere
console.log(globalLet);   // Accessible anywhere
console.log(globalConst); // Accessible anywhere

/*
-----------------------------------
 3. Global Functions
-----------------------------------
- Functions declared outside any block or function are also global.
- They can be accessed and called from anywhere in the program.
*/

function greet() {
    console.log("Hello from global function!");
}

function testScope() {
    greet(); // Accessible because greet() is global
}

testScope(); // Calling global function

/*
-----------------------------------
 4. Global Scope and Window Object (Browser Only)
-----------------------------------
- In browsers, var-declared globals are attached to the window object.
- let and const globals are not attached to window.
*/

// Run this in browser console 

// var a = "I am var";
// let b = "I am let";
// const c = "I am const";

// console.log(window.a); // "I am var"
// console.log(window.b); // undefined
// console.log(window.c); // undefined

/*
-----------------------------------
 5. Global Scope in Node.js
-----------------------------------
- There is no window object in Node.js.
- Instead, Node.js has a global object.
- However, global variables declared with var, let, or const are not automatically attached to global.
*/

/*
-----------------------------------
 6. Global Pollution Problem
-----------------------------------
- If too many variables are created in the global scope, they may overwrite each other.
- This leads to bugs and is called global pollution.
*/

var name = "Shyam";
var name = "Ram"; // Overwrites the previous variable

console.log(name); // Output: Ram

// Another example of conflict:

var user = "Tom";
var user = "Jerry"; // Overwrites Tom

console.log(user); // Output: Jerry

/*
-----------------------------------
 7. Good Practices
-----------------------------------
- Avoid creating too many global variables.
- Keep global scope as small as possible.
- Use function scope or block scope with let/const.
- For large applications, use modules to avoid polluting global scope.
*/
