// Multiple Conditions (Logical Operators)

let age = 25;
let hasLicense = true;

if (age >= 25 && hasLicense) {
    console.log("You can drive.");
} else {
    console.log("You cannot drive.");
}

// Complex nested if-else

let score = 78;

if (score >= 90) {
    console.log("Outstanding");
} else {
    if (score >= 75) {
        if (score >= 85) {
            console.log("Excellent");
        } else {
            console.log("Very Good");
        }
    } else {
        console.log("Needs Improvement");
    }
}


// Grouped switch-case

let fruitAndVeg = "Methi";

switch (fruitAndVeg) {
    case "apple":
    case "banana":
    case "orange":
        console.log("It's a fruit we have in stock.");
        break;
    case "pateto":
    case "Palak":
    case "Methi":
        console.log("It's a Vegitable we have in stock.");
        break;
    default:
        console.log("Sorry, not available.");
}


// Nested Ternary Operator

let temp = 55;

let weatherMessage = temperature > 35 ? "Too hot" : temperature > 25 ? "Warm" : "Cool";

console.log(weatherMessage); // Output: Warm


//  Truthy/Falsy Complex Examples

let inputValue = 0;

if (inputValue || inputValue === 0) {
    console.log("Input is valid (including 0).");
} else {
    console.log("Input is invalid.");
}


// Advanced Nullish Coalescing

let userSetting = null;
let systemSetting = undefined;
let defaultSetting = "Default";

let finalSetting = userSetting ?? systemSetting ?? defaultSetting;
console.log(finalSetting); // Output: Default
