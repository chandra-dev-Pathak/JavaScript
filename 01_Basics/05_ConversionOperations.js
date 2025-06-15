// 🔁 Type Conversion Examples in JavaScript

// String to Number
let str = "123";
let num = Number(str);
console.log("String to Number:", num, typeof num);

// Number to String
let number = 456;
let strNum = String(number);
console.log("Number to String:", strNum, typeof strNum);

// Boolean to Number
let boolTrue = true;
let boolToNum = Number(boolTrue);
console.log("Boolean true to Number:", boolToNum);

let boolFalse = false;
let boolToNum2 = Number(boolFalse);
console.log("Boolean false to Number:", boolToNum2);

// Number to Boolean
let zero = 0;
let numToBool = Boolean(zero);
console.log("0 to Boolean:", numToBool);

let one = 1;
let numToBool2 = Boolean(one);
console.log("1 to Boolean:", numToBool2);

// String to Boolean
let emptyString = "";
let strToBool = Boolean(emptyString);
console.log("Empty string to Boolean:", strToBool);

let text = "Hello";
let textToBool = Boolean(text);
console.log("Non-empty string to Boolean:", textToBool);