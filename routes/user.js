import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRouter = Router();

// userRouter.get("/all", UserController.getAllUsers);
userRouter.post("/register", UserController.postUser);
userRouter.post("/login", UserController.login);
userRouter.get("/dashboard", UserController.dashboard);
userRouter.post("/logout", UserController.logout);
