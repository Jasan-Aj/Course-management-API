import Course from "../models/course.model.js";
import User from "../models/user.model.js"

export const createCourse = async (req, res, next)=>{
    try{
        const course = await Course.create({
            ...req.body
        });

        req.status(201).json({success:true, data: course});
    }catch(error){
        next(error);
    }
}

export const joinCourse = async (req, res, next)=>{
    try{
        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.id);

        if(!course){
            const error = new Error("course not available!");
            error.statusCode = 404;
            throw error;
        }

        user = {...user, enrolledCourses: [{value: req.params.id, startDate: new Date()}]};
        await user.save();

        res.status(200).json({sucess:true, data:user});

    }catch(error){
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

        const cources = await Course.find({...req.user.enrolledCourses.value});
        res.status(200).json({success: true, data: cources});

    }catch(error){
        next(error);
    }
}