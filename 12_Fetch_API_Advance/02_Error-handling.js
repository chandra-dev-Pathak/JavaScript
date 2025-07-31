// ============================================================================
// Master File for Error Handling in Fetch
// ============================================================================

// ---------------------------------------------------------------------------
// Goal:
// Learn how to handle all types of errors using the fetch API in JavaScript:
// - JSON parsing errors
// - Network errors (offline, bad domain, CORS)
// - HTTP errors (404, 500, etc.)
// - Unexpected or malformed data
// - Centralized, reusable error handler
// ---------------------------------------------------------------------------

// =============================================================================
// 1. What is an HTTP Error?
// ----------------------------------------------------------------------------
// These occur when the server sends back a response with an error status code:
// For example: 404 (Not Found), 500 (Server Error), 403 (Forbidden)
// fetch() itself DOES NOT throw an error on HTTP errors. You must check manually.
// =============================================================================

async function handleHttpErrorExample() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/9999');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Data (HTTP OK):", data);
    } catch (error) {
        console.error("Handled HTTP Error:", error.message);
    }
}

// =============================================================================
// 2. What is a Network Error?
// ----------------------------------------------------------------------------
// Network errors happen when the request never reaches the server:
// - No internet
// - Invalid domain
// - CORS issues
// These automatically go to catch() — no response object is available.
// =============================================================================

async function handleNetworkErrorExample() {
    try {
        const response = await fetch('https://invalid.api.example.com/data');

        const data = await response.json(); // This will never run
        console.log(data);
    } catch (error) {
        console.error("Network Error Caught:", error.message);
    }
}

// =============================================================================
// 3. What is a JSON Parsing Error?
// ----------------------------------------------------------------------------
// Happens when the server responds with non-JSON content, but you try to parse it.
// Example: You expect JSON but receive HTML or plain text.
// =============================================================================

async function handleJsonParsingErrorExample() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/');

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Expected JSON, but got something else.");
        }

        const data = await response.json(); // May throw if not valid JSON
        console.log("Parsed Data:", data);
    } catch (error) {
        console.error("JSON Parsing Error:", error.message);
    }
}

// =============================================================================
// 4. What is an Unexpected Data Error?
// ----------------------------------------------------------------------------
// Happens when the response is valid JSON, but not in the format your app expects.
// Always validate important fields before using the data.
// =============================================================================

function validateUserData(user) {
    if (!user || typeof user !== 'object' || typeof user.name !== 'string') {
        throw new Error("Unexpected or invalid user data format.");
    }
}

async function handleUnexpectedDataExample() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        const data = await response.json();

        validateUserData(data); // Manually check for required fields

        console.log("User Name:", data.name);
    } catch (error) {
        console.error("Unexpected Data Error:", error.message);
    }
}

// =============================================================================
// 5. Create a Reusable Fetch Utility Function
// ----------------------------------------------------------------------------
// This function handles:
// - HTTP errors
// - Network errors
// - Content type checking
// - Optional structure validation
// =============================================================================

function getHttpErrorMessage(status) {
    switch (status) {
        case 400: return "Bad request. Please check your input.";
        case 401: return "Unauthorized. Please log in.";
        case 403: return "Forbidden. You don’t have access.";
        case 404: return "Not found. The resource doesn’t exist.";
        case 500: return "Server error. Please try again later.";
        default: return `Unexpected error (status: ${status})`;
    }
}

async function fetchWithErrorsHandled(url, options = {}, validateFn = null) {
    try {
        const response = await fetch(url, options);

        // HTTP error check
        if (!response.ok) {
            throw new Error(getHttpErrorMessage(response.status));
        }

        // Ensure content type is JSON
        const contentType = response.headers.get("Content-Type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error("Expected JSON but received different content.");
        }

        const data = await response.json();

        // Optional structure check
        if (validateFn && typeof validateFn === "function") {
            validateFn(data);
        }

        return { data, error: null };
    } catch (error) {
        // Handle any error — HTTP, network, or parsing
        console.error("Fetch Error:", error.message);
        return { data: null, error: error.message };
    }
}

// =============================================================================
// 6. Use the Reusable Function
// ----------------------------------------------------------------------------

async function loadUser(userId) {
    const { data, error } = await fetchWithErrorsHandled(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {},
        validateUserData
    );

    if (error) {
        console.warn("User Load Failed:", error);
    } else {
        console.log("User Loaded Successfully:", data);
    }
}

loadUser(1);        // success
loadUser(9999);     // HTTP 404 error
loadUser("wrong");  // may result in malformed response

// =============================================================================
// Summary (Notes):
// ----------------------------------------------------------------------------
// Use response.ok to detect HTTP errors
// Use try...catch to handle network errors
// Check Content-Type before parsing JSON
// Manually validate critical fields in response data
// Centralize all logic in a reusable function
// Return consistent structure: { data, error }
// =============================================================================

// Quick Table To Recoll Error:--

// -----+------------- + -----------------------------------------------------------
// Code |Name          | Meaning & When It Occurs
// -----+------------- + -----------------------------------------------------------
// 1xx  |Informational | Request received, still processing. Rare in APIs.
//      |              | Example: 100 Continue, 101 Switching Protocols
// -----+------------- + -----------------------------------------------------------
// 2xx  |Success       | Request was successful.
//      |              | Example:
//      |              |   200 OK          – Success (GET, POST, etc.)
//      |              |   201 Created     – Resource created (POST)
//      |              |   204 No Content  – Success, no body returned
// -----+------------- + -----------------------------------------------------------
// 3xx  |Redirection   | Resource moved or needs further action.
//      |              | Example:
//      |              |   301 Moved Permanently – Resource moved to another URL
//      |              |   302 Found             – Temporary redirect
//      |              |   304 Not Modified     – Cached version is still valid
// -----+------------- + -----------------------------------------------------------
// 4xx  |Client Error  | Problem with the request (your code, bad input, no auth).
//      |              | Example:
//      |              |   400 Bad Request    – Malformed syntax or invalid input
//      |              |   401 Unauthorized   – Missing/invalid auth
//      |              |   403 Forbidden      – No permission
//      |              |   404 Not Found      – Resource doesn't exist
// -----+------------- + -----------------------------------------------------------
// 5xx  |Server Error  | Server failed to handle the request.
//      |              | Example:
//      |              |   500 Internal Server Error – Server crashed or bug
//      |              |   502 Bad Gateway          – Invalid response from upstream
//      |              |   503 Service Unavailable – Server busy or down
// -----+------------- + -----------------------------------------------------------
