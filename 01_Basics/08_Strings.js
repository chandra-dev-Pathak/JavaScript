// ==========================================
//  Strings in JavaScript (Basic to Advanced)
// ==========================================

//  1. String Declaration
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`; // Template literal (backticks)

console.log(str1, str2, str3);

//  2. String Concatenation
let fullName = str1 + " " + str2;
console.log("Concatenated:", fullName);

//  3. Template Literals (Recommended)
let age = 25;
let message = `I am ${age} years old`;
console.log("Template Literal:", message);

//  4. String Properties
console.log("Length:", fullName.length);

//  5. Accessing Characters
console.log("First Letter:", fullName[0]);
console.log("Last Letter:", fullName[fullName.length - 1]);

//  6. Common String Methods
let example = "  JavaScript String Methods  ";

console.log(example.toUpperCase());   // Convert to UPPERCASE
console.log(example.toLowerCase());   // Convert to lowercase
console.log(example.trim());          // Remove spaces from start and end
console.log(example.includes("Script")); // true
console.log(example.indexOf("Script"));  // Starting index
console.log(example.replace("String", "Functions")); // Replace word

//  7. Slice, Substring, Substr
let sliced = example.slice(2, 10);      // from index 2 to 9
let substrg = example.substring(2, 10); // similar to slice
let substrd = example.substr(2, 5);     // start at 2, take 5 chars

console.log("slice:", sliced);
console.log("substring:", substrg);
console.log("substr:", substrd);

// 8. Splitting a String into Array
let tags = "js, html, css, react";
let tagArray = tags.split(",");
console.log("Split array:", tagArray);

// 9. String Immutability

let original = "Raghaw";
let changed = original.replace("R", "B");
console.log("Original:", original);  // Raghaw
console.log("Changed:", changed);    // Baghaw

// 10. String + Numbers

console.log("5" + 5); // '55' (string)
console.log("5" - 2); // 3   (number because of - operator)
console.log("5" * "2"); // 10 (both converted to number)
console.log("abc" * 2); // NaN

//  11. Unicode & Escape Characters
let unicode = "I ♥ JS";
let escaped = 'He said, \"Hello!\"';
console.log(unicode);
console.log(escaped);

// 12. Advanced: Padding
console.log("5".padStart(3, "0")); // "005"
console.log("5".padEnd(3, "*"));   // "5**"

// 13. Repeat
console.log("Hi! ".repeat(3)); // Hi! Hi! Hi!

// 14. charAt and charCodeAt
let name = "JavaScript";
console.log(name.charAt(0));      // 'J'
console.log(name.charCodeAt(0));  // 74 (ASCII code of 'J')

// 15. Converting to string
let num = 100;
console.log(num.toString()); // "100"