// async function fetchWithLoopRetry(url, maxRetries = 3) {
//     for (let i = 1; i <= maxRetries; i++) {
//         try {
//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`HTTP Error: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Success:", data);
//             return data; // Done

//         } catch (error) {
//             console.warn(`Failed retry ${i}:`, error.message);

//             if (i === maxRetries) {
//                 console.error("All retries failed.");
//             }
//         }
//     }
// }



// const testURL = "https://jsonplaceholder.typicode.com/posts"; // Working
// // const testURL = "https://jsonplaceholder.typicode.com/INVALID"; // Test error/retry

// fetchWithLoopRetry(testURL, 3)

fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
})