import { Router } from "express";

const userRouter = Router();

//get all users 
userRouter.get("/",(req, res)=>{
    res.send("in users page")
});

//get specific user
userRouter.get("/:id",(req, res)=>{

});

//add new user
userRouter.post("/",(req, res)=>{

});

//update user
userRouter.patch("/:id",(req, res)=>{

});

//delete user
userRouter.delete("/:id",(req, res)=>{

});


export default userRouter;