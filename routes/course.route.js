import { Router } from "express";
import { createCourse, getUserCourse, joinCourse } from "../controllers/course.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const courseRouter = Router();

//get all corces 
courseRouter.get("/",(req, res)=>{
    res.send("in courses page");
});

//get specific course
courseRouter.get("/:id",(req, res)=>{

});

//add new course
courseRouter.post("/",authorize,createCourse);

//update course
courseRouter.patch("/:id",(req, res)=>{

});

//delete course
courseRouter.delete("/:id",(req, res)=>{

});

//join course
courseRouter.post("/join/:id",authorize, joinCourse);

//get specific users cources
courseRouter.get("/user/:id",authorize, getUserCourse);

export default courseRouter;