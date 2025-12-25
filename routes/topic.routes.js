import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addNewTopic, getAllTopics, updateTopic, deleteTopic } from "../controllers/topic.contoller.js";

const topicRouter = Router();

topicRouter.get("/",authorize,getAllTopics);
topicRouter.post("/",authorize, addNewTopic);
topicRouter.patch("/:id",authorize, updateTopic);
topicRouter.delete("/:id",authorize, deleteTopic);

export default topicRouter;