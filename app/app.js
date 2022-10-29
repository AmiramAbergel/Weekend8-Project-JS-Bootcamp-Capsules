const traverseUserData = (obj) => {
    let res = [];
    for (const [key, value] of Object.entries(obj)) {
        const contentContainer = document.createElement("div");
        contentContainer.classList.add(`${key}`);

        contentContainer.setAttribute("data-init", `${value}`);
        const content = document.createElement("p");
        content.textContent = value;
        contentContainer.appendChild(content);
        res.push(contentContainer);
    }
    return res;
};

const drawUser = async () => {
    const usersDataArr = await getData();
    const plot = document.querySelector(".container .plot");
    const ulParent = document.createElement("ul");
    usersDataArr.forEach((user) => {
        const userContainer = document.createElement("li");
        const removeBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn", "btn");
        editBtn.classList.add("editBtn", "btn");
        removeBtn.textContent = "Delete";
        editBtn.textContent = "Edit";
        userContainer.classList.add(`${user.id}`);
        removeBtn.addEventListener("click", removeRow);
        editBtn.addEventListener("click", editRow);
        const userContent = traverseUserData(user);
        userContainer.append(...userContent, removeBtn, editBtn);
        ulParent.appendChild(userContainer);
    });
    console.log(ulParent);

    plot.appendChild(ulParent);
};

const handleCancel = (event) => {
    const input = event.target;
    const userContainer = input.parentElement.querySelectorAll("p");
    console.log(userContainer);
    userContainer.forEach((data) => {
        data.textContent = data.parentElement.dataset.init;
    });
    input.style.display = "none";
    input.nextSibling.style.display = "none";
    const removeBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn", "btn");
    editBtn.classList.add("editBtn", "btn");
    removeBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    removeBtn.addEventListener("click", removeRow);
    editBtn.addEventListener("click", editRow);
    input.parentElement.append(removeBtn, editBtn);
};
const handleConfirm = (event) => {
    const input = event.target;
    manageNewInput(false, input.parentElement);
};

const removeRow = (event) => {
    const input = event.target;
    input.parentElement.style.display = "none";
};

let active = false;
const myFunc = (event) => {
    const input = event.target;
    console.dir(input);
    if (
        input &&
        !input.matches("li div.id p") &&
        !input.matches(".btn") &&
        input.matches("p")
    ) {
        console.log(input);
        input.focus();
        input.setAttribute("onblur", false);
        input.setAttribute("contenteditable", true);
    }
};
const manageNewInput = (bool, element) => {
    if (bool === true) {
        element.addEventListener("mousedown", myFunc);
    } else {
        element.removeEventListener("mousedown", myFunc);
        element.querySelectorAll("[contenteditable=true]").forEach((data) => {
            data.setAttribute("contenteditable", false);
            console.log(data);
        });
    }
};

const editRow = (event) => {
    const input = event.target;
    input.style.display = "none";
    input.previousSibling.style.display = "none";
    manageNewInput(true, input.parentElement);
    const cancelBtn = document.createElement("button");
    const confirmBtn = document.createElement("button");
    cancelBtn.classList.add("cancelBtn", "btn");
    confirmBtn.classList.add("confirmBtn", "btn");
    cancelBtn.textContent = "Cancel";
    confirmBtn.textContent = "Confirm";
    cancelBtn.addEventListener("mousedown", handleCancel);
    confirmBtn.addEventListener("mousedown", handleConfirm);
    input.parentElement.append(cancelBtn, confirmBtn);
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
