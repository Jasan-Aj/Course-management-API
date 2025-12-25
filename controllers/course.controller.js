import mongoose from "mongoose";
import Course from "../models/course.model.js";
import User from "../models/user.model.js"

export const createCourse = async (req, res, next)=>{
    try{
        const course = await Course.create({
            ...req.body
        });

        res.status(201).json({success:true, data: course});
    }catch(error){
        next(error);
    }
}

export const getAllCourse = async (req, res, next)=>{
    try{
        const courses = await Course.find();
        res.status(200).json({
            success:true,
            data: courses
        });

    }catch(error){  
        next(error);
    }
}

export const getSpecificCourse = async (req, res, next)=>{
    try{
        const course = await Course.findById(req.params.id);
        if(!course){
            const error = new Error("Course does not exist");
            error.satusCode = 404;
            throw error;
        }

        res.status(200).json({
            success:true,
            data: course
        });

    }catch(error){
        next(error);
    }
}

export const updateCourse = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const course = await Course.findById(req.params.id).session(session);
        if(!course){
            const error = new Error("course does not exist!");
            error.statuscode = 404;
            throw error;
        }

        Object.keys(req.body).map(key=>{
            course[key] = req.body[key];
        });
        
        await course.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            data: course
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }

        session.endSession();
        next(error);
    }
}

export const deleteCourse = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const course = await Course.findById(req.params.id).session(session);
        if(!course){
            const error = new Error("course does not exist!");
            error.statuscode = 404;
            throw error;
        }

        course.deleteOne({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "successfully deleted"
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }

        session.endSession();
        next(error);
    }
}

export const joinCourse = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const user_id = req.user._id;
        const course_id = req.params.id;
        
        //check course available
        const isCourseAvailabe = await Course.findById(course_id).session(session);
        if(!isCourseAvailabe){
            const error = new Error("Course not exist");
            error.statusCode = 404;
            throw error;
        }

        //check user alredy enrolled in this course
        const isAlreadyEnrolled = req.user.enrolledCourses.some((enrollment) => 
            enrollment.courseId.toString() === course_id
        );

        if(isAlreadyEnrolled){
            const error = new Error("you already enrolled this course");
            error.statusCode = 400;
            throw error;
        }

        //add new course object to the users course array
        req.user.enrolledCourses.push({
            courseId: course_id,
            startDate: new Date(),
            progress: 0,
            completed: false
        });

        //save
        await req.user.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            data: req.user.enrolledCourses
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const getUserCourse = async (req, res, next)=>{
    try{

        if(req.params.id != req.user._id){
            const error = new Error("Not authorized");
            error.statusCode = 402;
            throw error;
        }

        const cources = await Course.find({...req.user.enrolledCourses.userId});
        res.status(200).json({success: true, data: cources});

    }catch(error){
        next(error);
    }
}