/*
-----------------------------------
6. CLOSURE SCOPE in JavaScript
-----------------------------------

Meaning:
- A closure happens when a function "remembers" the variables from its outer scope, even after the outer function has finished running.
- In short: Closure = Function + its lexical environment.

-----------------------------------
1. Basic Closure
-----------------------------------
*/

function outer() {
    let outerVar = "I am from outer";

    function inner() {
        console.log(outerVar); // inner remembers outerVar
    }

    return inner;
}

const myFunc = outer();
myFunc(); // Output: I am from outer

/*
Explanation:
- Even after outer() is finished, inner still remembers outerVar.
- This is the closure effect.
*/

/*
-----------------------------------
    2. Closure with Private Data
-----------------------------------
*/

function counter() {
    let count = 0; // private variable

    return function () {
        count++;
        return count;
    };
}

const myCounter = counter();

console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3

/*
Explanation:
- count is not accessible directly outside counter().
- Only the returned inner function can access and modify it.
- Closures allow creation of private variables.
*/

/*
-----------------------------------
    3. Different Closure Instances
-----------------------------------
*/

function createCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1

/*
Explanation:
- Each call of createCounter() creates a new closure.
- Every closure has its own memory and state.
*/

/*
-----------------------------------
    4. Closure in setTimeout
-----------------------------------
*/

function delayedMessage(msg, delay) {
    setTimeout(function () {
        console.log("Message:", msg);
    }, delay);
}

delayedMessage("Hello Ram!", 1000); // prints after 1 second

/*
Explanation:
- The inner function inside setTimeout remembers msg.
- Closure allows the callback to access outer variables later.
*/

/*
-----------------------------------
    5. Loop and Closure(var vs let)
-----------------------------------
*/

for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log("var i:", i);
    }, i * 1000);
}

// Output after 1s,2s,3s: var i: 4 (three times)

/*
Problem:
- var is function-scoped, not block-scoped.
- Closure captures the same variable i.
*/

for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log("let i:", i);
    }, i * 1000);
}

// Output: 1, 2, 3

/*
Fix:
- let creates a new block-scoped variable each iteration.
- Each closure gets its own i.
*/

/*
-----------------------------------
    6. Real - world Example
-----------------------------------
*/

function createUser(name) {
    let score = 0;

    return {
        getScore: function () {
            return `${name}'s score is ${score}`;
        },
        addPoint: function () {
            score++;
        }
    };
}

const user1 = createUser("Alice");
const user2 = createUser("Bob");

user1.addPoint();
user1.addPoint();

console.log(user1.getScore()); // Alice's score is 2
console.log(user2.getScore()); // Bob's score is 0

/*
Explanation:
- Each user gets its own closure with its own score.
- Variables remain private and cannot be modified directly.
*/

/*
-----------------------------------
    Summary of Closures
-----------------------------------
- Closure = Function + its lexical scope.
- Allows function to remember variables after the outer function ends.
- Useful for private data, state management, callbacks, and function factories.
- Each closure instance has its own memory.
- Be careful with var in loops as it may lead to bugs.

-----------------------------------
    Good Practices
-----------------------------------
- Use closures for private data and maintaining state.
- Avoid unnecessary closures to prevent memory leaks.
- Understand lexical scope, since closures are based on it.
*/
