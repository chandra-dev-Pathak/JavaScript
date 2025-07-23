// Notes async and await in JavaScript:

// 1. Problem with using Promises alone:
//    - While Promises work for handling asynchronous code, the syntax can become messy,
//      especially when using if/else conditions, loops, or error handling with try/catch.

// 2. The 'async' keyword:
//    - When you add 'async' before a function, it automatically returns a Promise.
//    - Even if you return a normal (non-Promise) value, JavaScript wraps it in a resolved Promise.


// 3. The 'await' keyword:
//    - 'await' can only be used inside an 'async' function.
//    - It pauses the execution of that async function until the Promise is resolved or rejected.
//    - It helps write asynchronous code in a way that looks and behaves more like synchronous code.


// 4. Rules and Clarifications:
//    - You must only use 'await' with Promises. If used on a non-Promise value, it will still work but immediately return the value.
//    - 'await' is not like sleep or delay. It does not block the entire application or JavaScript engine.
//    - It only pauses the execution of the current async function until the awaited Promise is settled.

// 5. Best Practices:
//    - Always use try/catch blocks to handle errors inside async functions.
//    - Avoid deeply nested .then() chains — use async/await for cleaner and more readable code.
//    - Use 'Promise.all()' when you want to run multiple Promises in parallel with async/await.

// ---------------------------------------------------------------------------------

// Basic Async Example:---

async function sayHello(name) {
    return `Hello ${name}`;
};

// Also without using .then() because now it is Promise Not a Function
sayHello("Raghaw").then(console.log)
// console.log(sayHello("Raghaw")); // Promise { 'Hello Raghaw' }


// ---------------------------------------------------------------------------------

// Basic Await (Async-Await) Example:---

const data = () => {
    let userLogin = true;
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (userLogin) {
                res("Data loaded Successfully");
            } else {
                rej("Data loaded Failed");
            }
        }, 2000);
    })
}

let loadData = async () => {
    let result = await data();
    console.log(result);
}

loadData();
// Await does not handle the rejected value directly, but throws an error. It is necessary to apply try/catch to handle error.

// loadData() is async → it can use await
// await data() pauses until the Promise resolves
// Code is clean, readable, and no.then chains

// -----------------------------------------------------------------------------

// Async/Await with Error Handling (try/catch):---

function greeting(name) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (name.length <= 6) {
                res(`Welcome in JS ${name}`)
            } else {
                rej(`Please give name under 6 letters: ${name}`)
            }
        }, 4000);
    })
}

let getOutput = async (name) => {
    try {
        let output = await greeting(name);
        console.log(output);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

getOutput("Raghaw");
getOutput("Chandra Dev Pathak");



// If throw is written inside the async function, it becomes a rejected promise.
async function errorFunc() {
    throw new Error("Something went wrong!");
}

errorFunc()
    .then(data => console.log(data))
    .catch(err => console.error(err.message));
