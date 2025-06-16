// Using constructor to create objects way one

const user = new Object({
    name: "raghaw"
});

console.log(user.name);

// Using constructor to create objects way two

// Using constructor to create objects
const car = new Object();
car.brand = "Toyota";
car.model = "Corolla";
car.year = 2020;
console.log(car);

// Object.keys() - returns array of keys
console.log(Object.keys(car));

// Object.values() - returns array of values
console.log(Object.values(car));

// Object.entries() - returns key-value pairs as array
console.log(Object.entries(car));

// Looping through object
for (let key in car) {
    console.log(`${key} => ${car[key]}`);
}

// Short-hand property assignment
let a = 1, b = 2;
const numbers = { a, b }; // Same as { a: a, b: b }
console.log(numbers);

// Object.seal() - prevents adding/removing properties
let sealed = {
    name: "amit",
    age: 23,
    isMen: true
}
console.log(sealed);
Object.seal(sealed)
sealed.name = "INNU" // can Be modify  
sealed.num = 11; // but Can't add new
console.log(sealed);