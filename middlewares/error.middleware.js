
const errorMiddleware = (err, req, res, next)=>{

    try{
        let error = {...err};

        if(err.message === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        if(err.code === 11000){
            const message = 'Duplicatited feild entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        if(err.message === 'ValidationError'){
            const message = Object.values(err.errors).map((val)=> val.message);
            error.message = new Error(message.join(', '));
            error.statusCode(400);
        }

    res.status(error.statusCode || 500).send({sucess: false, error: error.message || 'Server error'});

    }catch(error){
        next(error);
    }
}

export default errorMiddleware;