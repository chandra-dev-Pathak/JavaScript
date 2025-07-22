// Promise.allSettled() waits for all the promises to finish,
// whether they are successful (fulfilled) or failed (rejected).

// It gives you the result of each promise in an array of object,
// with two keys: 'status' and either 'value' (if success) or 'reason' (if failed).

// Even if some promises fail, it will NOT go to the .catch() block.
// That's because Promise.allSettled() itself never fails —
// it treats every result (success or fail) as part of the final array.

// Promise.allSettled() take promise as Array and Return as array of object

Promise.allSettled([
    Promise.resolve("Step 1 Success"),
    Promise.reject("Step 2 Failed"),
    Promise.resolve("Step 3 Success")
])
    .then((results) => {
        // This 'results' is an array of objects describing each promise's result
        console.log("All promises are settled:");
        console.log(results);
    })
    .catch((err) => {
        // This block will be ignored — because Promise.allSettled never fails
        console.log("Error:", err);
    });

// =====================================================>>>>>>

function fetchUser() {
    return new Promise((res) => {
        setTimeout(() => res({ name: "Raghaw" }), 1000);
    });
}

function fetchPosts() {
    return new Promise((res) => {
        setTimeout(() => res(["Post 1", "Post 2"]), 800);
    });
}

function fetchBrokenAPI() {
    return new Promise((_, rej) => {
        setTimeout(() => rej("❌ API Failed"), 1200);
    });
}

Promise.allSettled([fetchUser(), fetchPosts(), fetchBrokenAPI()])
    .then((results) => {
        results.forEach((res, i) => {
            if (res.status === "fulfilled") {
                console.log(`API ${i + 1} Success:`, res.value);
            } else {
                console.warn(`API ${i + 1} Failed:`, res.reason);
            }
        });
    });
