// ============================================================================
// DELETE Requests Using Fetch with Error Handling
// ============================================================================

// ---------------------------------------------------------------------------
//  Definitions:
// ---------------------------------------------------------------------------
// DELETE => Used to delete a resource (usually identified by ID in the URL).
// It tells the server to remove that resource entirely.
//
// Most DELETE requests do not include a body.
// Some custom APIs may allow sending a body to specify specific fields to remove.
//
// HTTP status codes often returned:
// 204 => Success, no content returned
// 200 => Success, some confirmation or object returned
// 404 => Resource not found
// ---------------------------------------------------------------------------


// ============================================================================
// 1. DELETE Example — Remove Full Resource by ID
// ============================================================================

async function deleteUserById() {
    const userId = 2; // ID in URL to specify which user to delete

    try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json" // optional if no body is sent
            }
        });

        if (!response.ok) {
            throw new Error(`DELETE failed with status: ${response.status}`);
        }

        // Most APIs return 204 No Content for successful deletion
        if (response.status === 204) {
            console.log("User deleted successfully (No Content returned)");
        } else if (response.status === 200) {
            const result = await response.json();
            console.log("User deleted successfully with response:", result);
        } else {
            console.log("Unexpected response code:", response.status);
        }

    } catch (error) {
        console.error("DELETE Error:", error.message);
    }
}

deleteUserById();


// ============================================================================
// 2. Custom DELETE with Body (If API Allows Specific Field Removal)
// ============================================================================

async function deleteUserFields() {
    const userId = 2;

    const fieldsToRemove = {
        removeFields: ["job", "isAdmin"]
    };

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fieldsToRemove) // only if the API supports body in DELETE
        });

        if (!response.ok) {
            throw new Error(`DELETE with body failed: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type") || "";
        if (response.status === 204) {
            console.log("Fields deleted (No Content)");
        } else if (contentType.includes("application/json")) {
            const result = await response.json();
            console.log("Partial field deletion success:", result);
        }

    } catch (error) {
        console.error("Error in field-specific DELETE:", error.message);
    }
}

// NOTE: Most public APIs will not support DELETE bodies. This is backend-specific.
// deleteUserFields();


// ============================================================================
// (Deep Understanding and Notes)
// ============================================================================

/*

-------------------------------
WHAT IS DELETE?
-------------------------------
- Removes a resource completely (e.g., user, post, comment).
- You cannot use it to remove part of a resource like a single field.
- For removing fields, use PATCH with an updated object (without that field).

-------------------------------
CAN DELETE HAVE A BODY?
-------------------------------
- Technically allowed by HTTP spec, but:
    - Most APIs ignore it
    - You need backend support for it
- Only use body in DELETE if API docs say so

-------------------------------
STATUS CODES:
-------------------------------
- 204 No Content => Success, no response body
- 200 OK         => Success, with confirmation message or deleted object
- 404 Not Found  => ID not found or already deleted
- 401/403        => Unauthorized or forbidden

-------------------------------
WHERE IS ID USED?
-------------------------------
- Always in URL path: `/users/2`, `/posts/5`
- DELETE never needs `id` in body unless backend specifically says so

-------------------------------
RECOMMENDATIONS:
-------------------------------
- Use try...catch for error handling
- Use response.ok to handle HTTP errors manually
- Use DELETE for full resource deletion
- Use PATCH if you want to update/remove a field
- Don’t assume DELETE body will work unless API confirms support


-------------------------------
Full Resource Deletion (DELETE):
-------------------------------
Server object:
{
    id: 2,
    name: "Raghav",
    job: "Engineer"
}

You send:
DELETE /users/2

Final Server State:
User with ID 2 is gone entirely


--------------------------------------------------
Field Deletion (NOT via DELETE) Use PATCH instead:
--------------------------------------------------
*/


// ============================================================================
// Status Code
// ============================================================================

/*
Method | Action              | Typical Status
-------|---------------------|--------------------------
GET    | Fetch data          | 200
POST   | Create new data     | 201 (or 200)
PUT    | Full update         | 200 or 201 (if server creates new)
PATCH  | Partial update      | 200
DELETE | Full delete         | 204 (No Content) or 200 (message)

*/
