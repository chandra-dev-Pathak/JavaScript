// ============================================================================
// PUT and PATCH Requests Using Fetch with Error Handling
// ============================================================================

// ---------------------------------------------------------------------------
//  Definitions:
// ---------------------------------------------------------------------------
// PUT  => Replaces the entire resource (send full object, all fields).
// PATCH => Updates only specific fields of the resource (partial update).
//
// PUT/PATCH usually require the resource ID in the URL (e.g. /users/1)
//
// These methods are used in RESTful APIs to modify existing data.
// ---------------------------------------------------------------------------

// ============================================================================
// 1. PUT Example — Full Update (Replaces All Fields)
// ============================================================================

async function updateUserWithPUT() {
    const userId = 2; // ID goes in the URL, not in the body

    // Full object expected — missing fields may get erased
    const fullUserData = {
        name: "Updated via PUT",
        job: "Engineer"
        // If 'job' or other fields are required by API, include them
    };

    try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fullUserData)
        });

        // Manual HTTP error handling
        if (!response.ok) {
            throw new Error(`PUT failed with status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error("Expected JSON response");
        }

        const result = await response.json();
        console.log("PUT Success:", result);
    } catch (error) {
        console.error("PUT Error:", error.message);
    }
}

updateUserWithPUT();


// ============================================================================
// 2. PATCH Example — Partial Update (Only Sends Changed Fields)
// ============================================================================

async function updateUserWithPATCH() {
    const userId = 2; // Again, ID in the URL

    // Only the fields you want to change
    const partialUpdate = {
        name: "Patched Name Only"
        // 'job' or other properties not sent won't be erased
    };

    try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partialUpdate)
        });

        if (!response.ok) {
            throw new Error(`PATCH failed with status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error("Expected JSON response");
        }

        const result = await response.json();
        console.log("PATCH Success:", result);
    } catch (error) {
        console.error("PATCH Error:", error.message);
    }
}

updateUserWithPATCH();


// ============================================================================
// (Deep Understanding)
// ============================================================================

/*
-------------------------------
WHAT IS PUT?
-------------------------------
- PUT replaces the **entire resource** on the server.
- All expected fields must be sent in the body.
- If a field is missing, it may be removed from the server.
- You should use PUT when:
    - You want to replace all data
    - You know the full structure
    - The backend requires a complete object

-------------------------------
WHAT IS PATCH?
-------------------------------
- PATCH updates **only selected fields**.
- It modifies just the fields you send in the body.
- Ideal for user profile edits, toggling a flag, etc.
- Safer if you don’t know the full structure.

-------------------------------
WHERE IS THE ID USED?
-------------------------------
- ID always goes in the URL for both PUT and PATCH.
- Example: /users/1
- You do not need to pass `id` in the body unless the API explicitly requires it.

-------------------------------
RECOMMENDATIONS:
-------------------------------
Always use `response.ok` to handle HTTP status manually
Always check if the response is JSON before parsing
Wrap all logic in `try...catch`
PUT = Replace, PATCH = Modify
Use PATCH when working with optional or user-editable data

*/

// Concept want to know
// ------------------------------------------------------------------------------------------------

// "If a field is missing, it may be removed from the server."

// Server object is:
// {
//     name: "Raghav",
//     age: 25,
//     job: "Engineer"
// }

// You send PUT :
// {
//     name: "Raghav",
//     age: 26
// }

// Server removed job field Final object:
// {
//     name: "Raghav",
//     age: 26
// }

// ---------------------------------------------------------------------------------------

// "job or other properties not sent won't be erased"

// Server object is:
// {
//     name: "Raghav",
//     age: 25,
//     job: "Engineer"
// }

// You send PATCH :
// {
//     age: 26
// }

// Server final object:
// {
//     name: "Raghav",
//     age: 26,
//     job: "Engineer"
// }

// ----------------------------------------------------------------------------------------------

// Method | Action         | Status
// ------ | -------------- | ------------------------------------------
// GET    | Fetch data     | 200
// PUT    | Update/replace | 200 or 201(when sever Alocates new id)
// PATCH  | Partial update | 200
// POST   | Create new     | 201 (or 200 if not created just processed)
