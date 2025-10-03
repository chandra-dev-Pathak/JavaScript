// JavaScript call, apply, bind

// ## What are they ?
// In JavaScript, every function has special helper methods:

// call()
// apply()
// bind()

// These help us decide what this will point to when the function runs.

// ## Why do we need them?

// Normally, this depends on how you call a function.
// But sometimes, we want to use a function with a different object.
// That’s why we use call, apply, and bind.

// ## How they work?

// 1. call()

// Runs the function immediately.
// Arguments are passed one by one(comma separated).

let person1 = {
    name: "Ali", age: 22
};
let person2 = { name: "Ahmed", age: 25 };

function introduce(greeting, city) {
    console.log(`${greeting}, I am ${this.name}, ${this.age} years old from ${city}`);
}

introduce(person1, "Hello", "Lahore");
// Hello, I am Ali, 22 years old from Lahore

introduce.call(person2, "Hi", "Karachi");
// Hi, I am Ahmed, 25 years old from Karachi

// 2. apply()

// Works the same as call.
// Difference: Arguments are passed in an array.

introduce.apply(person1, ["Hello", "Islamabad"]);
// Hello, I am Ali, 22 years old from Islamabad

introduce.apply(person2, ["Hi", "Multan"]);
// Hi, I am Ahmed, 25 years old from Multan

// 3. bind()

// Does NOT run the function immediately.
// Instead, it returns a new function with this fixed(permanently set).

let newIntro = introduce.bind(person1, "Hello", "Peshawar");

newIntro();
// Hello, I am Ali, 22 years old from Peshawar
