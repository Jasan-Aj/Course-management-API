
const adminMiddleware = async(req, res, next)=>{

    try{

        if(req.user.role !== "admin"){
            const error = new Error("you are not authorized");
            error.statusCode = 401;
            throw error;
        }

        next();

    }catch(error){
        res.status(401).json({
            success: false,
            error: "you are not authorized"
        });
    }
}

export default adminMiddleware;