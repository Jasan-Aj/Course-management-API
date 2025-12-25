import User from "../models/user.model.js"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next)=>{
    try{

        const users = await User.find();
        res.status(200).json({message: "sucessfully fetched users!", data: users});

    }catch(error){
        next(error);
    }
}

export const getUser = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).send({msg: "sucessfully fetched", data: user});
    }catch(error){
        next(error);
    }
}

export const updateUser = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        if(req.user._id.toString() !== req.params.id){
            console.log(req.user._id, "  " , req.params.id)
            const error = new Error("not authorized");
            error.statuscode = 403;
            throw error;
        }

        const user = await User.findById(req.params.id).session(session);

        if(!user){
            const error = new Error("user not found");
            error.statuscode = 404;
            throw error;
        }

        if(!req.body.password){
            const error = new Error("password not found");
            error.statuscode = 400;
            throw error;
        }

        //authorizing password
        const isvalidpassword = await bcrypt.compare(req.body.password, user.password);
        if(!isvalidpassword){
            const error = new Error("invalid password");
            error.statuscode = 401;
            throw error;
        }

        Object.keys(req.body).map(key=>{
            user[key] = req.body[key];
        });

        await user.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            data: user
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }

        session.endSession();
        next(error);
    }
}

export const deleteUser = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        if(req.user._id !== req.params.id){
            const error = new Error("not authorized");
            error.statuscode = 402;
            throw error;
        }

        const user = await User.findById(req.params.id).session(session);

        if(!user){
            const error = new Error("user not found");
            error.statuscode = 404;
            throw error;
        }

        if(!req.body.password){
            const error = new Error("password not found");
            error.statuscode = 400;
            throw error;
        }

        //authorizing password
        const isvalidpassword = await bcrypt.compare(req.body.password, user.password);
        if(!isvalidpassword){
            const error = new Error("invalid password");
            error.statuscode = 401;
            throw error;
        }

        await user.deleteOne({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "successfully deleted!"
        });

    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }

        session.endSession();
        next(error);
    }
}