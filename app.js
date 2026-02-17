import express from "express"
import {PORT, NODE_ENV, DB_URI} from "./config/env.js"
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";
import instructorRouter from "./routes/instructer.routes.js";
import connectDatabse from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import topicRouter from "./routes/topic.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleWare from "./middlewares/arcjet.middleware.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import workflowRouter from "./routes/workflow.routes.js"
import inngestRoutes from "./routes/inngest.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleWare);
app.use(express.static(join(__dirname, 'public')));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/instructors",instructorRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/topics",topicRouter);
app.use("/api/v1/workflows",workflowRouter);
app.use("/api/inngest", inngestRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {

  res.sendFile(join(__dirname, "public/index.html"));

});

const startServer = async () => {
  try {
    const dbConnection = await connectDatabse();
    console.log("Database connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });

  } catch (error) {
    console.error("Failed to connect to DB or start server:", error);
  }
};

startServer();

export default app;