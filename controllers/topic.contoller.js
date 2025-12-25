import mongoose from "mongoose";
import Topic from "../models/topic.model.js";

export const getAllTopics = async(req, res, next)=>{
    try{
        const topics = await Topic.find();
        res.status(200).json({
            success: true,
            data: topics
        });

    }catch(error){
        next(error);
    }
}

export const addNewTopic = async(req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name} = req.body;
        const topic = await Topic.create({name});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success:true,
            data: topic
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();  
        next(error);
    }
}

export const updateTopic = async (req, res, next)=>{

    const session = await mongoose.startSession();
    session.startTransaction();
    try{

        const {name} = req.body;
        const topic = await Topic.findById(req.params.id);

        if(!topic){
            const error = new Error("topic not exist");
            error.statusCode = 404;
            throw error;
        }

        topic.name = name;

        await topic.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            data: topic
        });

        

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const deleteTopic = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        //check it is exist
        const topic = await Topic.findById(req.params.id).session(session);

        if(!topic){
            const error = new Error("topic does not exist!");
            error.status = 404;
            throw error;
        }

        await topic.deleteOne({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "sucessfully deleted"
        });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}