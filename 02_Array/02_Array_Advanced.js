// ✅ Rest Parameter with Array – collects all arguments into an array
function printAll(...args) {
    console.log("All values:", args); // args is an array of all passed arguments
}
printAll(1, 2, 3, 4, "end");

// ✅ Destructuring with Rest – collects remaining values
const [first, second, ...others] = [100, 200, 800, 700, 300, 400];
console.log("First:", first);   // 100
console.log("Second:", second); // 200
console.log("Rest:", others);   // [300, 400]

// ✅ Spread in cloning – creates a shallow copy
const original = [1, 2, 3];
const clone = [...original]; // copy using spread
clone[0] = 99;

console.log("Original:", original); // [1, 2, 3] - remains unchanged
console.log("Clone:", clone);       // [99, 2, 3] - copy is modified

// ✅ Shallow copy issue with nested arrays
const nested = [1, [2, 3]];
const shallow = [...nested]; // shallow copy (nested arrays still refer to same memory)
shallow[1][0] = 999;

console.log("Nested:", nested); // [1, [999, 3]] - original is affected
console.log("Shallow:", shallow);

// ✅ Deep copy using JSON methods – works for basic types (no functions/dates)
const deepCopy = JSON.parse(JSON.stringify(nested));
nested[1][1] = 111; // change original after deep copy
console.log("Deep Copy:", deepCopy); // remains unaffected: [1, [999, 3]]

// ✅ flatten() – removes nested arrays (one or more levels)
let complex = [1, 2, [3, 4], [5, [6, 7]]];
console.log(complex.flat());    // [1, 2, 3, 4, 5, [6, 7]] - 1 level deep
console.log(complex.flat(2));   // [1, 2, 3, 4, 5, 6, 7] - 2 levels deep
console.log(complex.flat(Infinity));   // [1, 2, 3, 4, 5, 6, 7] - All levels deep

// ✅ fill() – fills all or part of an array with a static value
let marks = new Array(5).fill(0); // creates [0, 0, 0, 0, 0]
console.log(marks);

marks.fill(1, 2); // replaces from index 2 to end with 1 → [0, 0, 1, 1, 1]
console.log(marks);

// ✅ copyWithin() – copies part of array to another index (in-place)
let nums = [10, 20, 30, 40, 50];
nums.copyWithin(0, 3); // copy from index 3 to beginning → [40, 50, 30, 40, 50]
console.log(nums);

// ✅ find() – returns the first matching element
const scores = [10, 25, 30, 50];
let found = scores.find((val) => val > 20); // finds 25
console.log(found);

// ✅ some() / every() – test conditions on array
console.log(scores.some(val => val > 40));  // true (50 > 40 exists)
console.log(scores.every(val => val > 5));  // true (all values > 5)

// ✅ indexOf() – gives index or -1 if not found
// ✅ includes() – checks if value exists
let brands = ["Nike", "Adidas", "Puma"];
console.log(brands.indexOf("Adidas")); // 1
console.log(brands.includes("Reebok")); // false

// ✅ reverse() – reverses array in-place
brands.reverse(); // modifies original array
console.log("Reversed:", brands);

// ✅ sort() – alphabetical by default (ASCII order)
let letters = ["b", "d", "a"];
letters.sort(); // sorts alphabetically → [ 'a', 'b', 'd' ]
console.log(letters);

// ✅ Numeric sort – custom sort function needed
let nums2 = [100, 5, 25];
nums2.sort((a, b) => a - b); // ascending order
console.log(nums2); // [5, 25, 100]
