import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {JWT, JWT_EXPIRES_IN} from "../config/env.js"

export const signUp = async (req, res, next)=>{
  const session = await mongoose.startSession();  
  session.startTransaction();

  try{
    
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        const message = "user email already exist";
        const error = new Error(message);
        error.statusCode = 409;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUsers = await User.create([{name, email, password: hashedPassword}], {session});
    const token = jwt.sign({user_id: newUsers[0]._id},JWT,{expiresIn: JWT_EXPIRES_IN});  

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      sucess: true,
      message: "sucessfully created",
      data: {
        user: newUsers[0],
        token:token
      }
    })    

  }catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}


export const signIn = async (req, res, next)=>{}
export const signOut = async (req, res, next)=>{}