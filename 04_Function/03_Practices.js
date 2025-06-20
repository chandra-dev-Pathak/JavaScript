// Create a function named greetUser that takes a name as a parameter and prints:
// Hello, [name]! Welcome.

function greetUser(name) {
    console.log(`Hello, ${name}! Welcome.`);

}

greetUser("Aman"); // Output: Hello, Aman! Welcome.

// -------------------------------------------------------

// Create a function called addNumbers that takes two numbers and returns their sum.

function addNumbers(num1, num2) { return num1 + num2 };

let result = addNumbers(5, 7);
console.log(result); // Output: 12

// -------------------------------------------------------

// Create an arrow function named square that takes a number and returns its square. 

let square = (num) => num * num
console.log(square(5));

// -------------------------------------------------------

// Create an IIFE(a function that runs immediately after it’s defined) that logs:

(() => console.log(`This function runs automatically!`)
)();

// -------------------------------------------------------

// Create a function greetUser that takes a name and greets them.
// If no name is given, it should greet "Guest".

let greet_User = (name = "Guest") => (console.log(`Hello, ${name}`));
greet_User("Ragahw");
greet_User();

// -------------------------------------------------------

// Create a function called double that takes a number and:
// Returns double the number
// Store that value in a variable and print it using console.log

function double(num) {
    return num + num;
}

let res = double(8);
console.log(res); // Output: 16

// -------------------------------------------------------

// Create a function called processUser that:
// Takes a name and a callback function
// First prints Processing user...
// Then calls the callback and passes the name to it
// Also create a separate sayHello function that simply says:

function sayHello(name) {
    console.log(`Hello, ${name}`);
}

function processUser(name, fun) {
    console.log(`Processing user...`);
    fun(name);
}

processUser("Innu", sayHello);

// -------------------------------------------------------

// Create an object person with:
// name property
// A method introduce() that prints:
// "Hi, my name is [name]."

const person = {
    name: "Raghaw",
    introduce: function () {
        console.log(`Hi, my name is ${this.name}.`);
    }
}

person.introduce();

// -------------------------------------------------------

// Create a function sumAll that:
// Accepts any number of numbers
// Returns their total using the rest parameter ...nums

function sumAll(...num) {
    let all = num.reduce((acc, curr) => (acc + curr), 0);
    return all;
}

console.log(sumAll(25, 25, 15, 45));

// -------------------------------------------------------

function greet(message) {
    return function (name) {
        console.log(`${message}, ${name}`);
    }
}

let sayHi = greet("hello");
sayHi("Ragahw");

// --------------------------------------------------------


function makeMultiplier(x) {
    return function (y) {
        return x * y
    }
}

const doub = makeMultiplier(2);
console.log(doub(5)); // Output: 10

const trip = makeMultiplier(3);
console.log(trip(5)); // Output: 15
