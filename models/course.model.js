import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 500
    },
    price: {
        type: number,
        required: true,
        enum: ['USD', 'EUR', 'RS'],
        default: 'USD',
        min: 0
    },
    duration: {
        value: {
            type: number,
            required: true,
            minLength: 1
        },
        unit: {
            type: String,
            required: true,
            enum: ['hour', 'day', 'week', 'month'],
        }
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Topic',
        required: true,
        index: true
    }
},{timestamps: true});

const Course = mongoose.model('Course',courseSchema);
export default Course;