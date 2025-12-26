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
        if(req.user._id.toString() !== req.params.id && req.user.role !== "admin"){
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

        if(req.user.role !== "admin" && !req.body.password){
            const error = new Error("password not found");
            error.statuscode = 400;
            throw error;
        }

        //authorizing password for normal user
        if(req.user.role !== "admin"){
            const isvalidpassword = await bcrypt.compare(req.body.password, user.password);
            if(!isvalidpassword){
                const error = new Error("invalid password");
                error.statuscode = 401;
                throw error;
            }
        }
        
        //validation for admin self update 
        if(req.user.role === "admin" && req.user._id.toString() === req.params.id){
            if(!req.body.password){
                const error = new Error("password not found");
                error.statuscode = 400;
                throw error;
            }

            const isvalidpassword = await bcrypt.compare(req.body.password, user.password);
            if(!isvalidpassword){
                const error = new Error("invalid password");
                error.statuscode = 401;
                throw error;
            }
        }

        delete req.body.password;
        delete req.body.role;    

        Object.keys(req.body).map(key=>{
            user[key] = req.body[key];
        });

        //update password
        if(req.body.newPassword){
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(req.body.newPassword, salt);
            user.password = newPassword;
            await user.save({session});
            req.body.newPassword = undefined
        }

        //update role only for admin
        if(req.body.newRole){

            if(req.user.role !== "admin"){
                const error = new Error("not authorized");
                error.statuscode = 402;
                throw error; 
            }

            if(req.body.newRole !== "admin" && req.body.newRole !== "user"){
                const error = new Error("invalid role name");
                error.statuscode = 401;
                throw error; 
            }
            user.role = req.body.newRole;
        }

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

        if(req.user._id.toString() !== req.params.id && req.user.role !== "admin"){
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

        if(req.user.role === "admin" && req.user._id.toString() === req.params.id){
            const adminCount = await User.countDocuments({role:"admin"});
            if(adminCount <= 1){
                const error = new Error("you cant delete yourself because you are the only admin!");
                error.statuscode = 401;
                throw error; 
            }
        }

        if(req.user.role === "admin" && req.user._id.toString() !== req.params.id){
            await user.deleteOne({session});

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                success: true,
                message: "successfully deleted!"
            });
        }

        if(!req.body.password){
            const error = new Error("password not found");
            error.statusCode = 400;
            throw error;
        }

        //authorizing password
        const isvalidpassword = await bcrypt.compare(req.body.password, user.password);
        if(!isvalidpassword){
            const error = new Error("invalid password");
            error.statusCode = 401;
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