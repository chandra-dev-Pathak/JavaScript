// JavaScript While and Do...While Loop Examples

// 1. While Loop - Basic: Print numbers from 1 to 5
let i = 1;
while (i <= 5) {
    console.log("While Loop Count:", i);
    i++;
}

// 2. While Loop - Reverse Count from 5 to 1
let j = 5;
while (j >= 1) {
    console.log("While Loop Reverse:", j);
    j--;
}

// 3. While Loop with Break
let k = 1;
while (k <= 10) {
    if (k === 4) {
        console.log("Breaking at k =", k);
        break;
    }
    console.log("k =", k);
    k++;
}

// 4. While Loop with Continue
let l = 0;
while (l < 5) {
    l++;
    if (l === 3) {
        console.log("Skipping l =", l);
        continue;
    }
    console.log("l =", l);
}

// 5. Do...While Loop - Basic: Print numbers from 1 to 5
let m = 1;
do {
    console.log("Do While Count:", m);
    m++;
} while (m <= 5);

// 6. Do...While Loop - Condition false initially (still runs once)
let n = 10;
do {
    console.log("This runs at least once even if condition is false. n =", n);
    n++;
} while (n < 5);

// 7. Do...While Loop with Continue
let o = 0;
do {
    o++;
    if (o === 2) {
        console.log("Skipping o =", o);
        continue;
    }
    console.log("o =", o);
} while (o < 5);
