// Use Function access property of Object data --------------------->>>>>>

let person = {
    name: "ragahw",
    age: 24
}

function handelObj(val) {
    console.log(`Name of User is ${val.name} and Age is ${val.age} `);

}

// Way one -->
// handelObj(person) // Call fucntion with ObjectName

// Way Two -->
handelObj({
    name: "chandra dev pathak",
    age: 22
}); // Also pass Value As a Object property

// Use Function to Access Values of Array  --------------------->>>>>>

let array = ["Amit", "Arun", "Akash", 10, 20, 30];

function getArray(arrayValue = [100, 200]) {
    return arrayValue;
}
// console.log(getArray(array)); // Pass Array as a Argument
console.log(getArray(["Kinnu", "Karan", 300]));

// Function Expression--------------------->>>>>>
// Javascript Variable Have Ability to Store fucntion 
// normal fucntion done Work If Call before Initilize function but expression dont work before initilize call the expression fucntion

const add = function (a, b) {
    return a + b;
};
console.log(add(5, 3));

// fucntion In Object and how its work With This keyword --------------------->>>>>>

let student = {
    name: "Deepti Sharma",
    age: 24,
    marks: 50,
    showResult: function (val) {
        if (this.marks >= 50) {
            console.log(`* Passed * Name of Student id ${this.name} and Marks of Student is ${this.marks}`);
        } else {
            console.log(`Failed Student`);
        }
    }
}

student.showResult() // object fucntion property calling

// Way one Arrow Function --------------------->>>>>>

const multiply = (a, b) => {
    return a * b
};
console.log(multiply(4, 3));

// Way Two Arrow Function
const sum = (a, b) => a + b; // auto return when No curlybrese
console.log(sum(4, 3));

// Way Three  Arrow Function
const subtract = (a, b) => (a - b); // auto return when No curlybrese but use parenthese if needed
console.log(subtract(4, 3));

// Way for handel object by Arrow Fucntion 

let objValue = (name) => ({ name: 'raghaw' });

console.log(objValue());

// Recursion function  --------------------->>>>>>
// Function Call it self unit Condition match
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Function as Object Property (Method) --------------------->>>>>>
const calculator = {
    add(x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    },
    multiply: (x, y) => x * y
};
console.log(calculator.add(2, 3));
console.log(calculator.subtract(8, 5));
console.log(calculator.multiply(3, 4));

// FUNCTION HOISTING EXPLAINED --------------------->>>>>>

// Example 1: Function Declaration is hoisted
// You can call it even before it is defined
console.log(declaredBeforeDefinition(3)); // Output: 6

function declaredBeforeDefinition(x) {
    return x * 2;
}

// Function declarations are hoisted to the top of their scope.
// This means the function is available before its actual declaration in code.


// Example 2: Function Expression is NOT hoisted
// console.log(exprBeforeDefinition(3)); // ❌ This would throw an error

const exprBeforeDefinition = function (x) {
    return x * 2;
};

console.log(exprBeforeDefinition(3)); // Works fine if called after definition

// Explanation:
// Function expressions (including arrow functions) are assigned to variables.
// Only the variable is hoisted (with value undefined), not the function body.
// So calling it before assignment throws: "TypeError: exprBeforeDefinition is not a function"


// Example 3: Arrow Function also NOT hoisted
// console.log(arrowFunc(3)); // Error if called before

const arrowFunc = (x) => x * 2;

console.log(arrowFunc(3)); // Works after definition

// Summary:
/*
1. ✅ Function Declaration — Fully hoisted (usable before definition)
2. ❌ Function Expression — Not hoisted (variable hoisted, body not)
3. ❌ Arrow Function — Same as expression, not hoisted
*/

// IIFE - Immediately Invoked Function Expression -------------------->>>>>
// It is a function that runs immediately after it is defined..

// why IIFE =-->
// To create a private scope
// To avoid polluting the global scope
// Useful for initialization code that only runs once

(function () {
    console.log("This function runs immediately!");
})(); // IF not semicolne after this IIFE calling so next line were not Excuted 
// must use semicolne

// You wrap the function in parentheses() to treat it as an expression, and then invoke it right away with ().

// IIFE with parameters
(function (username) {
    console.log(`Welcome, ${username}`);
})("Raghaw");

// Arrow IIFE
(() => {
    console.log("Arrow IIFE executed");
})();

// IIFE that returns a value
const result = (function () {
    let x = 10;
    let y = 20;
    return x + y;
})();
console.log("IIFE result:", result);

// Named IFFE 
(function myFunc() {
    console.log("Named IIFE");
})();

// ❌ Cannot call myFunc() again outside — it’s not accessible globally