import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
    name:{
        type: String,
        reqired: true,
        unique: true,
        trim: true,
        minLength: 2,
        maxlength: 50
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index: true
    }]
});


const Instructor = mongoose.model('Instructor',instructorSchema);
export default Instructor;