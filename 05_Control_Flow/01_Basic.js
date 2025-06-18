// ---------------------- If Control Flow ----------------------

// if (condition) { // If condition meet(ture) So Excutes inner Scope

// }

let age = 18;

if (age >= 18) {
    console.log(`"You are eligible to vote."`);
}

// ---------------------- If -Else  Control Flow ----------------------

// if (condition) { // If condition meet(ture) So Excutes inner If Scope

// } else { // If condition Don't meet(false) So Excutes Else Scope

// }

let isRaning = true;

if (isRaning) {
    console.log(`Take an umberla`);
} else {
    console.log(`Don't take a umberla`);
}


// ---------------------- Nested if-else  Control Flow ----------------------

let marks = 85;

if (marks >= 90) {
    console.log(`Garde A ${marks}`);
}
else if (marks >= 70) {
    console.log(`Garde B ${marks}`);
}
else if (marks >= 40) {
    console.log(`Garde C ${marks}`);
}
else if (marks >= 33) {
    console.log(`Garde C ${marks}`);
} else {
    console.log(`Fail ${marks}`);
}


// ---------------------- Switch Control Flow ----------------------

let month = "Nov";

switch (month) {
    case "Jan":
        console.log(`One Month`);
        break;
    case "Feb":
        console.log(`Two Month`);
        break;
    case "Mar":
        console.log(`Three Month`);
        break;
    case "App":
        console.log(`Fourth Month`);
        break;
    case "May":
        console.log(`Five Month`);
        break;
    case "June":
        console.log(`Six Month`);
        break;
    case "July":
        console.log(`Seven Month`);
        break;
    case "Aug":
        console.log(`Eight Month`);
        break;
    case "Sep":
        console.log(`Nine Month`);
        break;
    case "Oct":
        console.log(`Ten Month`);
        break;
    case "Nov":
        console.log(`Eleven Month`);
        break;
    case "Dec":
        console.log(`Twelth Month`);
        break;
    default:
        console.log(`Invaild Month`);
}


// --------------------- Ternary Operator Control Flow ---------------------

// () use prenthese (varName ? conditon ture : condition false);

let isLogedIn = false;

let ansWer = (isLogedIn ? 'login Ture' : 'login false');
console.log(ansWer);


// ----------------------- Truthy vs Falsy Values ------------------------

let input = "";

// Falsy values: false, 0, "", null, undefined, NaN
// Left This all Are truthy Value 

if (input) {
    console.log("Input received.");
} else {
    console.log("No input provided."); // Runs because "" is falsy
}

// ------------------ Nullish Coalescing Operator (??) ------------------ 


let userName = null;
let defaultName = "Guest";

let nameToDisplay = userName ?? defaultName; // if data Is not Define SO next (?? after this) will Excuted

console.log(nameToDisplay); // Output: Guest

