// ============================================================================
// POST Requests Using Fetch
// ============================================================================

// ---------------------------------------------------------------------------
//  What is a POST Request?
// - A POST request is used to send data to a server (e.g., create a new item).
// - Unlike GET, it includes a body with data and uses the 'POST' method.
// - Usually used to submit forms, user data, or API requests.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
//  Basic Structure of POST with fetch():
//
// fetch(url, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data)
// })
// ---------------------------------------------------------------------------


// =============================================================================
// 1. POST Request Using async/await + try...catch (with explanation)
// =============================================================================

async function createPostAsync(postData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tells the server we’re sending JSON
            },
            body: JSON.stringify(postData) // Convert JS object to JSON string
        });

        // Handle HTTP errors manually
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Ensure response is JSON
        const contentType = response.headers.get('Content-Type') || '';
        if (!contentType.includes('application/json')) {
            throw new Error('Invalid response format: Expected JSON');
        }

        const data = await response.json();
        console.log('Post created successfully (async/await):', data);

    } catch (error) {
        console.error('Error during POST (async/await):', error.message);
    }
}

const newPost = {
    title: 'Post from async/await',
    body: 'This is the content of the post',
    userId: 1
};

createPostAsync(newPost);


// =============================================================================
// 2. POST Request Using .then().catch() (Promise Chaining)
// =============================================================================

const anotherPost = {
    title: 'Post using .then()',
    body: 'This post uses promise chaining.',
    userId: 2
};

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(anotherPost)
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Post created successfully (.then):', data);
    })
    .catch(error => {
        console.error('Error during POST (.then):', error.message);
    });


// =============================================================================
// 3. Reusable POST Utility Function (Modular Approach)
// =============================================================================

function getHttpErrorMessage(status) {
    switch (status) {
        case 400: return "Bad request. Check your input.";
        case 401: return "Unauthorized access.";
        case 403: return "Forbidden request.";
        case 404: return "Endpoint not found.";
        case 500: return "Internal server error.";
        default: return `Unexpected error (status: ${status})`;
    }
}

async function postWithHandler(url, payload, validateFn = null) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(getHttpErrorMessage(response.status));
        }

        const contentType = response.headers.get('Content-Type') || '';
        if (!contentType.includes('application/json')) {
            throw new Error('Expected JSON response but got something else.');
        }

        const data = await response.json();

        if (validateFn && typeof validateFn === 'function') {
            validateFn(data);
        }

        return { data, error: null };
    } catch (error) {
        console.error('POST Error:', error.message);
        return { data: null, error: error.message };
    }
}


// =============================================================================
// 4. Validation and Usage with Reusable POST Function
// =============================================================================

function validatePostResponse(post) {
    if (!post || typeof post !== 'object' || typeof post.id !== 'number') {
        throw new Error('Invalid post data returned from server.');
    }
}

async function createPostUsingUtility() {
    const postData = {
        title: 'Reusable POST',
        body: 'This post uses a reusable fetch utility function.',
        userId: 3
    };

    const { data, error } = await postWithHandler(
        'https://jsonplaceholder.typicode.com/posts',
        postData,
        validatePostResponse
    );

    if (data) {
        console.log('Post created successfully (reusable):', data);
    } else {
        console.warn('Failed to create post:', error);
    }
}

createPostUsingUtility();


// =============================================================================
// Summary Notes
// =============================================================================
//
// - POST is used to send data to the server.
// - Always stringify the payload using JSON.stringify()
// - Always set 'Content-Type': 'application/json' in headers.
// - Always check response.ok to catch HTTP errors.
// - Handle parsing errors and unexpected data shape.
// - You can use either async/await or .then().catch() — both are valid.
// - A reusable function makes code cleaner and easier to maintain.
//
// =============================================================================
