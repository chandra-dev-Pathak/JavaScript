// singleton
// Object.create

// Object Itreals 
const jsUser = {
    name: "Raghaw",
    age: 24,
    "Full Name": "Raghaw Pathak",
    location: "Gwalior",
    isLogin: true,
    hobby: ["Gaming", "Riding"]
};

// Way to call Obejct ===>>>  

console.log(jsUser.name); // Can't Acces Full Name by this way
console.log(jsUser["location"]);
console.log(jsUser["Full Name"]);

// Update Data 

jsUser.name = "Chandra Dev Pathak"
console.log(jsUser["name"]);

// function in Object for Object 

jsUser.greetingOne = function () {
    console.log(`Hello World from Object`);
}

jsUser.stdHobby = function () { // Acces by this Keyword value Pair Of object
    console.log(`Hobby of Std ${this["Full Name"]} is ${this.hobby}`);
}

console.log(jsUser.greetingOne());
console.log(jsUser.stdHobby());

// Deleting a property form object
delete jsUser.isLogin;
console.log(jsUser);


// Don't Want Anyone change Date Frezz Method

Object.freeze(jsUser); // frezz Object no Changes Happen Now
jsUser.name = "Amitab Bachan"
console.log(jsUser["name"]);


// Nested Objects
const student = {
    name: "Raghaw",
    marks: {
        math: 90,
        science: 85
    }
};

// Ways To acces nested Object ==>>>

console.log(student.marks.science);
console.log(student["marks"]["math"]);
