// Create a new Promise object
let promise = new Promise((res, rej) => {

    // Create a userData object
    let userData = {
        name: "Raghaw",
        age: 24,
        email: "cdp.chandra.dev@gmail.com",
        isLogin: true, // This flag controls the success or failure of the promise
    };

    // If user is logged in, resolve the promise and send userData
    if (userData.isLogin === true) {
        res(userData);
    } else {
        // If user is not logged in, reject the promise with an error message
        rej("Error User Is not Login");
    }

});

// Handle the resolved data using .then()
promise.then((userData) => {
    console.log(userData); // Print the user data if promise is successful
})

    // Handle any error using .catch()
    .catch((rej) => {
        console.log(rej); // Print the error message if promise is rejected
    })

    // Always run this block whether resolved or rejected
    .finally(() => {
        console.log("Promise Compeleted"); // Show this message after promise finishes
    });
