import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Please put DB URI into .env file");
}

const connectDatabase = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("connected to database is in", NODE_ENV);
    }catch(err){
        console.log("error in connecting database: ", err);
        process.exit(1);
    }
}

export default connectDatabase;