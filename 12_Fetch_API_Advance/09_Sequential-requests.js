// =============================================================================
// SEQUENTIAL REQUESTS — FETCHING ONE AFTER ANOTHER
// =============================================================================


/*
What are Sequential Requests?
------------------------------
- Fetching multiple URLs **one at a time**, in a strict order.
- Each request starts **only after** the previous has completed.
- Opposite of parallel (like Promise.all).

Why use it?
-----------
- When API has rate limits.
- When response A is needed to form request B.
- When execution order matters (logs, inserts, etc).

Main Techniques:
----------------
1. Manual chaining with async/await
2. Looping with for...of
3. Functional chaining with reduce()
*/

// -----------------------------------------------------------------------------
// 1. MANUAL WAY (CHAINED AWAIT CALLS)
// -----------------------------------------------------------------------------

async function fetchManually() {
    try {
        console.log("Fetching Post 1");
        const res1 = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data1 = await res1.json();
        console.log("Post 1:", data1);

        console.log("Fetching Post 2");
        const res2 = await fetch("https://jsonplaceholder.typicode.com/posts/2");
        const data2 = await res2.json();
        console.log("Post 2:", data2);

        console.log("Fetching Post 3");
        const res3 = await fetch("https://jsonplaceholder.typicode.com/posts/3");
        const data3 = await res3.json();
        console.log("Post 3:", data3);
    } catch (err) {
        console.error("Manual Fetch Error:", err.message);
    }
}

fetchManually();

// -----------------------------------------------------------------------------
// 2. LOOPING WAY (for...of + await)
// -----------------------------------------------------------------------------

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
];

async function fetchSequentialWithLoop(urls) {
    const results = [];

    for (const url of urls) {
        try {
            console.log("Fetching:", url);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed with status ${res.status}`);
            const data = await res.json();
            results.push(data);
            console.log("Received:", data);
        } catch (err) {
            console.error("Error fetching:", url, err.message);
            results.push(null); // to preserve index
        }
    }

    return results;
}

fetchSequentialWithLoop(urls).then((data) => {
    console.log("All Results (for...of):", data);
});

// -----------------------------------------------------------------------------
// 3. FUNCTIONAL WAY (reduce() for sequence)
// -----------------------------------------------------------------------------

function fetchWithReduce(urls) {
    const results = [];

    return urls.reduce((promiseChain, currentUrl) => {
        return promiseChain.then(() => {
            console.log("Fetching (reduce):", currentUrl);
            return fetch(currentUrl)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed with status ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    results.push(data);
                    console.log("Received (reduce):", data);
                })
                .catch(err => {
                    console.error("Error fetching:", currentUrl, err.message);
                    results.push(null);
                });
        });
    }, Promise.resolve()).then(() => results); // final .then to get all results
}

fetchWithReduce(urls).then(data => {
    console.log("All Results (reduce):", data);
});

// =============================================================================
// QUICK RECALL (SUMMARY TABLE)
// =============================================================================

/*
Technique | Style       |Best For                  |Easy to Read? |Runs One-by-One?
----------|-------------|------------------------- |--------------|----------------
Manual    | Async/Await |Few requests, max control |Yes           |Yes
for...of  | Async Loop  |Most use-cases            |Yes           |Yes
reduce()  | Functional  |Functional style chaining |Complex       |Yes

Parallel Alternative:
---------------------
Use Promise.all when:
- You want all fetches to start at once
- They are independent (order doesn't matter)
- APIs allow concurrency

But Promise.all fails **fast** — one rejection stops all.
*/

// =============================================================================
// EXTRA NOTE: Why not use .map + async?
// =============================================================================

/*
urls.map(async url => {
    const res = await fetch(url); // This WILL run in parallel!
});
*/

