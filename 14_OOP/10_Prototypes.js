// Prototypes in JavaScript

/*
Definition:
-----------
Every JavaScript object has a hidden property called [[Prototype]] 
(accessible by __proto__ in older syntax).
This is basically a link to another object — its prototype.

If JavaScript can’t find a property/method on an object, 
it automatically looks up the chain (its prototype, then prototype’s prototype, etc.).
This lookup system is called the prototype chain.
*/


//---------------------------------------------------
// Example 1: Without prototype
//---------------------------------------------------
function Person(name) {
    this.name = name;
    this.sayHello = function () {
        console.log("Hello, I'm " + this.name);
    };
}

const p1 = new Person("Alice");
const p2 = new Person("Bob");

p1.sayHello(); // Hello, I'm Alice
p2.sayHello(); // Hello, I'm Bob

// Problem: Every new object (p1, p2) has its own copy of sayHello. That wastes memory.


//---------------------------------------------------
// Example 2: With prototype
//---------------------------------------------------
function PersonProto(name) {
    this.name = name;
}

// put method on prototype
PersonProto.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name);
};

const personA = new PersonProto("Alice");
const personB = new PersonProto("Bob");

personA.sayHello(); // Hello, I'm Alice
personB.sayHello(); // Hello, I'm Bob

console.log(personA.sayHello === personB.sayHello); // true (shared method)


//---------------------------------------------------
// Prototype Chain
//---------------------------------------------------
console.log(personA.__proto__ === PersonProto.prototype); // true
console.log(PersonProto.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)

/*
Prototype chain looks like this:

personA → PersonProto.prototype → Object.prototype → null
*/


//---------------------------------------------------
// Example 3: Inheritance with Prototypes
//---------------------------------------------------
function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function () {
    console.log(this.name + " is eating");
};

function Dog(name, breed) {
    Animal.call(this, name); // call parent constructor
    this.breed = breed;
}

// Inherit prototype methods
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
    console.log(this.name + " barks: Woof!");
};

const dog1 = new Dog("Buddy", "Labrador");
dog1.eat();  // Buddy is eating (inherited from Animal)
dog1.bark(); // Buddy barks: Woof!


//---------------------------------------------------
// Interview Summary
//---------------------------------------------------
/*
Prototype:
Every JavaScript object has a hidden link to another object (its prototype).

Prototype chain:
If a property isn’t found on an object, JS looks up its prototype chain until null.

Why use prototypes?
To share methods across instances efficiently, instead of duplicating them.

Inheritance:
Achieved by linking one constructor’s prototype to another’s using Object.create.
*/
