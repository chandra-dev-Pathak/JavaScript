// Chain Sequentially Work step by step When one Await settled then goes to next Await

function stepOne() {
    return new Promise((res) => {
        setTimeout(() => res(`Step 1 Done`), 1000);
    });
}

function stepTwo() {
    return new Promise((res) => {
        setTimeout(() => res(`Step 2 Done`), 2000);
    });
}

function stepThree() {
    return new Promise((res) => {
        setTimeout(() => res(`Step 3 Done`), 3000);
    });
}

// Way One to Use try/catch block:--- Rap in one try-catch block

async function runAllSteps() {
    try {
        const s1 = await stepOne(); // when this await settled then goes next
        const s2 = await stepTwo(); // also this await settled then goes next
        const s3 = await stepThree(); // this last await
        console.log(s1);
        console.log(s2);
        console.log(s3);
    } catch (err) {
        console.log("Something failed:", err);
    }
}

runAllSteps();

// Way Two to Use try/catch block:--- Rap in Saprate try-catch block
// More control to handel Error:--

// async function runAllSteps() {
//     try {
//         const s1 = await stepOne();
//         console.log(s1);
//     } catch (err) {
//         console.log("Something failed:", err);
//     }
//     try {
//         const s2 = await stepTwo();
//         console.log(s2);
//     } catch (err) {
//         console.log("Something failed:", err);
//     }
//     try {
//         const s3 = await stepThree();
//         console.log(s3);
//     } catch (err) {
//         console.log("Something failed:", err.message);
//     }
// }

// runAllSteps();

// --------------------------------------------------------------------------------

// Chain Parallel Execution:-
// When you need to run multiple Promises simultaneously, and their result is not dependent on each other, then use Promise.all() - all the Promises will run in parallel.

function wait(time, val) {
    return new Promise((res) => {
        setTimeout(() => {
            res(val);
        }, time);
    });
}

async function runParallel() {
    try {
        const promiseA = wait(1000, "A");
        const promiseB = wait(1000, "B");
        const promiseC = wait(1000, "C");

        const [a, b, c] = await Promise.all([promiseA, promiseB, promiseC]);

        console.log(a, b, c);
    } catch (error) {
        console.log(error);
    }

}

runParallel();

