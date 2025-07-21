// When multiple asynchronous tasks need to be executed in sequence — one after the other — we use .then().

// We Use Chaining to out Form CallBack Hell

// Important Concept:-

// |Step           |What Happens
// |---------------|------------------------------------------------
// |** `.then()` **|** Returns value → goes to next `.then()` **
// |`.then()` chain|You can keep returning transformed/filtered data
// |`.catch()`     |Runs if any `.then()` throws error
// |`.finally()`   |Runs always (success or error)                  

let promise = new Promise((res, rej) => {
    let userData = {
        name: "Raghaw",
        age: 24,
        email: "cdp.chandra.dev@gmail.com",
        isLogin: true,
    };

    if (userData.isLogin === true) {
        res(userData);
    } else {
        rej("Error: User is not logged in");
    }
});

promise.then((userData) => {
    console.log(userData);
    return userData.name;
}).then((username) => {
    return username.toUpperCase();
}).then((UpperUserName) => {
    console.log(UpperUserName);
}).catch((rej) => {
    console.log(rej);
}).finally(() => {
    console.log("Promise Compelted");
})

// ==========================  Real World Case  =============================>>>>>

let userFound = true;

let getUser = () => {

    return new Promise((res, rej) => {


        if (userFound) {
            res({ name: "Raghaw", id: "101" });
        } else {
            rej("User is not Found");
        }

    })

}

let getPost = (userId) => {

    return new Promise((res, rej) => {

        if (userId) {
            res([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        } else {
            rej("UserID is not Found");
        }

    })

}

let getPost_count = (posts) => {

    return new Promise((res, rej) => {

        if (posts) {
            console.log(`User has ${posts.length} posts.`);
            res();
        } else {
            rej("No One Posts Posted")
        }

    })

}

getUser().then((userData) => {
    console.log(userData.name);
    return getPost(userData.id);
}).then((posts) => {
    return getPost_count(posts);
}).then(() => {
    console.log("Name, Post are working perfect Without Error");
}).catch((rej) => {
    console.log(rej);
}).finally(() => {
    console.log("Promise Compeleted");
})