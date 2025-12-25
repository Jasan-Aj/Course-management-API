import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Please enter the DB_URI in the env file!");
}

const connectDatabse = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("DB connected in ", NODE_ENV, " environment");
    }catch(error){
        console.log("error in connecting databse: ", error);
    }
}

export default connectDatabse;