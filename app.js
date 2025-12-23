import express from "express"
import {PORT} from "./config/env.js"
import courseRouter from "./routes/course.route.js";
import userRouter from "./routes/user.rotes.js";
import instructorRouter from "./routes/instructer.route.js";
import connectDatabse from "./database/mongodb.js";

const app = express();

app.get("/",(req, res)=>{
    res.send("working on")
});

app.use("/api/v1/users",userRouter);
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/instructors",instructorRouter);

app.listen(PORT,async ()=>{
 await connectDatabse();
});