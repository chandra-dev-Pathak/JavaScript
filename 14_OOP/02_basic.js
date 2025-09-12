// Normal function cal

function user(name, age, isLogin) {
    let geerting = function () {
        return `username is ${name} and age is ${age}`;

    }
    return { n: name, a: age, il: isLogin, fn: geerting() }
}

let userOne = user("chandra dev pathak", 12, true)
let userTwo = user("Harsh dev pathak", 14, false)

console.log(userOne);
console.log(userTwo);

// - A normal function runs like any other function.
// - If you want an object back, you must explicitly return it.
// - Here, user() returns a new object literal containing the values.
// - Every time you call user(), a completely new object is returned.
// - Functions inside (greeting) are recreated each time you call the function.

// -----------------------------------------------------------------------------------

// Constructor call

function userDetails(name, age, isLogin) {

    // let greet = function () {
    //     return `username is ${name} and age is ${age}`;
    // }
    this.n = name
    this.a = age
    this.il = isLogin
    // this.fun = greet()
}

let user1 = new userDetails("chandra dev pathak", 12, true)
let user2 = new userDetails("Harsh dev pathak", 14, false)

console.log(user1);
console.log(user2);

// When you use new, JavaScript does these steps internally:-

// - Creates an empty object({}).
// - Links it to the function’s prototype.
// - Calls the function with this = newObject.
// - Returns that object(unless you return something else manually).

// You don’t have to return anything yourself.

// Properties and methods added to this become part of the object.

// Functions placed on userDetails.prototype will be shared across all objects, instead of being recreated every time.

// -----------------------------------------------------------------------------------

// Simulating new Manually (how it works under the hood)

function myNew(constructor, ...args) {
    // Step 1: create empty object
    let obj = {};

    // Step 2: link prototype
    obj.__proto__ = constructor.prototype;

    // Step 3: call constructor with 'this' bound to obj
    let result = constructor.apply(obj, args);

    // Step 4: return obj (unless constructor explicitly returns an object)
    return (typeof result === "object" && result !== null) ? result : obj;
}

function User(name, age) {
    this.name = name;
    this.age = age;
}

let u1 = myNew(User, "Chandra", 12);
console.log(u1); // { name: 'Chandra', age: 12 }

let u2 = myNew(User, "Innu", 18);
console.log(u2); // { name: 'Innu', age: 18 }

// myNew function does exactly what JavaScript does internally when you use the new keyword.