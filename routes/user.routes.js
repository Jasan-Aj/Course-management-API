import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

//get all users 
userRouter.get("/",authorize,getUsers)

//get specific user
userRouter.get("/:id",authorize,getUser)

//update user
userRouter.patch("/:id",(req, res)=>{

});

//delete user
userRouter.delete("/:id",(req, res)=>{

});


export default userRouter;