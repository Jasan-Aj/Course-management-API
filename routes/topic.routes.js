import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js"
import { addNewTopic, getAllTopics, updateTopic, deleteTopic } from "../controllers/topic.contoller.js";

const topicRouter = Router();

topicRouter.get("/",authorize, adminMiddleware,getAllTopics);
topicRouter.post("/",authorize, adminMiddleware, addNewTopic);
topicRouter.patch("/:id",authorize, adminMiddleware, updateTopic);
topicRouter.delete("/:id",authorize, adminMiddleware, deleteTopic);

export default topicRouter;