import express from "express";
import * as usersController from "../controllers/usersController.js";

export const userRouter = express.Router();


userRouter.get("/", usersController.adminAcsessMiddleware ,usersController.getUsers);

userRouter.get("/:id", usersController.adminAcsessMiddleware  ,usersController.getUserById);

userRouter.post("/", usersController.addUser);

userRouter.delete("/:id", usersController.adminAcsessMiddleware ,usersController.deleteUser);

userRouter.put("/:id", usersController.updateUser);