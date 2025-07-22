// Promise.race() returns a single Promise that settles (resolves or rejects)
// as soon as the first promise in the array settles — no matter whether it's a success or a failure.

// Return single promise / ignores rest Promise :-
// If the first one to be completed is resolved → .then() will run
// If the first one to be completed was rejected → .catch() will run

let promiseOne = new Promise((res, rej) => {
    let userActive = true;
    setTimeout(() => {
        if (userActive) {
            res("User Active True , Promise One Resolved")
        } else {
            rej("User Unactive, Promise One Rejected")
        }
    }, 1000);
})

let promiseTwo = new Promise((res, rej) => {
    let userIsLogin = false;
    setTimeout(() => {
        if (userIsLogin) {
            res("User Active True, Promise Two Resolved")
        } else {
            rej("User Unactive, Promise Two Rejected")
        }
    }, 500);
})

Promise.race([promiseOne, promiseTwo]).then(console.log).catch(console.error)

// JavaScript function reference concept

// Statement               | Meaning                           |
// ----------------------- | --------------------------------- |
// `.then(console.log)`    | `value => console.log(value)`     |
// `.catch(console.error)` | `err => console.error(err)`       |
// Don't use Paranthesis   | Because pass function Not calling |

// Real-World Simulation: Food Order from 3 Restaurants

function orderFromRestaurant(name, time, willDeliver = true) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willDeliver) {
                resolve(`Order from ${name} delivered in ${time}ms`);
            } else {
                reject(`${name} failed to deliver`);
            }
        }, time)
    })
}

const restaurant1 = orderFromRestaurant("Zomato", 2000);
const restaurant2 = orderFromRestaurant("Swiggy", 1500);
const restaurant3 = orderFromRestaurant("Domino's", 3000);


Promise.race([restaurant1, restaurant2, restaurant3])
    .then((result) => {
        console.log("Winner:", result);
    })
    .catch((error) => {
        console.log("Error:", error);
    });