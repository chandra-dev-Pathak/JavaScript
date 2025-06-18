// For of loop
// USAGE: "for...of" is used for iterables(arrays,sets,maps,strings)

// for (const element of object) {
// 
// }

// Element means value of Object (like Array Value, object value)
// Object means ( what is that String Array object )

// Example 1

let arr = ["hello", "hey", "Namaste"];

for (const val of arr) {
    console.log(val);
}

// Example 2

let string = "raghaw";

for (const str of string) {
    console.log(str);
}

// Map (Map Always Store Unique) Map object Are the Value pair of key-Value

const map = new Map();
map.set("IN", "INDIA");
map.set("UK", "United Kingdom");
map.set("USA", "united State of America");
map.set("Fr", "France");

console.log(map);

// acces By for of loop 

for (const m of map) {
    console.log(m);
}

// Acces by key vlaue using for of lopp

for (const [key, value] of map) {
    console.log(`${key} full name is ${value}`);
}

// Can't Acces Direct object by for of loop

// USAGE: "for...in" is used to iterate over object keys, not array values
// IF you Want acces object so Use ( for In loop )

let person = {
    name: "ragahw",
    age: 12,
    isLogedIn: true
}

// for (const val in person) {
//     console.log(`key is ${val} name Is ${person[val]}`);
//     //console.log(val, person[val]);// here val is Key and person[val] is value (if you want value so (  objectname[val]  )
// }

// Acces Array by for In loop

let array = ["Amit", "arun", "abhishek"];

for (const key in array) {
    console.log(`${key}-> ${array[key]}`);
} // (not recommended for arrays)
