/*
-----------------------------------
 2. LOCAL SCOPE / FUNCTION SCOPE in JavaScript
-----------------------------------

Meaning:
- Local scope means variables and functions declared inside another function.
- These variables can only be accessed inside that function and are not visible outside.
- Each time the function runs, its local variables are created fresh and destroyed when the function finishes.

-----------------------------------
 1. Local Variable inside Function
-----------------------------------
*/

function sayHello() {
    let message = "Hello, I am inside the function!";
    console.log(message); // Accessible inside function
}

sayHello();
// console.log(message); // Error: message is not defined

/*
Explanation:
- "message" is a local variable of sayHello().
- It cannot be used outside the function.

-----------------------------------
 2. Function Scope with var
-----------------------------------
- "var" is function-scoped (not block-scoped).
- That means if you declare var inside a function,
-  it’s local to that function, but NOT limited to blocks like if/for.
*/

function testVar() {
    if (true) {
        var x = 100; // function scoped
    }
    console.log(x); // Accessible because var ignores block scope
}

testVar();

/*
-----------------------------------
 3. Function Scope with let and const
-----------------------------------
- Variables declared with let and const inside a function are block-scoped.
- They only exist inside the {} block where they are declared.
*/

function testLetConst() {
    if (true) {
        let y = 200;
        const z = 300;
        console.log(y); // 200
        console.log(z); // 300
    }

    // console.log(y); // Error: y is not defined
    // console.log(z); // Error: z is not defined
}

testLetConst();

/*
-----------------------------------
 4. Nested Functions (Local Scope inside Local Scope)
-----------------------------------
- Inner functions can access variables of outer functions.
- Outer functions cannot access variables of inner functions.
*/

function outerFunction() {
    let outerVar = "I am from outer function";

    function innerFunction() {
        let innerVar = "I am from inner function";
        console.log(outerVar); // Can access outer variable
        console.log(innerVar); // Accessible inside inner function
    }

    innerFunction();
    // console.log(innerVar); // Error: innerVar not defined here
}

outerFunction();

/*
-----------------------------------
 5. Function Parameters as Local Variables
-----------------------------------
- Parameters passed to a function act as local variables.
*/

function add(a, b) {
    let sum = a + b; // local variable
    return sum;
}

console.log(add(5, 7)); // 12
// console.log(sum); // Error: sum is local only

/*
-----------------------------------
 6. Why Local Scope is Useful
-----------------------------------
- Keeps variables private and safe from outside code.
- Prevents naming conflicts.
- Makes code easier to manage and debug.

-----------------------------------
 Summary of Local / Function Scope
-----------------------------------
- Variables declared inside a function are local to that function.
- var is function-scoped (ignores block scope).
- let and const are block-scoped (exist only within {}).
- Inner functions can access outer function’s variables.
- Outer functions cannot access inner function’s variables.
*/
