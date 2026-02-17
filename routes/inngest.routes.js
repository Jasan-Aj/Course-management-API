import { serve } from "inngest/express";
import { inngest } from "../config/inngest.js";
import { checkCourseInactivity, sendWelcomeEmail, sendReminderEmail, sendUserWelcomeEmail } from "../inngest/functions.js";
import express from "express";

const router = express.Router();

router.use(
    "/",
    serve({
        client: inngest,
        functions: [checkCourseInactivity, sendWelcomeEmail, sendReminderEmail, sendUserWelcomeEmail],
    })
);

export default router;
