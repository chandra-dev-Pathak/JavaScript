// The this Keyword in JavaScript

// ## Definition:-

// The this keyword refers to the object that is currently calling the function.

// It’s like saying: “Who is running this code right now?”

// But! In JavaScript, the value of this can change depending on how a function is called, not where it was written.

// ## 1. Inside an Object Method

// this refers to the object itself.

const person = {
    name: "Alice",
    greet: function () {
        console.log("Hi, I'm " + this.name);
        console.log(this); //  Here This context is Person 
    }
};

person.greet();  // Hi, I'm Alice

// ## 2. In a Simple Function (non-strict mode)

// If used inside a normal function (not an object), this refers to the global object (window in browsers, global in Node.js).

function showThis() {
    console.log(this);
}

showThis(); // In browser: Window {...}

// Note:- But in strict mode ("use strict"), this becomes undefined in functions.


// 3. ## With new Keyword (Constructor functions or Classes)

// When you use new, this refers to the newly created object.

function Car(brand) {
    this.brand = brand;
}
const myCar = new Car("Toyota");
console.log(myCar.brand); // Toyota

// ## 6. Classes 

// When you use new, this refers to the newly created object.

class Animal {

    constructor(name, gender) {
        this.name = name
        this.gender = gender
    }

}

let a1 = new Animal("Lion", "male");

console.log(a1);


// ## 5. Arrow Functions

// Arrow functions don’t have their own this.
// They use this from the surrounding scope (lexical this).

const employe = {
    name: "Alice",
    salary: function () {
        const arrow = () => {
            console.log(`${this.name} salary is ${5000}`);
        };
        arrow();
    }
};

employe.salary(); // Alice salary is 5000

// ## 6. Explicit Binding: call, apply, bind

// You can control what this should be by using:
// call() → calls function immediately, passes args separately
// apply() → calls function immediately, passes args in array
// bind() → does not call immediately, returns a new function with bound this

function greet(greeting) {
    console.log(greeting + ", I'm " + this.name);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

greet.call(person1, "Hello");   // Hello, I'm Alice
greet.apply(person2, ["Hi"]);   // Hi, I'm Bob

const boundGreet = greet.bind(person1);
boundGreet("Hey");              // Hey, I'm Alice
