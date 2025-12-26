import { Router } from "express";
import { createCourse, getUserCourse, joinCourse, getAllCourse, getSpecificCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const courseRouter = Router();

//get all corces 
courseRouter.get("/",authorize, getAllCourse);

//get specific course
courseRouter.get("/:id",authorize, getSpecificCourse);

//add new course
courseRouter.post("/", authorize, adminMiddleware, createCourse);

//update course
courseRouter.patch("/:id",authorize, adminMiddleware, updateCourse);

//delete course
courseRouter.delete("/:id",authorize, adminMiddleware, deleteCourse);

//join course
courseRouter.post("/join/:id",authorize, joinCourse);

//get specific users cources
courseRouter.get("/user/:id",authorize, getUserCourse);

export default courseRouter;