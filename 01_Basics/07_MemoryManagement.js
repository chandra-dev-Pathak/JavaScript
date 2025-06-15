// ===============================
// 📌 JavaScript Memory Management
// ===============================

// 🔹 Stack Memory: Used for primitive data types
// 🔹 Heap Memory: Used for non-primitive (reference) data types

// ✅ Example 1: Primitive Type stored in Stack
let name1 = "Raghaw";
let name2 = name1; // Copies value

name2 = "Pathak";

console.log("Primitive Example:");
console.log("name1:", name1); // "Raghaw"
console.log("name2:", name2); // "Pathak"
// name1 is unchanged because primitives are copied by value

// ✅ Example 2: Reference Type stored in Heap
let user1 = {
    name: "Raghaw",
    age: 21,
};

let user2 = user1; // Both point to the same object in heap

user2.name = "Pathak";

console.log("\nReference Example:");
console.log("user1:", user1); // name: "Pathak"
console.log("user2:", user2); // name: "Pathak"
// Both user1 and user2 reflect the change because they point to same memory

// 🔍 Visual Explanation:
// Stack: [name1 -> "Raghaw"]   [name2 -> "Pathak"]
// Heap:  {name: "Pathak", age: 21} <- shared between user1 and user2

// ✅ How to clone object properly (Avoid shared heap reference)
let user3 = {
    name: "Aman",
    age: 22,
};

// Shallow copy using spread operator
let user4 = { ...user3 };
user4.name = "Ravi";

console.log("\nCloning Example:");
console.log("user3:", user3); // name: "Aman"
console.log("user4:", user4); // name: "Ravi"
// Now user3 and user4 are separate objects in heap

// ===============================
// 🔁 Summary
// ===============================
// ✅ Stack = Fast, stores primitive types (number, string, boolean, etc.)
// ✅ Heap = Stores reference types (object, array, function)
// ✅ Primitive => Copied by Value (Stored separately)
// ✅ Reference => Copied by Reference (Points to same memory)
// ✅ Use spread (...) or Object.assign to avoid reference issues
