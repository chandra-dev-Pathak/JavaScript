/*
-----------------------------------
 4. MODULE SCOPE in JavaScript (ES6+)
-----------------------------------

Meaning:
- When using ES6 modules (import/export), each file is treated as a separate module.
- Variables, functions, and classes declared in a module are not global.
- They are scoped to that module only.
- To use them in another file, you must explicitly export and import.
- Global scope does not leak across modules.

-----------------------------------
 Important Note for Node.js Users
-----------------------------------
- By default, Node.js uses CommonJS (require(for import) / module.exports(for export)).
- ES Modules (import/export) require either:
  1. Adding "type": "module" in package.json, OR
  2. Using the .mjs file extension.

Summary:
- import / export = ES Modules → needs "type": "module" or .mjs extension.
- require / module.exports = CommonJS → default Node.js behavior.

-----------------------------------
 1. Simple Module Variable Example
-----------------------------------
*/

// math.js
// let secret = 42; // module scoped (private)

// Exported function
// export function add(a, b) {
//     return a + b;
// }

// app.js
// import { add } from "./math.js";

// console.log(add(5, 10)); // 15
// console.log(secret); // Error: secret is not defined

/*
Explanation:
- secret is private to math.js and cannot be accessed outside.
- Only add() is accessible because we exported it.

-----------------------------------
 2. Default Export Example
-----------------------------------
*/

// greet.js
// export default function greet(name) {
//     return `Hello, ${name}!`;
// }

// main.js
// import greet from "./greet.js";

// console.log(greet("Ram")); // Hello, Ram!

/*
Explanation:
- default export allows importing with any name.

-----------------------------------
 3. Module Scope vs Global Scope
-----------------------------------
*/

// file1.js
// let name = "Ram"; // scoped only to this module
// console.log("File1 name:", name);

// file2.js
// let name = "Shyam"; // scoped only to this module
// console.log("File2 name:", name);

// main.js
// import "./file1.js";
// import "./file2.js";

// Output:
// File1 name: Ram
// File2 name: Shyam

/*
Explanation:
- Each module has its own variable name.
- No conflicts or overwriting.

-----------------------------------
 4. Browser Module Example
-----------------------------------
*/

// index.html
<script type="module">
    import {add} from "./math.js";
    console.log(add(2, 3)); // 5
</script>

/*
Explanation:
- Using type="module" ensures the script runs in module scope.

-----------------------------------
 Summary of Module Scope
-----------------------------------
- Each file with export/import = module.
- Variables and functions are private to that file by default.
- To use them outside, you must export and import.
- Modules avoid global pollution and naming conflicts.
- In browsers, <script type="module"> is required to use modules.
- In Node.js, ES Modules require "type": "module" or .mjs extension.
- Otherwise, Node.js defaults to CommonJS with require/module.exports.

-----------------------------------
 Good Practices
-----------------------------------
- Export only what is necessary.
- Keep helper variables/functions private inside the module.
- Organize code into separate modules for clarity and reusability.
*/
