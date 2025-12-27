import mongoose from "mongoose";
import Instructor from "../models/instructor.model.js";
import Course from "../models/course.model.js"


export const getAllInstructors = async (req, res, next)=>{
    try{

        const instructors = await Instructor.find();
        res.status(200).json({
            success: true,
            data: instructors
        });

    }catch(error){  
        next(error);
    }
}

export const getInstructor = async (req, res, next)=>{
    try{
        const instructor = await Instructor.findById(req.params.id);
        if(!instructor){
            const error = new Error("Instructor not exist");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: instructor
        });
    }catch(error){
        next(error);
    }
}

export const addInstructor = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, courseId} = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            const error = new Error("course not exist");
            error.statusCode = 404;
            throw error;
        }

        const instructor = await Instructor.create({name, course: [course._id]});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "successfully created",
            data: instructor
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
        next(error);
    }
}

export const updateInstructor = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        
        const instructor = await Instructor.findById(req.params.id).session(session);

        if(!instructor){
            const error = new Error("instrcutor not exist");
            error.statusCode = 404;
            throw error;
        }

        if(Object.keys(req.body).length < 0){
            const error = new Error("no data to update instructor");
            error.statusCode = 400;
            throw error;
        }

        if(req.body.name){
            instructor.name = req.body.name;
        }

        await instructor.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "successfully updated",
            data: instructor
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
    }
}

export const deleteInstructor = async (req, res, next)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const instructor = await Instructor.findById(req.params.id).session(session);

        if(!instructor){
            const error = new Error("instrcutor not exist");
            error.statusCode = 404;
            throw error;
        }

        await instructor.deleteOne({session});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "successfully deleted"
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
    }
}

export const getInstructorsCourses = async (req, res, next)=>{
    try{

        const instructor = await Instructor.findById(req.params.id);

        if(!instructor){
            const error = new Error("instrcutor not exist");
            error.statusCode = 404;
            throw error;
        }

        const coursePromises = instructor.course.map(async (id)=>{
            return await Course.findById(id);
        });

        const courses = await Promise.all(coursePromises);

        res.status(200).send({
            success: true,
            data: courses
        });

    }catch(error){
        next(error);
    }
}

export const insertCourse = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const instructor = await Instructor.findById(req.params.id).session(session);

        if(!instructor){
            const error = new Error("instrcutor not exist");
            error.statusCode = 404;
            throw error;
        }

        if(!req.body.courseId){
            const error = new Error("course id required");
            error.statusCode = 404;
            throw error;
        }

        const course = await Course.findById(req.body.courseId).session(session);
        
        if(!course){
            const error = new Error("course not exist");
            error.statusCode = 404;
            throw error;
        }

        const isCourseIdAlreadyExist = instructor.course.some(id => id.toString() === course._id.toString());
        
        if(isCourseIdAlreadyExist){
            const error = new Error("course already exist");
            error.statusCode = 404;
            throw error; 
        }

        instructor.course = [...instructor.course, course._id];
        await instructor.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            data: instructor
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
        next(error);
    }
}

export const removeCourse = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const instructor = await Instructor.findById(req.params.id).session(session);

        if(!instructor){
            const error = new Error("instrcutor not exist");
            error.statusCode = 404;
            throw error;
        }

        if(!req.body.courseId){
            const error = new Error("course id required");
            error.statusCode = 404;
            throw error;
        }

        const course = await Course.findById(req.body.courseId).session(session);
      
        if(!course){
            const error = new Error("course not exist");
            error.statusCode = 404;
            throw error;
        }

        const isCourseIdExist = instructor.course.some(id => {
            return id.toString() === course._id.toString();
        });

        if(!isCourseIdExist){
            const error = new Error("course does not exist");
            error.statusCode = 404;
            throw error; 
        }

        const courseArray = [...instructor.course];
        
        const filteredCourses = courseArray.filter(id => 
            id.toString() !== course._id.toString()
        );

        instructor.course = filteredCourses;

        await instructor.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            data: instructor
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
        next(error);
    }
}