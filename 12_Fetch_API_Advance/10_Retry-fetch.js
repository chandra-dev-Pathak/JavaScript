// =============================================================================
// RETRY FETCH REQUESTS — MULTIPLE METHODS
// =============================================================================

// -----------------------------------------------------------------------------
// DEFINITIONS + NOTES
// -----------------------------------------------------------------------------
/*
What is Retry?
- Retrying means reattempting a failed network request a limited number of times.
- Used in unstable networks, rate limits, or when API may intermittently fail.

Why Retry?
- Network temporarily down
- Server returns 500, 503, etc
- Resilience for critical requests

Common Retry Methods:
1. Manual retry with loop
2. Recursive retry function
3. Retry using `then().catch()`
4. Retry with delay (using setTimeout or await)
5. Retry with libraries like axios-retry (not shown here)

Best Practice:
  Always limit retries (avoid infinite loops)
  Add delay (exponential backoff is even better)
  Avoid retrying on client errors (4xx)
*/

// -----------------------------------------------------------------------------
// METHOD 1: Retry Using Loop
// -----------------------------------------------------------------------------

async function fetchWithRetryLoop(url, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Fetch failed: " + res.status);
            const data = await res.json();
            console.log("Success [Loop Retry]", data);
            return data;
        } catch (err) {
            console.warn(`Attempt ${attempt} failed.`, err.message);
            if (attempt < retries) await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error("All retry attempts failed.");
}

// fetchWithRetryLoop("https://jsonplaceholder.typicode.com/posts")

// -----------------------------------------------------------------------------
// METHOD 2: Retry Using Recursion
// -----------------------------------------------------------------------------

async function fetchWithRetryRecursive(url, retries = 3, delay = 1000) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        const data = await res.json();
        console.log("Success [Recursive Retry]", data);
        return data;
    } catch (err) {
        if (retries > 0) {
            console.warn(`Retrying recursively... remaining: ${retries}`);
            await new Promise(r => setTimeout(r, delay));
            return fetchWithRetryRecursive(url, retries - 1, delay);
        } else {
            throw new Error("Recursive retry failed");
        }
    }
}

// fetchWithRetryRecursive("https://jsonplaceholder.typicode.com/posts")

// -----------------------------------------------------------------------------
// METHOD 3: Retry Using then().catch()
// -----------------------------------------------------------------------------

function fetchWithThenCatch(url, retries = 3) {
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            return res.json();
        })
        .then(data => {
            console.log("Success [Then/Catch]", data);
        })
        .catch(err => {
            console.warn("Error occurred:", err.message);
            if (retries > 0) {
                console.log("Retrying with .then()... Remaining:", retries);
                return fetchWithThenCatch(url, retries - 1);
            } else {
                console.error("All retries failed in .then()");
            }
        });
}

// fetchWithThenCatch("https://jsonplaceholder.typicode.com/posts")

// -----------------------------------------------------------------------------
// METHOD 4: Retry with Delay Helper Function
// -----------------------------------------------------------------------------

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetryAndDelay(url, retries = 3, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Fetch failed: " + response.status);
            const data = await response.json();
            console.log("Success [Delay + Loop]", data);
            return data;
        } catch (error) {
            console.warn(`Attempt ${i + 1} failed: ${error.message}`);
            if (i < retries - 1) await delay(delayMs);
        }
    }
    throw new Error("All delayed retry attempts failed.");
}

// fetchWithRetryAndDelay("https://jsonplaceholder.typicode.com/posts")

// -----------------------------------------------------------------------------
// QUICK RECALL / SUMMARY
// -----------------------------------------------------------------------------
/*
Retry Strategy           Description                            When to Use
-----------------------  ------------------------------------  ------------------------
Loop Based               Clean, easy to understand              General use
Recursive               Elegant, but avoid large depth          When retries are few
Then/Catch Chain         Promise style, less common now         Older style
Delay + Loop             Best control, add time between tries   UI responsiveness needed
*/
