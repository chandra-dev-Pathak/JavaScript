// ============================================================================
// NOTES: Understanding Loops with Async/Await in JavaScript (Deep Explanation)
// ============================================================================

// Some loops in JavaScript do not work correctly with async/await.
// This is because they are synchronous in nature and do not pause for asynchronous tasks.
// These loops start all async tasks immediately and do not wait for them to complete.

// This document explains:
// - Which loops DO NOT work with async/await (and why)
// - Which loops DO work with async/await (and how)
// - The correct patterns and usage for reliable asynchronous looping
// - Clear, separated code blocks for each loop type with full explanations

// --------------------------------------------------------------------------------
// SECTION 1: Loops That DO NOT Work Properly with Async/Await
// --------------------------------------------------------------------------------

// ------------------------
// 1. forEach (Not Working)
// ------------------------
{
    function delay(time, value) {
        return new Promise(res => setTimeout(() => res(value), time));
    }

    const data = [1, 2, 3];

    data.forEach(async (item) => {
        await delay(1000, item);
        console.log("forEach:", item);
    });

    console.log("forEach: Done (printed too early)");

    // EXPLANATION:
    // forEach is synchronous and does not wait for the async callback to finish.
    // The loop finishes immediately, and "Done" is printed right away.
    // All delays start in parallel, not sequentially.
}

// ---------------------
// 2. map (Not Working Alone)
// ---------------------
{
    function delay(time, value) {
        return new Promise(res => setTimeout(() => res(value * 10), time));
    }

    const data = [1, 2, 3];

    const promises = data.map(async (item) => {
        return await delay(1000, item);
    });

    console.log("map (without await):", promises);

    // CORRECT WAY using Promise.all:
    Promise.all(promises).then(results => {
        console.log("map (with await):", results);
    });

    // EXPLANATION:
    // map itself does not wait for async results.
    // It creates an array of promises.
    // Use Promise.all() to wait for all results to finish.
}

// ------------------------
// 3. filter (Not Working)
// ------------------------
{
    function isEvenAsync(n) {
        return new Promise(res => setTimeout(() => res(n % 2 === 0), 500));
    }

    const numbers = [1, 2, 3, 4];

    const filtered = numbers.filter(async (n) => {
        return await isEvenAsync(n);
    });

    console.log("filter (invalid):", filtered); // This will be array of promises

    // CORRECT WAY using manual loop:
    async function filterAsync(arr, asyncCallback) {
        const results = [];
        for (const item of arr) {
            if (await asyncCallback(item)) {
                results.push(item);
            }
        }
        return results;
    }

    filterAsync(numbers, isEvenAsync).then(res => {
        console.log("filter (fixed):", res);
    });

    // EXPLANATION:
    // filter expects a boolean value immediately.
    // An async callback returns Promise<boolean>, not boolean.
    // Custom loop required to make filtering work properly with async.
}

// ------------------------
// 4. find (Not Working)
// ------------------------
{
    function matchAsync(n) {
        return new Promise(res => setTimeout(() => res(n === 3), 300));
    }

    const list = [1, 2, 3, 4];

    const found = list.find(async (n) => {
        return await matchAsync(n);
    });

    console.log("find (invalid):", found); // Just returns first item, not correct

    // CORRECT WAY:
    async function findAsync(arr, asyncPredicate) {
        for (const item of arr) {
            if (await asyncPredicate(item)) return item;
        }
        return undefined;
    }

    findAsync(list, matchAsync).then(result => {
        console.log("find (fixed):", result);
    });

    // EXPLANATION:
    // find expects true/false right away.
    // An async callback returns Promise<boolean>.
    // Custom for...of loop ensures correct behavior.
}

// ------------------------
// 5. reduce (Not Working Properly)
// ------------------------
{
    function addAsync(a, b) {
        return new Promise(res => setTimeout(() => res(a + b), 300));
    }

    const numbers = [1, 2, 3, 4];

    const result = numbers.reduce(async (accPromise, curr) => {
        const acc = await accPromise;
        return await addAsync(acc, curr);
    }, Promise.resolve(0));

    result.then(sum => console.log("reduce (chained):", sum));

    // ALTERNATE CLEAR WAY:
    async function reduceAsync(arr, reducer, initialValue) {
        let acc = initialValue;
        for (const item of arr) {
            acc = await reducer(acc, item);
        }
        return acc;
    }

    reduceAsync(numbers, addAsync, 0).then(sum => {
        console.log("reduce (fixed):", sum);
    });

    // EXPLANATION:
    // Async in reduce becomes hard to track, not recommended.
    // for...of is more readable and easier to maintain.
}

// --------------------------------------------------------------------------------
// SECTION 2: Loops That DO Work Properly with Async/Await
// --------------------------------------------------------------------------------

// ------------------------
// 1. for...of (Working)
// ------------------------
{
    function delay(time, item) {
        return new Promise(res => setTimeout(() => res(item), time));
    }

    const items = [1, 2, 3];

    async function runSequentially() {
        for (const item of items) {
            await delay(1000, item);
            console.log("for...of:", item);
        }
        console.log("for...of: Done (after all items)");
    }

    runSequentially();

    // EXPLANATION:
    // for...of loop fully supports await inside it.
    // Execution pauses until each await is complete.
    // Best for sequential processing of async logic.
}

// ------------------------
// 2. Traditional for loop (Working)
// ------------------------
{
    function delay(time, value) {
        return new Promise(res => setTimeout(() => res(value), time));
    }

    const data = [10, 20, 30];

    async function runWithFor() {
        for (let i = 0; i < data.length; i++) {
            const result = await delay(1000, data[i]);
            console.log("for loop:", result);
        }
        console.log("for loop: Done");
    }

    runWithFor();

    // EXPLANATION:
    // Standard for loop works like for...of.
    // You have access to index and full control over iteration.
}

// ------------------------
// 3. while loop (Working)
// ------------------------
{
    function delay(time, value) {
        return new Promise(res => setTimeout(() => res(value), time));
    }

    const items = [5, 6, 7];

    async function runWithWhile() {
        let index = 0;
        while (index < items.length) {
            const result = await delay(1000, items[index]);
            console.log("while loop:", result);
            index++;
        }
        console.log("while loop: Done");
    }

    runWithWhile();

    // EXPLANATION:
    // While loop works with async as long as it is inside an async function.
}

// ============================================================================
// FINAL NOTES:
// ============================================================================

// Loops That DO NOT Work Well with Async/Await:
// - forEach
// - map (without Promise.all)
// - filter
// - find
// - reduce

// Loops That DO Work Well with Async/Await:
// - for...of
// - traditional for
// - while

// Best Practice:
// - Always wrap await logic in an async function
// - Use for...of when you need to await in a loop
// - Avoid async inside array iteration methods unless handled properly
