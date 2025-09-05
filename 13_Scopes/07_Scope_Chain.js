/*
-----------------------------------
7. SCOPE CHAIN in JavaScript
-----------------------------------

Meaning:
- The scope chain is the process JavaScript uses to find variables.
- When a variable is used:
  1. JavaScript looks in the current scope.
  2. If not found, it looks in the outer (parent) scope.
  3. Keeps moving outward until the global scope.
  4. If still not found, it throws a ReferenceError.
- Scope chain is based on lexical scope (where code is written).

-----------------------------------
1. Basic Scope Chain
-----------------------------------
*/

let globalVar = "I am Global";

function outer() {
    let outerVar = "I am Outer";

    function inner() {
        let innerVar = "I am Inner";

        console.log(innerVar);   // Found in inner scope
        console.log(outerVar);   // Not in inner, found in outer
        console.log(globalVar);  // Not in outer, found in global
    }

    inner();
}

outer();

/*
Explanation:
- JavaScript searches step by step: inner → outer → global.
*/

/*
-----------------------------------
    2. ReferenceError Example
-----------------------------------
*/

function test() {
    // console.log(x); // Error: x is not defined
}

test();

/*
Explanation:
- Since x is not found in any scope, JS throws ReferenceError.
*/

/*
-----------------------------------
    3. Variable Shadowing
-----------------------------------
*/

let value = "Global";

function outerShadow() {
    let value = "Outer";

    function innerShadow() {
        let value = "Inner";
        console.log(value); // Nearest one wins → Inner
    }

    innerShadow();
}

outerShadow();

/*
Explanation:
- When the same variable name exists in multiple scopes, the closest (nearest) one is chosen.
- This is called variable shadowing.
*/

/*
-----------------------------------
    4. Scope Chain with Block Scope
-----------------------------------
*/

let a = "Global A";

{
    let a = "Block A";
    console.log(a); // Block A (nearest)
}

console.log(a);   // Global A (outside block)

/*
Explanation:
- Scope chain works with block scope also.
*/

/*
-----------------------------------
    5. Function inside Function inside Function
-----------------------------------
*/

let x = "Global X";

function level1() {
    let y = "Level 1 Y";

    function level2() {
        let z = "Level 2 Z";

        function level3() {
            console.log(x); // Global X
            console.log(y); // Level 1 Y
            console.log(z); // Level 2 Z
        }

        level3();
    }

    level2();
}

level1();

/*
Explanation:
- Scope chain travels upward until global scope.
- Inner functions can access variables from all outer levels.
*/

/*
-----------------------------------
    Summary of Scope Chain
-----------------------------------
- Scope chain is how JS resolves variables.
- Search order: Current scope → Parent scope → Global scope.
- If not found in any scope → ReferenceError.
- Nearest variable wins(variable shadowing).
- Scope chain follows lexical scope, not runtime calling order.
- Works for function scope, block scope, and closures.
*/
