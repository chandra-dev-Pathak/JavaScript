// reduce() Method in JavaScript

// reduce() is used to reduce an array to a single value (number, string, object, etc.)
// It runs a callback on each element and carries an "accumulator"

// arr.reduce((accumulator, currentValue) => { return updatedAccumulator }, initialValue(this value hold accumulator))


// Example 1: Sum of all numbers
let arr = [10, 20, 100, 30];

const total = arr.reduce((acc, curr) => {
    return acc + curr
}, 0);

console.log(total);


// Example 2: Find maximum number
const max = arr.reduce((acc, curr) => (curr > acc ? curr : acc), arr[0]);
console.log("Max:", max); // 5

// Example 3: Count frequency of items in array
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCount = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log("Fruit Count:", fruitCount);
// Output: { apple: 3, banana: 2, orange: 1 }

// Summary:
// - reduce() is very powerful and flexible
// - use it to total, transform, group, or build complex objects
// - it needs an initial value to work safely
// - final result is a single value (not always a number)

// ------------ find() Method ------------

// Returns the FIRST item that matches the condition. Stops after finding one.

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

// ✅ Find user with id = 2
const user = users.find((u) => u.id === 2);
console.log("Found:", user); // { id: 2, name: "Bob" }


// If not found => returns undefined
let arrNum = [10, 22, 45, 75];
const missing = arrNum.find((n) => n > 200);
console.log("Missing:", missing); // undefined


// ------------ sort() Method ------------
//  Sorts array IN PLACE(mutates it) by default in string order

const letters = ["d", "a", "c", "b"];
letters.sort();
console.log("Sorted Letters:", letters);

// Sort numbers (ascending)
const scores = [40, 100, 1, 5, 25];
scores.sort((a, b) => a - b);
console.log("Sorted Asc:", scores); // [1, 5, 25, 40, 100]


// Sort numbers(descending)
scores.sort((a, b) => b - a);
console.log("Sorted Desc:", scores); // [100, 40, 25, 5, 1]

