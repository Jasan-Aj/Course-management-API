import { Router } from "express";

const courseRouter = Router();

//get all corces 
courseRouter.get("/",(req, res)=>{
    res.send("in courses page");
});

//get specific course
courseRouter.get("/:id",(req, res)=>{

});

//add new course
courseRouter.post("/",(req, res)=>{

});

//update course
courseRouter.patch("/:id",(req, res)=>{

});

//delete course
courseRouter.delete("/:id",(req, res)=>{

});

//get specific users cources
courseRouter.get("/user/:id",(req, res)=>{

});

export default courseRouter;