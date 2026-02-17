import { inngest } from "../config/inngest.js";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";
import { FRONT_END_URL } from "../config/env.js";
import dayjs from "dayjs";

export const checkCourseInactivity = inngest.createFunction(
    { id: "check-course-inactivity" },
    { cron: "0 0 * * *" },
    async ({ step }) => {
        const thresholds = [7, 14, 30];

        for (const days of thresholds) {
            await step.run(`check-${days}-days-inactivity`, async () => {
                const targetDay = dayjs().subtract(days, 'day');
                
                const users = await User.find({
                    "enrolledCourses.lastAccessed": {
                        $gte: targetDay.startOf('day').toDate(),
                        $lte: targetDay.endOf('day').toDate()
                    }
                }).populate("enrolledCourses.courseId");

                let emailCount = 0;

                for (const user of users) {
                    const dayEnrollments = user.enrolledCourses.filter(enrollment => 
                        dayjs(enrollment.lastAccessed).isSame(targetDay, 'day')
                    );

                    for (const enrollment of dayEnrollments) {
                        await inngest.send({
                            name: "send-reminder-email",
                            data: {
                                to: user.email,
                                subject: `We miss you! It's been ${days} days`,
                                text: `Hello ${user.name}, you haven't accessed your course ${enrollment.courseId.title} in ${days} days. Come back and continue learning!`,
                                html: `<p>Hello ${user.name},</p><p>You haven't accessed your course <strong>${enrollment.courseId.title}</strong> in ${days} days.</p><p><a href="${FRONT_END_URL}/courses/${enrollment.courseId._id}">Resume Learning</a></p>`
                            }
                        });
                        emailCount++;
                    }
                }

                return { 
                    days, 
                    usersProcessed: users.length,
                    emailsSent: emailCount 
                };
            });
        }
    }
);

export const sendWelcomeEmail = inngest.createFunction(
    { id: "send-welcome-email" },
    { event: "course/enrolled" },
    async ({ event, step }) => {
        const {email, name} = event.data;
        await step.run("send-welcome-email", async () => {
            await sendEmail({
                to: email,
                subject: `Welcome to ${name}`,
                text: `Welcome to ${name}`,
                html: `<p>Welcome to ${name}</p>`
            });
        });
    }
); 

export const sendReminderEmail = inngest.createFunction(
    { id: "send-reminder-email" },
    { event: "send-reminder-email" },
    async ({ event, step }) => {
        await step.run("send-reminder-email", async () => {
            await sendEmail({
                to: event.data.to,
                subject: event.data.subject,
                text: event.data.text,
                html: event.data.html
            });
        });
    }
); 

export const sendUserWelcomeEmail = inngest.createFunction(
    { id: "send-user-welcome-email" },
    { event: "user/created" },
    async ({ event, step }) => {
        const {email, name} = event.data;
        await step.run("send-user-welcome-email", async () => {
            await sendEmail({
                to: email,
                subject: `Welcome to Course platform`,
                text: `Welcome on board ${name}`,
                html: `<p>Welcome on board ${name}</p>`
            });
        });
    }
);