// JavaScript Operators: From Basic to Advanced
// ========================================

// 🔹 1. Arithmetic Operators
let a = 10, b = 3;

console.log("Addition:", a + b);           // 13
console.log("Subtraction:", a - b);        // 7
console.log("Multiplication:", a * b);     // 30
console.log("Division:", a / b);           // 3.333...
console.log("Modulus (Remainder):", a % b); // 1
console.log("Exponentiation (a^b):", a ** b); // 1000

// 🔹 2. Increment & Decrement Operators
let x = 5;
console.log("x before increment:", x); // 5

// Postfix
console.log("x++ (Post-Increment):", x++); // 5 (then becomes 6)
console.log("x after post-increment:", x); // 6

// Prefix
console.log("++x (Pre-Increment):", ++x); // 7

// Postfix Decrement
console.log("x-- (Post-Decrement):", x--); // 7
console.log("x after post-decrement:", x); // 6

// Prefix Decrement
console.log("--x (Pre-Decrement):", --x); // 5

// 🔹 3. Assignment Operators
let y = 10;

y += 5; // y = y + 5
console.log("After += 5:", y); // 15

y -= 3;
console.log("After -= 3:", y); // 12

y *= 2;
console.log("After *= 2:", y); // 24

y /= 4;
console.log("After /= 4:", y); // 6

y %= 4;
console.log("After %= 4:", y); // 2

y **= 3;
console.log("After **= 3:", y); // 8

// 🔹 4. Comparison Operators
let num1 = 5;
let num2 = '5';

console.log("== :", num1 == num2);     // true (value only)
console.log("=== :", num1 === num2);   // false (value & type)
console.log("!= :", num1 != num2);     // false
console.log("!== :", num1 !== num2);   // true
console.log("> :", num1 > 3);          // true
console.log("< :", num1 < 10);         // true
console.log(">= :", num1 >= 5);        // true
console.log("<= :", num1 <= 4);        // false

// 🔹 5. Logical Operators
let loggedIn = true;
let isAdmin = false;

console.log("AND (&&):", loggedIn && isAdmin); // false
console.log("OR (||):", loggedIn || isAdmin);  // true
console.log("NOT (!):", !loggedIn);           // false

// 🔹 6. Bitwise Operators (Advanced)
let bit1 = 5; // 0101
let bit2 = 3; // 0011

console.log("AND (&):", bit1 & bit2); // 0001 → 1
console.log("OR (|):", bit1 | bit2);  // 0111 → 7
console.log("XOR (^):", bit1 ^ bit2); // 0110 → 6
console.log("NOT (~):", ~bit1);       // -6 (inverts all bits)
console.log("Left Shift (<<):", bit1 << 1); // 1010 → 10
console.log("Right Shift (>>):", bit1 >> 1); // 0010 → 2

// 🔹 7. Ternary Operator
let age = 17;
let result = age >= 18 ? "Eligible" : "Not eligible";
console.log("Ternary Result:", result); // Not eligible

// 🔹 8. Typeof Operator
console.log("Typeof 'Hello':", typeof 'Hello'); // string
console.log("Typeof 123:", typeof 123);         // number
console.log("Typeof true:", typeof true);       // boolean
console.log("Typeof null:", typeof null);       // object
console.log("Typeof undefined:", typeof undefined); // undefined

// 🔹 9. Nullish Coalescing Operator (??)
let username;
let displayName = username ?? "Guest";
console.log("Nullish Result:", displayName); // Guest

// 🔹 10. Optional Chaining Operator (?.)
let user = {
    profile: {
        name: "Raghaw",
    },
};

console.log("Name:", user?.profile?.name);     // Raghaw
console.log("Zip:", user?.address?.zip);       // undefined

// 🔹 11. Comma Operator
let val = (1 + 2, 3 + 4); // Returns last value
console.log("Comma Operator Result:", val); // 7

// 🔹 12. Spread & Rest (Used in Functions, Arrays, Objects)
// Spread
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log("Spread Array:", arr2); // [1,2,3,4,5]

// Rest
function sumAll(...numbers) {
    return numbers.reduce((acc, val) => acc + val, 0);
}
console.log("Sum using rest:", sumAll(1, 2, 3, 4)); // 10