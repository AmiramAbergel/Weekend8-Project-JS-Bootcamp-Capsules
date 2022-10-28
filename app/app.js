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
        throw `ERROR! `;
    }
};

const extractUserByID = async (arr) => {
    let res = [arr.length];
    for (let user of arr) {
        const f = fetchData(user.id);
        res.push(f);
    }
    let fRes = await Promise.all(res);
    return fRes;
};

const getData = async () => {
    const group1URL = `https://capsules7.herokuapp.com/api/group/one`;
    const group2URL = `https://capsules7.herokuapp.com/api/group/two`;
    const userURL = `https://capsules7.herokuapp.com/api/user/003`;
    const group1Res = await fetchData(group1URL);
    const group2Res = await fetchData(group2URL);
    const dataGroup1 = group1Res; //arr of objs
    const dataGroup2 = group2Res; //arr of objs
    const mergeData = dataGroup1.concat(dataGroup2);
    console.log(dataGroup1);
    console.log(dataGroup2);
    console.log(mergeData);

    //const homeWorlds = await extractHomeWorlds(data);
    //return combineData(data, homeWorlds);
};

getData();
