// Promise.any() runs all Promises in parallel 
// It returns the first fulfilled (resolved) Promise — the fastest one

// It goes to .then() if at least one Promise is successful (resolved)
// It goes to .catch() ONLY IF all Promises are rejected
// → In that case, it returns an AggregateError object

// Rejected Promises are ignored if even one resolves
// It can handle non-Promise values (they are auto-resolved)
// If the input array is empty, it rejects immediately with AggregateError


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
    let userIsLogin = true;
    setTimeout(() => {
        if (userIsLogin) {
            res("User Active True, Promise Two Resolved")
        } else {
            rej("User Unactive, Promise Two Rejected")
        }
    }, 500);
})

Promise.any([promiseOne, promiseTwo]).then(console.log).catch(console.error)


// Example When All Fail ======>>>

Promise.any([
    Promise.reject("A"),
    Promise.reject("B"),
    Promise.reject("C")
]).then(console.log).catch((err) => {
    console.error("All failed:", err); // AggregateError
});


// Empty Array:
Promise.any([])
// → Immediately returns: AggregateError (Because no chance of success promise)