// Promise.resolve() & Promise.reject()
// These are both special methods that instantly create a Promise — without any async code.

// Promise.resolve(value)===>>
// It returns a fulfilled(resolved) promise immediately. 

// Way-One Without Pass value

let promiseOne = Promise.resolve("Promise Succes With value");

promiseOne.then((res) => {
    console.log(res);
})

// Way-Two Without Pass value

let promiseTwo = Promise.resolve();

promiseTwo.then(() => {
    console.log("Promise Success without value");
})

// ==========================================================================>>>>>>

// Promise.reject(error)===>>
// This returns a rejected(failed) promise immediately.

// Way-One Without Pass value

let promiseOneError = Promise.reject("Promise error catch With value");

promiseOneError.catch((rej) => {
    console.log(rej);
})

// Way-Two Without Pass value

let promiseTwoError = Promise.reject();

promiseTwoError.catch(() => {
    console.log("Promise error catch without value");
})

// =================================================================>>>>> 

// Working With Both Immediately Promise in One scenario

let getUser = (user) => {
    if (user.isLoggedIn) {
        return Promise.resolve(user)
    } else {
        return Promise.resolve("User is not login")
    }
}

let user = {
    name: "Rahul",
    isLoggedIn: true,
}

getUser(user).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    console.log("Promise Compelete");
})

// ===================================================>>>>>>>

// Immediately Promise in chains

Promise.resolve("Step-1").then((msg) => {
    console.log(msg);
    return Promise.resolve("step-2")
}).then((msg) => {
    console.log(msg);
    return Promise.reject("Failed step-3")
}).then((msg) => {
    console.log(msg);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    console.log("Promise compelete");
})