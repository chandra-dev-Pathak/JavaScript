// ==============================================================================
// Fetch in JavaScript
// ==============================================================================

// What is fetch?
// ------------------------------------------------------------------------------
// In JavaScript, `fetch` is a built-in function used to make HTTP requests,
// such as getting data from an API or sending data to a server.
// It returns a Promise that resolves to a Response object, not directly the data.
// ------------------------------------------------------------------------------


// Default Behavior
// ------------------------------------------------------------------------------
// By default, fetch() makes a GET request.
// If you don’t specify a method, it is assumed to be a GET request.
// ------------------------------------------------------------------------------


// Fetch always returns a Promise
// ------------------------------------------------------------------------------
// Even if the URL is wrong or the request fails, fetch() returns a Promise.
// ------------------------------------------------------------------------------

const res = fetch('https://jsonplaceholder.typicode.com/posts');
console.log(res); // Output: Promise { <pending> }

// The data is not immediately available.
// You must use .then() or await to handle the result.

// ------------------------------------------------------------------------------


// The Fetch Response Object
// ------------------------------------------------------------------------------
// When fetch() completes, it returns a Response object (not the actual data).
// You need to call a method on it to extract the data:

// - response.json()  -> for JSON data
// - response.text()  -> for plain text
// - response.blob()  -> for binary data (images, files, etc.)
// ------------------------------------------------------------------------------


// Example: Viewing the Raw Response Object
async function callApi() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log(res); // Logs the full Response object
}
callApi();


// Example: Simple GET Request with JSON parsing
async function getUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json(); // Parse JSON data
    console.log("User:", data);         // Output parsed object
}
getUser();


// ------------------------------------------------------------------------------
// Ways to Handle Fetch Requests
// ------------------------------------------------------------------------------
// There are two common patterns:
// 1. Promise chaining using .then().catch()
// 2. Using async/await with try...catch
// ------------------------------------------------------------------------------


// Example 1: Using .then() and .catch() (Promise chaining)

fetch('https://jsonplaceholder.typicode.com/users/5')
    .then(response => {
        // Check if HTTP status is OK (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse response to JSON
    })
    .then(data => {
        console.log('User data by Promise chaining:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message); // Handle any errors
    });


// Example 2: Using async/await with try...catch

async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/8');

        // Check response status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse response data
        console.log('User data by Async/Await:', data);
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

getUsers();


// ==============================================================================
// Summary
// ==============================================================================
// - fetch() is used for making HTTP requests
// - Always returns a Promise
// - You must parse the Response object to get the actual data
// - Use .then() or async/await to handle the asynchronous response
// - Always handle errors using .catch() or try...catch
// ==============================================================================