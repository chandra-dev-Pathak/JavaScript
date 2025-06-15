// var example
var name = "Ali";
console.log("var name:", name);
name = "Ahmed";
console.log("var name after change:", name);

// let example
let age = 25;
console.log("let age:", age);
age = 26;
console.log("let age after change:", age);

// const example
const country = "India";
console.log("const country:", country);
// country = "Pakistan"; // ❌ This will throw an error because const can't be changed

// Block scope example
if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
    console.log("Inside block: a =", a, "b =", b, "c =", c);
}

console.log("Outside block: a =", a); // Accessible (var is function/global scoped)
// console.log("Outside block: b =", b); // ❌ Error (let is block scoped)
// console.log("Outside block: c =", c); // ❌ Error (const is block scoped)
