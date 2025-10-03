// Objects in JavaScript

// Definition:-
// An object in JavaScript is a collection of key-value pairs.
// Keys → also called properties (like name, age)
// Values → can be anything: numbers, strings, arrays, functions, even other objects.
// If a property’s value is a function → we call it a method.

// Creating Objects
// 1. Object Literal (most common way)

const person = {
    name: "Alice",           // property
    age: 25,                 // property
    greet: function () {      // method
        console.log("Hello, I'm " + this.name);
    }
};

console.log(person.name);   // Alice
console.log(person.age);    // 25
person.greet();             // Hello, I'm Alice

// Creating Objects with Using new Object()

const car = new Object();
car.brand = "Toyota";
car.speed = 120;
car.drive = function () {
    console.log("Driving at " + this.speed + " km/h");
};

car.drive();  // Driving at 120 km/h
console.log(car.speed); // 120

// Creating Objects with Using Object.create()

// This creates a new object that inherits from another.

const animal = {
    eats: true,
    walk: function () {
        console.log("Animal walks");
    }
};

const dog = Object.create(animal);
dog.bark = function () {
    console.log("Woof!");
};

dog.walk(); // Animal walks (inherited from animal)
dog.bark(); // Woof!

// Access properties (Two Way)
console.log(person.name);    // dot notation
console.log(person["age"]);  // bracket notation

// Add a property
person.city = "New York";

// Delete a property
delete person.age;
console.log(person.age);

// Check if a property exists
console.log("name" in person); // true
console.log("age" in person); // false

// Methods inside Objects

// Methods are just functions stored in an object. They often use the keyword this to access properties inside the same object.

const calculator = {
    add: function (a, b) {
        return a + b;
    },
    multiply(a, b) { // shorthand method syntax
        return a * b;
    }
};

console.log(calculator.add(2, 3));      // 5
console.log(calculator.multiply(4, 5)); // 20

// An object is a collection of key-value pairs where values can be data or functions. Functions inside objects are called methods. Objects let us group related data and behavior together.