// Print the English marks of the student using dot notation and bracket notation both.

const student = {
    name: "Aman",
    age: 21,
    marks: {
        math: 90,
        english: 85
    }
};

console.log(student.marks.english);
console.log(student["marks"]["english"]);

// ----------------------------------------------------

// Add a new property year with value 2018
// Delete the property author
// Print the final object

const book = {
    title: "Atomic Habits",
    author: "James Clear"
};

book.year = "2018";
delete book.author;
console.log(book);

// ----------------------------------------------------

// Use a for...in loop to print all key–value pairs in this format:
// brand: Toyota, model: Camry, year: 2021

const car = {
    brand: "Toyota",
    model: "Camry",
    year: 2021
};

for (const key in car) {
    console.log(`${key}: ${car[key]}`);

}

// ----------------------------------------------------

// Loop through the array and print each user’s name and age like:
// Ali is 25 years old.

const users = [
    { name: "Ali", age: 25 },
    { name: "Sara", age: 30 },
    { name: "John", age: 28 }
];

for (const val of users) {
    console.log(`${val.name} is ${val.age} years Old `);
}

// ----------------------------------------------------

// Print the second category
// Add a new category "Biography"
// Update total books to 350
// Print the updated library object

const library = {
    name: "City Library",
    books: {
        total: 300,
        categories: ["Fiction", "Science", "History"]
    }
};

console.log(library["books"]["categories"]);
library["books"].biography = { author: "ravindra", publish: 2001 }
library["books"]["total"] = 350;
console.log(library);

// ----------------------------------------------------

// Get an array of all keys
// Get an array of all values
// Loop through keys and print value like: theme => dark

const settings = {
    theme: "dark",
    fontSize: "medium",
    language: "English"
};

console.log(Object.keys(settings));
console.log(Object.values(settings));

for (const val in settings) {
    console.log(`${val} => ${settings[val]}`);
}

// ----------------------------------------------------

// Merge obj1 and obj2 into a new object
// If keys overlap (like b), obj2 should overwrite obj1
// Print the merged object

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

let obj3 = { ...obj1, ...obj2 }
console.log(obj3);

// ----------------------------------------------------

// Use object destructuring to extract name and location
// Print them in a sentence: "Sana lives in Delhi"

const user = {
    name: "Sana",
    age: 27,
    location: "Delhi"
};

let getVal = { name: n, age: a, location: l } = user;
console.log(`${n} lives in ${l}`);

// ----------------------------------------------------

// Convert this into an object
// Result should be: { name: "Ali", age: 23, city: "Delhi" }
// Print the final object
// 💡 Hint: Use Object.fromEntries()

const entries = [["name", "Ali"], ["age", 23], ["city", "Delhi"]];
let obj = Object.fromEntries(entries);
console.log(obj);

// ----------------------------------------------------

// Freeze the object
// Try changing the mode to "light"
// Print the object and show that the change didn’t happen
// 💡 Hint: Use Object.freeze()

const config = {
    mode: "dark",
    version: "1.0"
};

Object.freeze(config);
config.mode = "light";
console.log(config);
