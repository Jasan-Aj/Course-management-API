import User from "../models/user.model.js"

export const getusers = async (req, res, next)=>{
    try{

        const users = await User.find();
        req.status(200).json({message: "sucessfully fetched users!"});

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