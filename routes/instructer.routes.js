import { Router } from "express";
import { getAllInstructors, getInstructor, updateInstructor, deleteInstructor, addInstructor } from "../controllers/instructor.controller";
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
instructorRouter.get("/user/:id",(req, res)=>{

});

export default instructorRouter;