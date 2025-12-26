import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js"

export const signUp = async (req, res, next)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try{

    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
      const error =  new Error("this email already taken");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{
      name, email, password: hashedPassword, role
    }],{session});

    const token = jwt.sign({userId: newUsers[0]._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      msg: "sucessfully created new user",
      data: {
        user: newUsers[0],
        token: token
      }
    });

  }catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}


export const signIn = async (req, res, next)=>{
  try{

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      const error = new Error("invalid password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({userId: user._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    res.status(200).json({
      success: true,
      message: "sucessfully logged in",
      data: {
        user: user,
        token: token
      }
    });
    
  }catch(error){
    next(error);
  }
}
export const signOut = async (req, res, next)=>{}