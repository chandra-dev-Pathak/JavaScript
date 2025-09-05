/*
-----------------------------------
10. STRICT MODE SCOPE DIFFERENCES
-----------------------------------

Meaning:
- "Strict Mode" is a special mode in JavaScript that makes the language more secure, predictable, and less error-prone.
- It changes the way scope and variables are handled.
- You enable it by adding: "use strict";
- Strict mode applies to the whole script or to an individual function.

Example: enabling strict mode
*/

"use strict"; // applies to this whole file

function example() {
    "use strict"; // applies only to this function
}


/*
-----------------------------------
Key Scope Differences in Strict Mode
-----------------------------------
*/


/*
1. Accidental Globals are Prevented
-----------------------------------
- Non-strict mode: assigning to an undeclared variable automatically 
  creates a global variable.
- Strict mode: throws ReferenceError instead.
*/

// Non-strict example (unsafe):
// x = 10; // creates a global variable silently
// console.log(x); // 10

// Strict example (safe):
"use strict";
// y = 20; // ReferenceError: y is not defined


/*
2. Duplicate Parameter Names Not Allowed
----------------------------------------
- Non-strict mode allows duplicate parameter names (confusing).
- Strict mode forbids it.
*/

// Non-strict (works but confusing):
// function add(a, a, b) { return a + b; }
// console.log(add(1, 2, 3)); // 5

// Strict (error):
// "use strict";
// function add(a, a, b) { return a + b; } 
// SyntaxError: Duplicate parameter name not allowed in strict mode


/*
3. this in Functions
----------------------------------------
- Non-strict mode: in a normal function, `this` refers to the global object 
  (window in browsers, global in Node.js).
- Strict mode: `this` is undefined if not explicitly set.
*/

function showThis() {
    console.log(this);
}

showThis();
// Non-strict → Window (browser) or global object
// Strict → undefined


/*
4. Eval Scope
----------------------------------------
- Non-strict mode: eval can inject variables into the surrounding scope.
- Strict mode: eval has its own scope (sandboxed).
*/

// Non-strict:
eval("var a = 100;");
console.log(a); // 100

// Strict:
"use strict";
eval("var b = 200;");
console.log(typeof b); // "undefined" (b does not leak outside)

// let and const inside eval in strict mode:
"use strict";
eval("let c = 300; const d = 400;");
console.log(typeof c); // "undefined"
console.log(typeof d); // "undefined"


/*
5. Reserved Keywords
----------------------------------------
- Strict mode forbids the use of future reserved words as variable names.
- Examples: public, private, protected, interface, package, etc.
*/

// Non-strict:
// var public = 10; // allowed (not recommended)

// Strict:
// "use strict";
// var public = 10; // SyntaxError


/*
6. Deleting Variables or Functions
----------------------------------------
- Non-strict mode: delete variable or function silently fails.
- Strict mode: deleting variables, functions, or function parameters 
  throws an error.
*/

// Non-strict:
var num = 5;
// delete num; // false (silently ignored)

// Strict:
// "use strict";
// var value = 10;
// delete value; // SyntaxError


/*
7. Writing to Read-Only Properties
----------------------------------------
- Non-strict mode: writing to read-only properties fails silently.
- Strict mode: throws an error.
*/

const obj = {};
Object.defineProperty(obj, "fixed", {
    value: 42,
    writable: false
});

// Non-strict: obj.fixed = 100; // fails silently
// Strict: "use strict"; obj.fixed = 100; // TypeError


/*
8. Octal Literals
----------------------------------------
- Non-strict mode: old-style octal literals (like 0123) are allowed.
- Strict mode: they are forbidden.
*/

// Non-strict:
// var num = 0123; // 83 in octal

// Strict:
// "use strict";
// var num = 0123; // SyntaxError: Octal literals are not allowed


/*
9. with Statement Forbidden
----------------------------------------
- Non-strict mode: with() is allowed (but confusing and dangerous).
- Strict mode: with() is forbidden.
*/

// Non-strict:
// with (Math) {
//   console.log(sin(1));
// }

// Strict:
// "use strict";
// with (Math) { console.log(cos(1)); } // SyntaxError


/*
-----------------------------------
Summary of Strict Mode Scope Differences
-----------------------------------

1. Prevents accidental globals.
2. Forbids duplicate parameter names.
3. Changes `this` in functions: undefined instead of global object.
4. eval gets its own scope; let/const inside eval never leak.
5. Reserved words cannot be used as identifiers.
6. Deleting variables, functions, or parameters throws error.
7. Writing to read-only properties throws error.
8. Octal literals are not allowed.
9. with statement is forbidden.

Overall: Strict mode enforces safer and cleaner scope handling.
Modern ES6+ features (modules, classes) are automatically strict mode.
*/
