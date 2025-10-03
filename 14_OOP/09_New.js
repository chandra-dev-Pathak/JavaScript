// Constructor Functions & new keyword in JavaScript

/*
 What is a Constructor Function?
--------------------------------
A constructor function is just a normal JavaScript function
that is used to create multiple similar objects.

By convention, constructor function names start with a CAPITAL letter (e.g., Car, Person).
We use the `new` keyword when calling them.

Why use them?
- Avoids repeating object creation code.
- Allows creation of multiple instances with the same structure.
- Prepares us for prototypes and classes.
*/


//------------------------------------------
// Example 1: Without constructor function
//------------------------------------------
const person1 = {
    name: "Alice",
    age: 25,
    greet: function () {
        console.log("Hi, I'm " + this.name + " and I'm " + this.age + " years old.");
    }
};

const person2 = {
    name: "Bob",
    age: 30,
    greet: function () {
        console.log("Hi, I'm " + this.name + " and I'm " + this.age + " years old.");
    }
};

// Problem → Too much repetition
person1.greet(); // Hi, I'm Alice and I'm 25 years old.
person2.greet(); // Hi, I'm Bob and I'm 30 years old.


//------------------------------------------
// Example 2: With Constructor Function
//------------------------------------------
function Person(name, age) {
    // "this" will point to the newly created object
    this.name = name;
    this.age = age;
    this.greet = function () {
        console.log("Hi, I'm " + this.name + " and I'm " + this.age + " years old.");
    };
}

// Creating objects using `new`
const personA = new Person("Alice", 25);
const personB = new Person("Bob", 30);

// Method calls
personA.greet(); // Hi, I'm Alice and I'm 25 years old.
personB.greet(); // Hi, I'm Bob and I'm 30 years old.


//------------------------------------------
// How `new` works internally (Step by Step)
//------------------------------------------
/*
When we call `new Person("Alice", 25)` →

1. Creates a new empty object: {}
2. Sets the new object's prototype → Person.prototype
3. Binds `this` to the new object
4. Returns the new object (unless the function explicitly returns another object)
*/


//------------------------------------------
// Example 3: Adding Methods to Prototype
//------------------------------------------
function Animal(type, sound) {
    this.type = type;
    this.sound = sound;
}

// Better way → Add method to prototype (shared across all objects)
Animal.prototype.makeSound = function () {
    console.log(this.type + " says: " + this.sound);
};

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");

// Both share the same `makeSound` function (efficient)
dog.makeSound(); // Dog says: Woof
cat.makeSound(); // Cat says: Meow


//------------------------------------------
// Short Interview Answers
//------------------------------------------
/*
Q: What is a constructor function in JavaScript?
A: It's a function used to create multiple objects with the same properties and methods.
   When called with `new`, it binds `this` to the new object and returns it.

Q: What does `new` do?
A: - Creates a new object
   - Sets up the prototype chain
   - Binds `this` to the new object
   - Returns the object
*/
