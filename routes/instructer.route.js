import { Router } from "express";

const instructorRouter = Router();

//get all instructors 
instructorRouter.get("/",(req, res)=>{
    res.send("in courses page");
});

//get specific instructor
instructorRouter.get("/:id",(req, res)=>{

});

//add new instructor
instructorRouter.post("/",(req, res)=>{

});

//update instructor
instructorRouter.patch("/:id",(req, res)=>{

});

//delete instructor
instructorRouter.delete("/:id",(req, res)=>{

});

//get specific instructors all cources
instructorRouter.get("/user/:id",(req, res)=>{

});

export default instructorRouter;