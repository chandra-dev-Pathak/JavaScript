// Example 1: Basic map - double numbers
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log("Doubled:", doubled); // [2, 4, 6]

// Example 2: Convert to strings
const numStrings = numbers.map((num) => `Number is ${num}`);
console.log(numStrings);

// Example 3: Extract property from array of objects
const users = [
    { name: "Alice", age: 22 },
    { name: "Bob", age: 30 },
];
const names = users.map((user) => user.name);
console.log("Names:", names); // ["Alice", "Bob"]

// Example 4: Add a new property to each object (returns new array)
const updatedUsers = users.map((user) => {
    return { ...user, isActive: true };
});
console.log(updatedUsers);

// map() returns a NEW array. Original array is NOT changed. return also unique value

// Example 1: Filter even numbers
const even = numbers.filter((n) => n % 2 === 0);
console.log("Even:", even); // [2]

// Example 2: Filter age > 25
const older = users.filter((user) => user.age > 25);
console.log("Older than 25:", older);

// Example 3: Filter out empty strings
const words = ["hello", "", "world", " ", "code"];
const nonEmpty = words.filter((w) => w.trim() !== "");
console.log(nonEmpty); // ["hello", "world", "code"]

// Example 4: Filter by boolean field
const activeUsers = updatedUsers.filter((u) => u.isActive);
console.log("Active:", activeUsers);

// filter() creates a new array with items that pass the condition

// Example 2: Chain on numbers to double only even numbers
const doubledEvens = numbers
    .filter((n) => n % 2 === 0)
    .map((n) => n * 2);
console.log("Doubled Evens:", doubledEvens); // [4]

// Example 3: Complex chain
const students = [
    { name: "Sara", score: 85 },
    { name: "Mike", score: 45 },
    { name: "Tom", score: 70 },
];
const passedNames = students
    .filter((s) => s.score >= 60)
    .map((s) => s.name);
console.log("Passed:", passedNames); // ["Sara", "Tom"]

// map/filter chaining = clean, readable transformation


//  map() = transform
//  filter() = conditionally keep
//  Both return NEW arrays (non-mutating)