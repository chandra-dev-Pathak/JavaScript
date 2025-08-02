// =============================================================================
// FETCH + ABORTCONTROLLER — FULL EXPLANATION 
// =============================================================================

// -----------------------------------------------------------------------------
// STEP 0: JS ENVIRONMENT + BROWSER LAYER UNDERSTANDING
// -----------------------------------------------------------------------------
/*
JS works with:

Component           Description
------------------  ----------------------------------------------------------
JS Engine (V8)      Executes JS code (like fetch call, promises, etc)
Browser Web APIs    Manages fetch(), setTimeout, DOM, etc.
Event Loop          Coordinates microtasks/macrotasks from queue to call stack
Task Queues         Microtasks (Promises), Macrotasks (Timers, I/O)

fetch() is NOT run by JS engine directly. It’s handed off to browser Web API.
*/

// -----------------------------------------------------------------------------
// STEP 1: YOU CALL fetch()
// -----------------------------------------------------------------------------

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => console.log("Data Received:", data));

/*
What happens:
1. JS engine sees fetch() and delegates it to Web API layer
2. fetch() returns a Promise IMMEDIATELY (even before request is sent)
3. Request is handled by browser’s Network thread
*/

// -----------------------------------------------------------------------------
// STEP 2: BROWSER CREATES REQUEST TASK
// -----------------------------------------------------------------------------
/*
- Browser parses fetch args (URL, method, headers)
- Builds a Request object
- Sends it to its own internal Network thread
  - This thread handles DNS, TCP, TLS, etc. (multi-threaded, unlike JS)
- JS engine continues running (non-blocking behavior)
*/

// -----------------------------------------------------------------------------
// STEP 3: FETCH HAPPENS INTERNALLY
// -----------------------------------------------------------------------------
/*
While JS continues executing:
- Browser starts the actual network operation
- Sends HTTP request to server
- Waits for response (still not blocking JS)
- Once response arrives, it prepares a Response object
*/

// -----------------------------------------------------------------------------
// STEP 4: RESPONSE PARSED, PROMISE RESOLVED
// -----------------------------------------------------------------------------
/*
- Response is parsed
- fetch() Promise is resolved
- Callback like `.then()` is queued in microtask queue
- Event Loop later runs it when JS call stack is empty
*/

// -----------------------------------------------------------------------------
// STEP 5: EVENT LOOP EXECUTES PROMISE CALLBACK
// -----------------------------------------------------------------------------
/*
- Event loop finds JS stack empty
- Pulls .then() from microtask queue
- Runs your .then(res => res.json()) code
*/

// -----------------------------------------------------------------------------
// WHY fetch() DOESN’T BLOCK
// -----------------------------------------------------------------------------
/*
- Browser offloads fetch to background threads
- UI stays responsive (non-blocking)
*/

// =============================================================================
// ABORTCONTROLLER CONCEPTS — DEEP FLOW
// =============================================================================

// -----------------------------------------------------------------------------
// WHAT IS AbortController?
// -----------------------------------------------------------------------------
/*
- Browser-provided API to manually cancel asynchronous operations (like fetch)
- Creates an abort signal to communicate with fetch
*/

// Core API:
const controller = new AbortController();
const signal = controller.signal;

// -----------------------------------------------------------------------------
// FETCH WITH ABORT
// -----------------------------------------------------------------------------

fetch("https://jsonplaceholder.typicode.com/posts", { signal })
    .then(res => res.json())
    .then(data => console.log("Success:", data))
    .catch(err => {
        if (err.name === "AbortError") {
            console.warn("Request Aborted");
        } else {
            console.error("Fetch Error:", err);
        }
    });

setTimeout(() => {
    controller.abort(); // Cancel after 100ms
}, 100);

/*
Behind the scenes:
1. You create AbortController
2. Pass signal to fetch()
3. Fetch listens for abort event
4. controller.abort() triggers the abort event
5. Fetch immediately rejects Promise with AbortError
*/

// -----------------------------------------------------------------------------
// NETWORK STATES DURING ABORT
// -----------------------------------------------------------------------------
/*
Stage                         | What Happens
-----------------------------|----------------------------------------
Before Request Sent          | Browser never opens TCP
Request Sent, No Response    | TCP socket is aborted
Response In Progress         | Browser discards incoming response
Response Fully Received      | Too late to abort
*/

// -----------------------------------------------------------------------------
// HOW FETCH HOOKS INTO ABORT EVENT INTERNALLY
// -----------------------------------------------------------------------------
/*
signal.addEventListener('abort', () => {
  // This is hidden inside browser
  // It tells fetch to stop/cancel
});
*/

// -----------------------------------------------------------------------------
// USE CASES FOR AbortController
// -----------------------------------------------------------------------------
/*
Use Case                  Why
------------------------  ---------------------------------------------
Route change in SPA       Cancel old requests to avoid race conditions
Search bar typing         Cancel old search if new key pressed
Timeouts                  Cancel requests after X seconds manually
Cleanup in components     Avoid state update after unmounted
*/

// -----------------------------------------------------------------------------
// MANUAL TIMEOUT EXAMPLE
// -----------------------------------------------------------------------------

const manualController = new AbortController();
setTimeout(() => manualController.abort(), 5000); // timeout in 5s

fetch("https://jsonplaceholder.typicode.com/posts", {
    signal: manualController.signal
})
    .then(res => res.json())
    .then(data => console.log("Fetched in time:", data))
    .catch(err => {
        if (err.name === "AbortError") {
            console.log("Timeout: Fetch Aborted");
        }
    });

// -----------------------------------------------------------------------------
// BONUS: WITH ASYNC/AWAIT
// -----------------------------------------------------------------------------

async function getDataWithAbort() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: controller.signal
        });

        const data = await res.json();
        console.log("Data Received:", data);
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("Request cancelled via abort()");
        } else {
            console.error("Unhandled error:", err);
        }
    } finally {
        clearTimeout(timeout); // clear timeout if fetch succeeded or failed
    }
}

getDataWithAbort();

// -----------------------------------------------
// Full example of Fetch By get Method 
// -----------------------------------------------

async function fetchWithAbort() {
    const controller = new AbortController(); // Create an abort controller
    const signal = controller.signal;         // Get the signal from it

    try {
        // Start the fetch with the controller's signal
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: signal, // Link the signal here
        });

        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(" Data received:", data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.warn(" Fetch request was cancelled.");
        } else {
            console.error(" Fetch Error:", error.message);
        }
    }
}

// Call the fetch function
fetchWithAbort();

// Cancel the request after 100 milliseconds
setTimeout(() => {
    console.log(" Aborting request...");
    // Abort the request using the controller
    controller.abort(); // Once aborted, the fetch will throw AbortError
}, 100);

// fetch() takes an options object, and the signal from the controller is used to track it.
// When controller.abort() is called:
// The fetch is interrupted.
// It throws an error with name === "AbortError".


// =============================================================================
// Quick Recoll
// =============================================================================
/*
Concept               Explanation
--------------------  --------------------------------------------------
AbortController       Creates a signal object that can notify listeners
.signal               You pass it to fetch, fetch "subscribes" to signal
.abort()              Sends event → fetch hears it → cancels network req
Promise               Instantly rejects with AbortError if aborted
Network Stack         Browser cancels underlying TCP/IP if possible
Event Loop            Manages callback queues → .catch() runs after abort

fetch()               Runs via browser Web API, NOT via JS engine
AbortController       Communicates with Web API, not with JS directly
*/
