import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
import emailValidator from "email-validator";
import * as usersDL from "../DL/usersDL.js";


const passwordValidator = new PasswordValidator();
passwordValidator.is().min(8).has().uppercase().has().lowercase();

export function getUsers() {
    return usersDL.getUsers();
}

export function getUserById(id) {
    return usersDL.getUserById(id);
}

export async function addUser(user) {
    if(!emailValidator.validate(user.email))
        throw new Error("email is not valid");

    if(!passwordValidator.validate(user.password))
        throw new Error("password is not valid");

    const hash = await bcrypt.hash(user.password, 10);
    user = { ...user, password: hash };
    usersDL.addUser(user);
    return user;
}

export function deleteUser(id) {
    usersDL.deleteUser(id);
}

export async function updateUser(id ,user) {
    user.password = await bcrypt.hash(user.password, 10);
    usersDL.updateUser(id, user);
}

export function isUserIdAdmin(id) {
    return usersDL.isUserIdAdmin(id);
}