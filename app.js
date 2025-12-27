import express from "express"
import {PORT} from "./config/env.js"
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";
import instructorRouter from "./routes/instructer.routes.js";
import connectDatabse from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import topicRouter from "./routes/topic.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleWare from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleWare);


app.use("/api/v1/users",userRouter);
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/instructors",instructorRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/topics",topicRouter);

app.use(errorMiddleware);

app.get("/",(req, res)=>{
    res.send("working on")
});


app.listen(PORT,async ()=>{
 await connectDatabse();
});