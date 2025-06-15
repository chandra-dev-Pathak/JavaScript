// ✅ Array Initialization Examples

let emptyArr = []; // Empty array
let fruits = ["apple", "banana", "mango"]; // Array of strings
let numbers = [10, 20, 30]; // Array of numbers
let mixed = ["text", 10, true, null]; // Array with mixed data types

// Accessing array elements
console.log(fruits[0]); // Output: "apple" - accessing first element
console.log(fruits.length); // Output: 3 - total number of items in fruits

// ✅ Modifying Elements in Array
fruits[1] = "grapes"; // Replacing "banana" with "grapes"
console.log(fruits); // Output: [ 'apple', 'grapes', 'mango' ]

// ✅ Adding Elements
fruits.push("kiwi"); // Adds "kiwi" to the end of the array
fruits.unshift("berry"); // Adds "berry" to the beginning of the array
console.log(fruits); // Output: [ 'berry', 'apple', 'grapes', 'mango', 'kiwi' ]

// ✅ Removing Elements
fruits.pop(); // Removes last element ("kiwi")
fruits.shift(); // Removes first element ("berry")
console.log(fruits); // Output: [ 'apple', 'grapes', 'mango' ]

// ✅ Spread Operator – used to copy or merge arrays
const newFruits = [...fruits, "orange"]; // Copies all fruits and adds "orange"
console.log("Spread Result:", newFruits);

// ✅ Spread Operator – merging multiple arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const merged = [...arr1, ...arr2, ...arr3]; // Merging arr1, arr2, arr3
console.log(merged); // Output: [1, 2, 3, 4, 5, 6]

// ✅ concat() – merges two arrays (non-destructive)
const veg = ["carrot", "peas"];
const allItems = fruits.concat(veg); // Returns a new array, doesn't change original
console.log("Concat Result:", allItems);

// ✅ join() – combines array items into string
const tags = ["js", "html", "css"];
console.log(tags.join()); // Default separator is comma → "js,html,css"
console.log(tags.join(" | ")); // Custom separator → "js | html | css"

// ✅ slice() – returns selected portion of an array (non-destructive)
const colors = ["red", "green", "blue", "yellow"];
const sliced = colors.slice(1, 3); // Extracts "green" and "blue" (index 1 to 2)
console.log("Original:", colors); // Original array remains unchanged
console.log("Sliced:", sliced); // Output: [ 'green', 'blue' ]

// ✅ splice() – modifies original array by adding/removing elements
const removed = colors.splice(1, 2); // Removes 2 items starting at index 1
console.log("After Splice:", colors); // Output: [ 'red', 'yellow' ]
console.log("Removed:", removed); // Output: [ 'green', 'blue' ]

// ✅ Array Destructuring – unpacking values from array
const student = ["Raghaw", 21, "Delhi"];
const [name, age, city] = student; // Extracts values into individual variables
console.log(name, age, city); // Output: Raghaw 21 Delhi

// ✅ Checking if value is an array
console.log(Array.isArray(fruits)); // true - because fruits is an array
console.log(Array.isArray("test")); // false - because string is not an array

// ✅ Array.from() – converts iterable (like string) to array
let str = "Hello";
let arrStr = Array.from(str); // Converts string to array of characters
console.log(arrStr); // Output: ['H', 'e', 'l', 'l', 'o']
