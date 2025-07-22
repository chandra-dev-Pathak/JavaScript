// Promise.all() runs multiple Promises in parallel and waits for all to complete.
// It returns a single Promise that:-
// * resolves if all Promises succeed(.then)
// * rejects immediately if even one Promise fails(.catch)

// ** Promise.all() takes an array of promises and Also return as Array of Promises **
// If rejected, only the first error will be returned, rest of the promises will be ignored

// Basic Example of Promise.all() ======>>>

// Way One Promises set on Variable then pass to array (when Success of All)

let p1 = Promise.resolve("step1");
let p2 = Promise.resolve("step2");
let p3 = Promise.resolve("step3");

Promise.all([p1, p2, p3]).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

//Way Two Here we directly pass Promises To Priomise.all as Array Using comma 

Promise.all([
    Promise.resolve("task1"),
    Promise.resolve("task2"),
    Promise.resolve("task3"),
]).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// When One promise get reject let Example:-
// If rejected, only the first error will be returned, rest of the promises will be ignored

let tasks = Promise.all([
    Promise.resolve("Success"),
    Promise.reject("Failed"),
    Promise.resolve("Success"),
])

tasks.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// Edge Case: Empty Array?
// Yes, Promise.all([]) resolves immediately — with an empty array.
Promise.all([]).then((data) => console.log(data));

// Edge Case: Non-Promise values?
// Non - promise values are wrapped into promises by Promise.all().

Promise.all([
    Promise.resolve("A"),
    42,
    "hello",
    Promise.resolve("B")
]).then(console.log);


// Real-World Use Case: Fetching Multiple APIs

let fetchUser = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("User Data")
        }, 1000);
    })
}
let fetchPosts = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("Post Data")
        }, 2000);
    })
}
let fetchComments = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("Comments  Data")
        }, 1500);
    })
}

Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then((data) => {
    let [User, post, comments] = data;
    console.log({ User, post, comments });
}).catch(() => {
    console.log("Error: Something went Wrong");
})