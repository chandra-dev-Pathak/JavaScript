// Create a program that checks if a number is positive, negative, or zero, and prints the result.

let num = 10;

if (num === 0) {
    console.log(`Num is Zero ${num}`);
}
else if (num > 0) {
    console.log(`Num is Positive ${num}`);
} else {
    console.log(`Num is Negative ${num}`);
}

// ------------------------------------------------

// Write a program that checks a person's age and prints:
// "Child" if age < 13
// "Teenager" if 13–19
// "Adult" if 20–59
// "Senior" if 60 or more

let age = 60;

if (age < 13) {
    console.log(`Child age is ${age}`);
} else if (age >= 13 && age <= 19) {
    console.log(`Teenager age is ${age}`);
} else if (age >= 20 && age <= 59) {
    console.log(`Adult age is ${age}`);
} else {
    console.log(`Senior age is ${age}`);
}

// ------------------------------------------------

// Create a program that checks the day number (1–7) and prints the day name:

let day = 7;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid Day");
}

// ------------------------------------------------

// Check if a number is even or odd using a ternary operator, and print the result.
// condition ? valueIfTrue : valueIfFalse;

let number = 21;

let result = number % 2 == 0 ? "even" : "odd";
console.log(result);

// ------------------------------------------------

let input = "";

if (input == "") {
    console.log(`invalid`);
}
else if (input == null) {
    console.log(`invalid`);
}
else if (input == undefined) {
    console.log(`invalid`);
}
else if (input == 0) {
    console.log(`invaild`);
}
else if (input == false) {
    console.log(`invaild`);
}
else if (input == NaN) {
    console.log(`invaild`);
}
else {
    console.log(`valid`);
}

// ------------------------------------------------

// Write a program using ?? that sets a default value "Guest" if the username is null or undefined.

let username = null;
let nameToShow = username ?? "guest";
console.log(nameToShow); // Output: "Guest"
