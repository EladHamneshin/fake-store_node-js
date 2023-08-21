import jsonFile from "jsonfile";
import * as utils from './DLUtils.js';


let users = [];

//----------------------------- CRUD -----------------------------------

export function getUsers() {
    return utils.deepCopy(users);
}

export function getUserById(id) {
    const user = users.find(u => u.id === id);
    if (!user) 
        throw new Error(`User with id: "${id}" not found`);
    
    return utils.deepCopy(user);
}

export function addUser(user) {
    if(utils.isIdExist(users ,user.id))
        throw new Error(`User with id: "${user.id}" already exist`);

    if(isEmailExist(user.email))
        throw new Error(`User with email: "${user.email}" already exist`);

    users.push(utils.deepCopy(user));
    updateDb().catch(err => console.log(err));
}

export function updateUser(userId, user) {
    if(isEmailExist(user.email))
        throw new Error(`User with email: "${user.email}" already exist`);
    const index = utils.getObjIndexById(users ,userId);
    users[index] = {...user};
    updateDb().catch(err => console.log(err));
}

export function deleteUser(userId) {
    const index = utils.getObjIndexById(users ,userId);
    users.splice(index, 1);
    updateDb().catch(err => console.log(err));
}

export function isUserIdAdmin(userId) {
    const index = utils.getObjIndexById(users ,userId);
    return users[index].isAdmin;
}


function isEmailExist(email) {
    return users.some(u => u.email === email);
}

//----------------------- DB operatins -----------------------------
export function retriveDb() {
    return new Promise((resolve, reject) => {
        jsonFile.readFile("data/users.json", (err, obj) => {
            if (err) reject(err);
            else {
                users = obj.users;
                resolve();
            }
        });
    })
}

export function updateDb() {
    return jsonFile.writeFile("data/users.json", { users });
}