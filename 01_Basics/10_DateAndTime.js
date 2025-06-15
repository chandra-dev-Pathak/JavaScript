// ====================================================
// JavaScript Date and Time (Basic to Advanced)
// ====================================================

// 1. Create Current Date
const now = new Date();
console.log("Current Date and Time:", now); // full timestamp

// 2. Create Date using different ways
const d1 = new Date("2023-12-25");            // YYYY-MM-DD
const d2 = new Date(2023, 11, 25);            // Year, Month(0-based), Day
const d3 = new Date(2023, 11, 25, 10, 30, 0); // Year, Month, Day, Hr, Min, Sec
console.log(d1, d2, d3);

// 3. Get individual parts
console.log("Year:", now.getFullYear());         // e.g. 2025
console.log("Month:", now.getMonth());           // 0 = Jan, 11 = Dec
console.log("Date:", now.getDate());             // Day of month
console.log("Day of Week:", now.getDay());       // 0 = Sunday, 6 = Saturday
console.log("Hours:", now.getHours());
console.log("Minutes:", now.getMinutes());
console.log("Seconds:", now.getSeconds());

// 4. Set individual parts
let newDate = new Date();
newDate.setFullYear(2030);
newDate.setMonth(0); // January
newDate.setDate(15);
console.log("Modified Date:", newDate);

// 5. Date to String Formats
console.log("toString:", now.toString());
console.log("toDateString:", now.toDateString());
console.log("toTimeString:", now.toTimeString());
console.log("toISOString:", now.toISOString()); // Useful in APIs

// 6. Timestamps
console.log("Milliseconds since Jan 1, 1970:", now.getTime());
console.log("Current timestamp using Date.now():", Date.now());

// 7. Compare Dates
let date1 = new Date("2024-01-01");
let date2 = new Date("2025-01-01");

if (date1 < date2) {
    console.log("date1 comes before date2");
}

// 8. Calculate Difference in Days
let msDiff = date2 - date1; // in milliseconds
let dayDiff = msDiff / (1000 * 60 * 60 * 24); // ms -> sec -> min -> hr -> day
console.log("Days difference:", dayDiff);

// 9. Custom Format (DD-MM-YYYY)
function formatDate(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    let yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}
console.log("Formatted Date:", formatDate(now));

// 10. Time Zones
console.log("Locale String:", now.toLocaleString()); // based on your system locale
console.log("UTC String:", now.toUTCString());

// 11. Advanced: Timer with Date
const start = new Date();
// do something...
for (let i = 0; i < 1e6; i++) { } // delay
const end = new Date();
console.log("Time taken (ms):", end - start);