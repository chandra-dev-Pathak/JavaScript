// ---------------------------------------------------

// 👉 Print numbers from 1 to 5 using a for loop.

let num = 5;

for (let i = 1; i <= num; i++) {
    console.log(i);
}


// ---------------------------------------------------

// 👉 Print numbers from 5 to 1 using a while loop.

let i = 5;

while (i > 0) {
    console.log(i);
    i--;
}

// ---------------------------------------------------

// 👉 Print only even numbers between 1 and 10 using a for loop.

for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}

// ---------------------------------------------------

// 👉 Print numbers from 1 to 10, but skip number 5 using continue.

for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        continue;
    }
    console.log(i);
}

// ---------------------------------------------------
// 👉 Print numbers from 1 to 10, but stop the loop when the number is 6 using break.

for (let i = 1; i <= 10; i++) {
    if (i === 6) {
        break;
    }
    console.log(i);
}

// ---------------------------------------------------

// Use a for...of loop to print each fruit in this format:
// Fruit: apple
// Fruit: banana

const fruits = ["apple", "banana", "mango", "grapes"];
for (const fruit of fruits) {
    console.log(`Fruit: ${fruit}`);
}

// ---------------------------------------------------

// Use a for...in loop to print each key-value pair in this format:
// name: Aman
// age: 21
// grade: A

const student = {
    name: "Aman",
    age: 21,
    grade: "A"
};

for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}


// ---------------------------------------------------

// 🔹 Use nested for loops to print each number in this format:
// Row 1: 1 2 3
// Row 2: 4 5 6
// Row 3: 7 8 9

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
    let row = "Row " + (i + 1) + ": ";
    for (let j = 0; j < matrix[i].length; j++) {
        row += matrix[i][j] + " ";
    }
    console.log(row.trim());
}

// ---------------------------------------------------

// 👉 Use map() to create a new array where each number is squared
// 👉 Output should be: [4, 16, 36, 64, 100]

const numbers = [2, 4, 6, 8, 10];

const squared = numbers.map((num) => num * num);

console.log(squared); // [4, 16, 36, 64, 100]

// ---------------------------------------------------

// 👉 Use filter() to create a new array of only even numbers
// 👉 Expected output: [2, 4, 6, 8]

const nums = [1, 2, 3, 4, 5, 6, 7, 8];

let evenArr = nums.filter((num) => num % 2 == 0);
console.log(evenArr);

// ---------------------------------------------------

// Use reduce() to calculate the total sum of this array:

const prices = [100, 200, 300, 400];
let answer = prices.reduce((i, val) => i + val, 0);
console.log(answer);

// ---------------------------------------------------
// 👉 Use sort() to arrange this array in descending order:

const scores = [45, 88, 32, 67, 99];

let sortedScores = scores.sort((a, b) => b - a); // Descending
console.log(sortedScores); // [99, 88, 67, 45, 32]

// ---------------------------------------------------
// Use for...of with Object.entries(user) to print:

// username => Sara  
// email => sara@example.com  
// isAdmin => true  

const user = {
    username: "Sara",
    email: "sara@example.com",
    isAdmin: true
};

let data = Object.entries(user);

for (const [k, v] of data) {
    console.log(`${k} => ${v}`);
}

// ------------------------------------------------------

// Print each user's name and status using forEach()
// Expected Output:
// Ali is online
// Sara is offline
// John is online

const users = [
    { name: "Ali", online: true },
    { name: "Sara", online: false },
    { name: "John", online: true }
];

users.forEach((val) => {
    if (val.online === true) {
        console.log(`${val.name} is Online`);
    } else {
        console.log(`${val.name} is Ofline`);
    }
});
