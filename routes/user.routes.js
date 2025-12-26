import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const userRouter = Router();

//get all users 
userRouter.get("/",authorize ,adminMiddleware ,getUsers)

//get specific user
userRouter.get("/:id",authorize, getUser)

//update user
userRouter.patch("/:id",authorize,updateUser);

//delete user
userRouter.delete("/:id",authorize, deleteUser);

export default userRouter;