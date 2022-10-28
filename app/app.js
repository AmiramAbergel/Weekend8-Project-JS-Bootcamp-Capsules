const input = document.querySelector("input");
input.addEventListener("input", handleInput);
const constructFromData = (userObj) => {
    const user = {
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
    console.log(arrangedUsers);
};

getData();
