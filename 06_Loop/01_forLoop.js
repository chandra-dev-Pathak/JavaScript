// JavaScript For Loop Examples - Basic to Advanced

// 1. Basic For Loop: Print numbers from 1 to 5
for (let i = 1; i <= 5; i++) {
    console.log("Count:", i);
}

// 2. Reverse For Loop: Print numbers from 10 to 1
for (let i = 10; i >= 1; i--) {
    console.log("Reverse Count:", i);
}

// 3. For Loop with Break: Stop loop when i is 3
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log("Breaking at i =", i);
        break;
    }
    console.log("i =", i);
}

// 4. For Loop with Continue: Skip when i is 2
for (let i = 1; i <= 5; i++) {
    if (i === 2) {
        console.log("Skiped");
        continue;
    }
    console.log("i =", i);
}

// 5. For Loop with Condition Inside: Print only even numbers between 1 to 10
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log("Even:", i);
    }
}

// 6. Nested For Loop: Multiplication table
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} * ${j} = ${i * j}`);
    }
}
