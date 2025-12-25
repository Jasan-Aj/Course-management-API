import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";

const authorize = async (req, res, next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message: "unauthorize"});
        }

        const decoded = jwt.decode(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({message: "unauthorized"});
        }

        req.user = user;
        next();
        
    }catch(error){
        res.status(401).json({msg: "unauthorized", error});
    }
}

export default authorize;