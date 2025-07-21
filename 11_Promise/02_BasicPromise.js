// 1. let promise = new Promise() ==>> JavaScript Created A Promise Object

// 2. let promise = new Promise(function(resolve, reject) {}) ===>>>

// Promise Give you a executor function ==>> [ function (resolve, reject) ]

// JavaScript Immediately call executor function ==>  executor function have two arguments (resolve== success, reject== fail)

// Promise Create →
//    |
//    |--> if success → resolve() → goes to .then()
//    |
//    |--> if fail    → reject() → goes to .catch()
//    |
//    |--> Either way → goes to .finally()


// --- Way One where we hold promise in Variable (Normal function)

let promise = new Promise(function (resolve, reject) {

    let success = true;

    if (success) {
        resolve("Yes reslove Working SuccessFully");
    } else {
        reject("Yes reject Working SuccessFully");
    }

});

promise.then(function (resolve) {
    console.log(resolve);
}).catch(function (reject) {
    console.log(reject);
}).finally(function () {
    console.log("Promise Compeleted");
})

// --- Way One where we don't hold promise in Variable (Arrow function)

new Promise((res, rej) => {
    let userFound = false;

    if (userFound) {
        res();
    } else {
        rej()
    }

}).then(() => {
    console.log("User-Founed");
}).catch(() => {
    console.log("User-Not-Founed");
}).finally(() => {
    console.log("Promise Compeleted");
})

// Output :-

// Yes reslove Working SuccessFully
// User-Not-Founed
// Promise Compeleted
// Promise Compeleted

// Why both finally run after then, catch ==>> JavaScript microtask queue, event loop.
// How:- They are register in microtasks queue, its execution oder is strictly defined.

// | Order | Execution                                   |
// | ----- | ------------------------------------------- |
// | 1     | `.then()` ya `.catch()` (whichever applies) |
// | 2     | `.finally()`                                |

// So event loop throw firstly then, catch
