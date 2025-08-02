// =============================================================================
// Fetching Multiple Resources Concurrently
// =============================================================================

/*
Concurrency ≠ Parallelism
- JavaScript is single-threaded.
- But fetch requests are handled by the browser's network stack.
- You can start multiple fetches simultaneously. They will run *concurrently* (in parallel on network threads).

Promise.all([...])
- Accepts an array of Promises.
- Waits for ALL of them to complete.
- If ANY one fails (rejects), the whole Promise.all fails.
*/

// -----------------------------------------------------------------------------
// STEP 1: Define array of endpoints (URLs to fetch)
// -----------------------------------------------------------------------------

const urls = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/comments"
];

// -----------------------------------------------------------------------------
// STEP 2: Fetch all using Promise.all + .map()
// -----------------------------------------------------------------------------

Promise.all(
    // map() converts each URL → fetch Promise
    urls.map((url) => {
        return fetch(url)
            .then((res) => {
                // Check if response is valid (status 2xx)
                if (!res.ok) {
                    throw new Error(`Fetch failed: ${res.status}`);
                }
                return res.json(); // Parse response body as JSON
            });
    })
)
    .then(([posts, users, comments]) => {
        // All responses received successfully
        console.log("Posts:", posts);
        console.log("Users:", users);
        console.log("Comments:", comments);
    })
    .catch((err) => {
        // If any one fetch fails, it ends up here
        console.error("One or more fetch requests failed:", err.message);
    });

/*
Flow:--
- All 3 fetches start IMMEDIATELY.
- Browser handles network calls in parallel (not via JS engine).
- Promise.all waits until ALL resolve.
- If any fetch fails or returns non-2xx, it’s caught in .catch.
*/


// =============================================================================
// EXTRA: Using Promise.allSettled() for partial results
// =============================================================================

Promise.allSettled(
    urls.map((url) => {
        return fetch(url).then((res) => res.json());
    })
).then((results) => {
    // Loop over each result (fulfilled or rejected)
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Result ${index + 1}:`, result.value);
        } else {
            console.warn(`Result ${index + 1} failed:`, result.reason.message);
        }
    });
});

/*
Promise.allSettled always resolves with info on EACH promise.
Useful for dashboards where partial data is better than none.
*/

// =============================================================================
// EXTRA: Using async/await instead of .then()
// =============================================================================

async function fetchAllData() {
    try {
        const [posts, users, comments] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
            fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
            fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json())
        ]);

        console.log("Async/Await - Posts:", posts);
        console.log("Async/Await - Users:", users);
        console.log("Async/Await - Comments:", comments);
    } catch (error) {
        console.error("Async/Await - One of the fetches failed:", error.message);
    }
}

fetchAllData();

// =============================================================================
// NOTE: You can also use fetchSequentially() if order or rate-limiting matters
// =============================================================================

async function fetchSequentially(urls) {
    const results = [];

    for (const url of urls) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            results.push(data);
        } catch (err) {
            console.error("Sequential fetch failed:", err.message);
            results.push(null); // push placeholder on error
        }
    }

    return results;
}

fetchSequentially(urls).then(data => {
    console.log("Sequential fetch results:", data);
});

// -----------------------------------------------------------------------------
// Manual sequential fetch (if concurrency isn’t required)
// -----------------------------------------------------------------------------

async function fetchSequentially(urls) {
    const results = [];

    for (let url of urls) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            results.push(data);
        } catch (err) {
            results.push(null);
            console.error("Sequential Fetch failed:", err.message);
        }
    }

    return results;
}

// NOTE: Slower but more controlled, useful when:
/// - Order matters
/// - Server limits simultaneous requests

// =============================================================================
// USE CASES — WHERE THIS IS SUPER USEFUL
// =============================================================================

/*
Dashboards          → Load multiple widgets/data points in parallel
Homepages           → Posts + Users + Comments fetched at once
Search engines      → Query multiple APIs (search + suggestions)
Analytics & Reports → Parallel load of datasets
*/