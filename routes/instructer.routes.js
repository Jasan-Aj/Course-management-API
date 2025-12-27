import { Router } from "express";
import { getAllInstructors, getInstructor, updateInstructor, deleteInstructor, addInstructor,
     getInstructorsCourses, insertCourse, removeCourse } from "../controllers/instructor.controller.js";

import authorize from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js"

const instructorRouter = Router();

//get all instructors 
instructorRouter.get("/", authorize, adminMiddleware, getAllInstructors);

//get specific instructor
instructorRouter.get("/:id", authorize, adminMiddleware, getInstructor);

//add new instructor
instructorRouter.post("/", authorize, adminMiddleware, addInstructor);

//update instructor
instructorRouter.patch("/:id", authorize, adminMiddleware, updateInstructor);

//delete instructor
instructorRouter.delete("/:id", authorize, adminMiddleware, deleteInstructor);

//get specific instructors all cources
instructorRouter.get("/user/:id", authorize, adminMiddleware, getInstructorsCourses);

//insert course
instructorRouter.post("/course/:id", authorize, adminMiddleware, insertCourse);

//remove course
instructorRouter.delete("/course/:id", authorize, adminMiddleware, insertCourse);

export default instructorRouter;