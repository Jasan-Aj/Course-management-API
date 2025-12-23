import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLenght: 2,
        maxLenght: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
         match: [/\S+@\S+\.\S+/,'please fill email with valid charecters']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLenght: 8
    },
    enrolledCourses: [{
        value: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            index: true
        },
        startDate: {
            type: Date,
            required: true
        }
    }]
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;