// ✅ Question 1:
// Create an array named colors that contains the values: "red", "green", "blue"
// Then, add "yellow" at the end using push() and print the updated array.

// Answer:-
// let color = new Array("red", "green", "blue");
// color.push("yellow")
// console.log(color);


// ✅ Question 2:
// let fruits = ["apple", "banana", "mango"];
// Replace "banana" with "grapes" and print the updated array.

// Answer:-
// let fruits = ["apple", "banana", "mango"];
// fruits[1] = "grapes";
// console.log(fruits);

// ✅ Question 3:
// You have this array: => let numbers = [10, 20, 30];
// Add 5 at the beginning and 40 at the end of the array. Then print it.

// Answer:-
// let numbers = [10, 20, 30];
// numbers.unshift(5);
// numbers.push(40);
// console.log(numbers);

// ✅ Question 4:
// You have: let cities = ["Delhi", "Mumbai", "Pune", "Chennai"];
// Use slice() to create a new array that contains only "Mumbai" and "Pune", and print it.

// Answer:-
// let cities = ["Delhi", "Mumbai", "Pune", "Chennai"];
// updatedArray = cities.slice(1, 3);
// console.log(updatedArray);

// ✅ Question 5:
// let colors = ["red", "green", "blue", "yellow"];
// Use splice() to remove "green" and "blue" from the array, and then print the updated array.


// Answer:-
// let colors = ["red", "green", "blue", "yellow"];
// remove = colors.splice(1, 2)
// console.log(colors);


// ✅ Question 6:

// let languages = ["JavaScript", "Python", "C++"];
// Use the spread operator to create a new array and add "Java" and "Rust" to the end. Then print it.

// Answer:-
// let languages = ["JavaScript", "Python", "C++"];

// let newArray = [...languages, "Java", "Rust"];
// console.log(newArray);


// ✅ Question 7:

// let scores = [15, 22, 35, 40, 50];
// Use find() to get the first score greater than 30. Then print it.


// Answer:-
// let scores = [15, 22, 35, 40, 50];
// greaterTo30 = scores.find((num) => num > 30)
// console.log(greaterTo30);

// ✅ Question 8:

// let letters = ["d", "a", "c", "b"];
// 👉 Sort the array in alphabetical order and then print the result.

// Answer:-
// let letters = ["d", "a", "c", "b"];
// let sorted = letters.sort()

// console.log(sorted);

// ✅ Question 9:
// let mix = [100, 200, 300, 400, 500];
// Use copyWithin() to copy the last two elements to the beginning of the array.
// Print the updated array.

// Ans:-
let mix = [100, 200, 300, 400, 500];
mix.copyWithin(0, 3);
console.log(mix); // Output: [400, 500, 300, 400, 500]


// ✅ Question 10:

// Ans:-
// // You have this array:
// let items = ["pen", "pencil", "eraser", "sharpener"];
// // Task: Convert this array into a single string separated by " | " and print the result.

let items = ["pen", "pencil", "eraser", "sharpener"];

let newArray = items.join(" | ");
console.log(newArray);