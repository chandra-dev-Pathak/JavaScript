// ForEach - loop 
// accept function but with no name 
// forEach never return use filter that Returns

// ----------------------------------------

let programming = ["c++", "java", "javascript", "python", "c"];

programming.forEach(function (val) {
    console.log(val);
}); // using Simple Fucntion

// ----------------------------------------

let student = ["Amit", "Arun", "Akash", "Ashok"];

student.forEach((val) => (console.log(val))); // using Arrow Fucntion

// ----------------------------------------

// Pass function in forEach loop

let number = [10, 20, 30, 40, 50];

function addtwo(num) {
    console.log(num + 2);
}

number.forEach(addtwo) // Only refrence not need to call

// forEach parameter like value index or Full Arrays

// forEach((value, index, fullArray) => {`excuted here`})
number.forEach((val, ind, arr) => {
    console.log(`${val} -> ${ind} -> ${arr}`);
}); // no need Full array mostly

// ----------------------------------------

// [ {}, {}, {}, {} ] Object in Array by forEach

let objArr = [
    {
        name: "ragahw",
        age: 24
    },
    {
        clg: "vikrant University",
        semster: "2nd",
    },
    {
        department: "computer of Application",
        isRegular: true
    }
]

objArr.forEach((item) => {
    console.log(item.name);
});

// If forEach no return then trun your Logic

let newArr = [52, 14, 75, 98, 21, 45];
let empty = [];
newArr.forEach((item) => {
    empty.push(item);
})
console.log(empty);

