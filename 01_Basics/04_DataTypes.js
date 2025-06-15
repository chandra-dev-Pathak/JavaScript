// 🧠 JavaScript Data Types Examples

// ----- Primitive Data Types ----- //

// String - represents text
let fullName = "Ali Khan";

// Number - integers and floating-point
let age = 25;
let pi = 3.14159;

// Boolean - true or false
let isStudent = true;

// Undefined - variable declared but not assigned
let unassignedVar;
console.log("Unassigned variable:", unassignedVar); // undefined

// Null - intentionally no value
let emptyValue = null;

// BigInt - large integers
let bigNumber = 12345678901234567890n;

// Symbol - unique identifier
let id = Symbol("userId");

// ----- Non-Primitive (Reference) Types ----- //

// Object - key-value pairs
let person = {
    name: "Ali",
    age: 25,
    isStudent: true
};

// Array - ordered list of values
let colors = ["red", "green", "blue"];

// Function - block of reusable code
function greet() {
    console.log("Hello from function!");
}

// Output for checking types
console.log("Type of fullName:", typeof fullName); // string
console.log("Type of age:", typeof age); // number
console.log("Type of isStudent:", typeof isStudent); // boolean
console.log("Type of bigNumber:", typeof bigNumber); // bigint
console.log("Type of id:", typeof id); // symbol
console.log("Type of person:", typeof person); // object
console.log("Type of greet:", typeof greet); // function