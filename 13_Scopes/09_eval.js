/*
-----------------------------------
9. EVAL SCOPE (eval function in JavaScript)
-----------------------------------

Meaning:
- `eval()` is a built-in JavaScript function that takes a string 
  and executes it as code at runtime.
- The scope of variables created or modified inside eval depends 
  on where eval is called and whether strict mode is active.

Warning:
- `eval` can execute arbitrary code, which is a major security risk.
- It also slows down performance (disables some JS optimizations).
- Use it only if absolutely necessary.
*/

/*
Example 1: Simple eval
*/

eval("var x = 10;");
console.log(x); // 10
console.log(typeof x); // "number"

/*
Here, eval created a variable `x` dynamically in the global scope.
*/


/*
Example 2: Eval inside a function
*/

function test() {
    eval("var y = 20;");
    console.log(y); // 20 (local to function)
}

test();
// console.log(y); // ReferenceError (not global)


/*
Example 3: let and const inside eval
- Unlike var, variables created with let/const inside eval 
  are block-scoped and not available outside eval.
*/

eval("let a = 30; const b = 40;");
try {
    console.log(a);
} catch (e) {
    console.log("a not accessible outside eval");
}

try {
    console.log(b);
} catch (e) {
    console.log("b not accessible outside eval");
}


/*
Example 4: Modifying existing variables
- Eval can also modify variables that are already in scope.
*/

let count = 5;
eval("count = count + 10;");
console.log(count); // 15


/*
Example 5: Strict mode and eval
- In strict mode, eval has its own scope.
- Variables declared with var inside eval do not leak outside.
*/

"use strict";

eval("var z = 50;");
console.log(typeof z); // "undefined" (z not available outside)

eval("let q = 60;");
console.log(typeof q); // "undefined"


/*
Example 6: Security risk of eval
- Running untrusted code with eval is very dangerous.
*/

let userInput = "console.log('Injected code runs!')";
eval(userInput); // runs arbitrary code


/*
Summary of Eval Scope:
1. eval() executes a string as JavaScript code.
2. In non-strict mode:
   - var inside eval can leak to the surrounding scope.
   - let and const inside eval stay inside eval only.
3. In strict mode:
   - eval has its own isolated scope.
   - Even var cannot escape outside.
4. Eval can modify existing variables in the scope it runs in.
5. Avoid eval in production due to security and performance risks.
*/