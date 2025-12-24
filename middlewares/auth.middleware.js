import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";

const authorize = async (req, res, next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startswith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            const error = new Error("unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.decode(token, JWT_SECRET);
        const user = await User.findById(decode.userId);

        if(!user){
            const error = new Error("unauthorized");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        next();
        
    }catch(error){
        res.status(401).json({msg: "unauthorized", error: error.message});
    }
}

export default authorize;