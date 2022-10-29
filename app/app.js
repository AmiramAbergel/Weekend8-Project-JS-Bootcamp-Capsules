const drawUser = async () => {
    const usersDataArr = await getData();
    const plot = document.querySelector(".container .plot");
    const ulParent = document.createElement("ul");
    usersDataArr.forEach((user) => {
        const userContainer = document.createElement("li");
        userContainer.classList.add(`${user.id}`);
        for (const [key, value] of Object.entries(user)) {
            const contentContainer = document.createElement("div");
            contentContainer.classList.add(`${key}`);
            const content = document.createElement("p");
            content.textContent = value;
            contentContainer.appendChild(content);
            userContainer.appendChild(contentContainer);
        }
        ulParent.appendChild(userContainer);
    });
    console.log(ulParent);
    plot.appendChild(ulParent);
    // const userID = document.createElement("div");
    // const userName = document.createElement("div");
    // const userCapsule = document.createElement("div");
    // const userAge = document.createElement("div");
    // const userCity = document.createElement("div");
    // const userGender = document.createElement("div");
    // const userHobby = document.createElement("div");
};

const searchUser = async () => {
    const usersDataArr = await getData();
    for (const user in usersDataArr) {
        if (Object.hasOwnProperty.call(user, key)) {
            const element = object[key];
        }
    }
};

const handleInput = (event) => {
    const input = event.target.value;
    console.log(input);
};
const input = document.querySelector("input");
input.addEventListener("input", handleInput);
//-------------------------------------------
// Loading spinner
const setSpinner = (bool) => {};
//----------------------------------------
const constructFromData = (userObj) => {
    const user = {
        id: userObj.id,
        name: userObj.firstName,
        lastName: userObj.lastName,
        capsule: userObj.capsule,
        age: userObj.age,
        city: userObj.city,
        gender: userObj.gender,
        hobby: userObj.hobby,
    };
    return user;
};

const arrangeData = (arr) => {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        const element = constructFromData(arr[i]);
        res.push(element);
    }
    return res;
};

const fetchData = async (url) => {
    const mainDB = url;
    try {
        const response = await fetch(mainDB);
        if (response.status === 404) {
            throw `Not found, ERROR ${response.status}`;
        }
        const responseRes = await response.json();
        return responseRes;
    } catch (error) {
        console.error(`Could not get data: ${error}`);
    }
};

const extractUserByID = async (arr) => {
    let res = [];
    for (let user of arr) {
        let userURL = `https://capsules7.herokuapp.com/api/user/${user.id}`;
        const f = fetchData(userURL);
        res.push(f);
    }
    //let fRes = await res;
    let fRes = await Promise.all(res);
    // if (fRes.data.Error) {    // should handle error option!!
    //     return [];
    // }
    return fRes;
};

const getData = async () => {
    const group1URL = `https://capsules7.herokuapp.com/api/group/one`;
    const group2URL = `https://capsules7.herokuapp.com/api/group/two`;
    const group1Response = fetchData(group1URL);
    const group2Response = fetchData(group2URL);
    const results2Groups = await Promise.all([group1Response, group2Response]);
    const mergeData = results2Groups[0].concat(results2Groups[1]); // arr of objs
    console.log(mergeData);
    const users = await extractUserByID(mergeData);
    console.log(users);
    const arrangedUsers = arrangeData(users); //Not mandatory(just for practice)
    return arrangedUsers;
};
//getData();

drawUser();
