import {createRequire} from "module";
const require = createRequire(import.meta.url);
const {serve} = require("@upstash/workflow/express");
import Course from "../models/course.model.js";

export const sendReminder = serve(async(context)=>{
    const courseId = context.requestPayload;
    const course = await fetchCourse(context, courseId);

    if(!course){
        return; 
    }
    
});

const fetchCourse = async (context, courseId)=>{
    return await context.run('fetch course',()=>{
        return await Course.findById(courseId);
    })
}