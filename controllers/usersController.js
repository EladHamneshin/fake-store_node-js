import * as usersBL from "../BL/usersBL.js";

export function getUsers(req, res) {
    res.send(usersBL.getUsers());
}

export function getUserById(req, res) {
    try {
        const user = usersBL.getUserById(+req.params.id);
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
}

export function addUser(req, res) {
    const user = req.body;

    try{
        usersBL.addUser(user)
        .then((user) => res.send(user))
        .catch((err) => res.send(err.message));
    } catch (error) {
        res.send(error.message);
    }

}

export function deleteUser(req, res) {
    try {
        usersBL.deleteUser(+req.params.id);
        res.send(usersBL.getUsers());
    } catch (error) {
        res.send(error.message);
    }
}

export function updateUser(req, res) {
    const user = req.body;

    try{
        usersBL.updateUser(+req.params.id, user)
        .then(() => res.send(usersBL.getUsers()))
        .catch((err) => res.send(err.message));
    }catch(error){
        res.send(error.message);
    }

}