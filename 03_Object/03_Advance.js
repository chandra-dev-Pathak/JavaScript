// Merging Object one or more in one object 
// add 2 and more then two object in one

let singletonObj = new Object({
    name: "Hitesh",
    subscribe: 11125,
    isYoutuber: true
});

let itrealsObj = {
    name: "Raghaw",
    cllgYear: 1,
    isStudent: true
};

let allRecord = { itrealsObj, singletonObj }; // Way One merging Object

// -------------------------------------------------


// console.log(allRecord);
// console.log(`Way One: ${allRecord}`); // way this one is not working
// console.log(`Way One: ${JSON.stringify(allRecord)}`); // then you use this one JSON.stringify()
// console.log("way One ", allRecord);


// -------------------------------------------------

// spread method but overwrite data if same
let hellONE = {
    name: "raghaw",
    age: 12
}

let hellTwo = {
    name: "Chandra Dev Pathak",
    score: 12,
}

let objectThree = { ...hellONE, ...hellTwo }; // over data if variableNAME is same

console.log(objectThree);

// Spread operator
const objOne = { x: 1, y: 2 };
const objTwo = { z: 3, ...objOne }; // use uqine varNAme when use Spred method
console.log(objTwo); // { z: 3, x: 1, y: 2 }

// Merging objects

const obj1 = { a: 1, b: 2 };
const obj2 = { z: 3, a: 21 };
const merged = Object.assign({}, obj1, obj2);
// {} is main object where left All object are inside It
// {} if you dont use it like that {obj1, obj2} so obj1 is main left all are Inside Obj1 object
console.log(merged);


// If You find Propety in Object 

let boy = {
    name: "nikku",
    age: 11
}

console.log(boy.hasOwnProperty("age")); //return ture
console.log(boy.hasOwnProperty("agee")); // return false

// Object Destructuring

let city = {
    temp: 22,
    cityName: "gwalior",
    population: 1222124
}

let destructure = { temp, cityName, population } = city;
// let destructure = { temp, cityName: cN, population } = city; // if you sortName of variable
// console.log(temp, cN);

console.log(temp, cityName);

// Nested Object Destructuring

const laptop = {
    brand: "Dell",
    specs: {
        cpu: "i7",
        ram: "16GB"
    }
};

const { brand, specs: { cpu, ram } } = laptop;
console.log(brand, cpu, ram);

// Optional chaining
const user = {
    profile: {
        username: "raghaw"
    }
};

console.log(user?.profile?.username); // Works safely
console.log(user?.account?.username); // Undefined, no error
console.log(user?.account?.name); // Undefined, no error