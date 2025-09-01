/*
-----------------------------------
 3. BLOCK SCOPE in JavaScript (let / const)
-----------------------------------

Meaning:
- Block scope means variables exist only inside the block { } where they are declared.
- A block can be anything with curly braces:
  * if statement
  * for / while loop
  * a standalone { }
- let and const follow block scope.
- var does not follow block scope (it is function-scoped).

-----------------------------------
 1. Block with let and const
-----------------------------------
*/

{
    let a = 10;
    const b = 20;
    console.log(a); // 10
    console.log(b); // 20
}

// console.log(a); // Error: a is not defined
// console.log(b); // Error: b is not defined

/*
Explanation:
- a and b exist only inside the block { }.
- They cannot be used outside.

-----------------------------------
 2. var ignores Block Scope
-----------------------------------
*/

{
    var c = 30;
}
console.log(c); // 30 (var does not care about block)

/*
Explanation:
- var is function-scoped, so it leaks out of the block.

-----------------------------------
 3. Inside Loops with let
-----------------------------------
*/

for (let i = 1; i <= 3; i++) {
    console.log("Inside loop i =", i);
}

// console.log(i); // Error: i is not defined

/*
Explanation:
- With let, the loop counter i is available only inside the loop block.
- This avoids accidental leaks and bugs.

-----------------------------------
 4. Inside Loops with var
-----------------------------------
*/

for (var j = 1; j <= 3; j++) {
    console.log("Inside loop j =", j);
}

console.log("Outside loop j =", j); // Accessible because var leaks

/*
Explanation:
- With var, j is accessible even outside the loop.
- This can cause problems in larger programs.

-----------------------------------
 5. If-Else Block Example
-----------------------------------
*/

if (true) {
    let x = "Inside if block";
    console.log(x); // Accessible
}

// console.log(x); // Error: not defined outside block

/*
-----------------------------------
 Summary of Block Scope
-----------------------------------
- Block = { } in JavaScript.
- let and const are block-scoped.
- var does not follow block scope (it is function-scoped).
- Block scope prevents variable leakage outside.
- Safer loops and conditions when using let and const.

-----------------------------------
 Good Practices
-----------------------------------
- Always prefer let or const instead of var.
- Use const when the value never changes.
- Use let when the value can change.
- Avoid var unless you specifically need function scope.
*/
