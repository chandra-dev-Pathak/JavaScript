// **Scope in Java-Script:-
// In JavaScript, scope defines the visibility and accessibility of variables, functions, and objects in different parts of your code. It essentially determines where these elements can be used and referenced.

// **Type Of Scope in JS
// There are 4 main types of scope in JavaScript:-

// 1. Global Scope
// 2. Function Scope(Local Scope)
// 3. Block Scope
// 4. Module Scope



// **Global scope: -

// A variable has global scope if it is declared outside any function, block ({}), or class — so it can be accessed from anywhere in your JavaScript code.

// Lifetime:- 
// Created when the program or script starts.
// Destroyed when the program ends.
// Lives for the entire runtime.

// ---------------------------------------------------------------------------------

var a = 10;
let b = 20;
const c = 30;

console.log(a, b, c); // Accessible globally

// In Node.js Case:- 

global.a = 10;
console.log(global.a); // var is attached to global object, but let and const are not.


// In Browser case:- 

// console.log(window.a);  10 (var only)
// console.log(window.b);  undefined
// console.log(window.c);  undefined

// ---------------------------------------------------------------------------------

// Global Functions:-

function greet() {
    console.log("Jai Shree Ram");
}

greet(); // Accessible anywhere

// ---------------------------------------------------------------------------------

// Accidentally Creating Globals(BAD PRACTICE)

function run() {
    x = 100; // No var/let/const — becomes GLOBAL!
}

run();
console.log(x); // 100

// ---------------------------------------------------------------------------------

// **Modules and Global Scope:-

// If you use ES modules (type="module" in <script> or .mjs in Node.js):-
// Top-level variables do not become globals — they’re scoped to the module.

// file1.js
// export let value = 42;

// file2.js
// import { value } from './file1.js';
// console.log(value); // 42
// Modules protect against accidental global pollution.

// ---------------------------------------------------------------------------------

// Shadowing Globals:-

// A local variable with the same name hides the global:-

let name = "Global";
function test() {
    let name = "Local";
    console.log(name);
}
test(); // Local

// --------------------------------------------------------------------------------

// Pitfalls of JavaScript Globals:-

// Name collisions in big projects.
// Hard to debug when multiple functions change the same global.
// Security risks — anyone can overwrite public globals.
// Memory leaks — globals stay in memory until the page is closed.

// --------------------------------------------------------------------------------

// Global Lexical Environment:-

// Under the hood:-

// JavaScript engines keep two structures for globals:
// 1. Object Environment Record → wraps the global object(window or globalThis).
// 2 .Declarative Environment Record → for let and const globals.
// When resolving variables, the engine checks Declarative first, then Object record.