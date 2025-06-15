// ==========================================
// 📘 JavaScript Numbers & Math (Basic to Advanced)
// ==========================================

// ✅ 1. Declaring Numbers
let num1 = 42;
let num2 = 3.14;
let num3 = -100;

console.log(num1, num2, num3);

// ✅ 2. Type Checking
console.log(typeof num1);         // number
console.log(Number.isInteger(num2)); // false

// ✅ 3. Converting Strings to Numbers
let str = "123";
console.log(Number(str));         // 123
console.log(parseInt(str));       // 123
console.log(parseFloat("3.14"));  // 3.14
console.log(+"99.99");            // 99.99 (unary plus operator)

// ✅ 4. NaN (Not a Number)
let invalid = Number("abc");
console.log(invalid);             // NaN
console.log(isNaN(invalid));      // true

// ✅ 5. Infinity and -Infinity
console.log(1 / 0);               // Infinity
console.log(-1 / 0);              // -Infinity

// ✅ 6. Number Methods
let value = 123.45678;

console.log(value.toFixed(2));     // "123.46"
console.log(value.toPrecision(4)); // "123.5"
console.log(value.toExponential()); // "1.2345678e+2"

// ==========================================
// 📐 Math Object in JavaScript
// ==========================================

// ✅ 7. Basic Math Operations
console.log(Math.abs(-7));          // 7
console.log(Math.round(4.6));       // 5
console.log(Math.floor(4.9));       // 4
console.log(Math.ceil(4.1));        // 5
console.log(Math.trunc(4.99));      // 4

// ✅ 8. Max and Min
console.log(Math.max(5, 3, 8, 1));  // 8
console.log(Math.min(5, 3, 8, 1));  // 1

// ✅ 9. Power and Square Root
console.log(Math.pow(2, 3));        // 8
console.log(2 ** 3);                // 8 (modern syntax)
console.log(Math.sqrt(25));         // 5

// ✅ 10. Random Numbers
console.log(Math.random());         // random number between 0 and 1
console.log(Math.floor(Math.random() * 10)); // random integer 0–9

// ✅ 11. Trigonometry (Advanced)
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(0));           // 1
console.log(Math.tan(0));           // 0

// ✅ 12. Logarithms
console.log(Math.log(1));           // 0 (natural log)
console.log(Math.log10(1000));      // 3
console.log(Math.log2(8));          // 3

// ✅ 13. Constants
console.log(Math.PI);               // 3.141592653...
console.log(Math.E);                // 2.718...

// ==========================================
// 🔁 Bonus: Custom Random Integer Function
// ==========================================
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log("Random between 1 and 100:", getRandomInt(1, 100));