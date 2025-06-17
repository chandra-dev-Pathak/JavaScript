// Function

// Simple function 

function sayhello() {
    console.log(`Hello world`);
}

sayhello();

// Function with Value of number

function sum(num1, num2) {
    let total = num1 + num2;
    return total;
}
console.log(sum(10, 52));

// Function with String Value

function loginPage(username) {
    return `${username} Is loged In..`
}

console.log(loginPage("Raghaw"));

// Function with validation

function singupPage(username) {
    if (!username) {
        return `Enter username...`
    }
    return `${username} Is loged In..`
}

console.log(singupPage()); // no pass username

// Function with Default value

function std(name = "Arun") { // default Pass Value
    return name;
}

console.log(std()); // no pass username

// Fucntion To handel more then one Value in One parameter 

function passMoreval(...val) { // To Handel Rest value
    return val;
}

console.log(passMoreval(10, "INNU", true));
