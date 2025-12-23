import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength:2,
        maxLength: 50
    }
},{timestamps: true});

const Topic = mongoose.model("Topic",topicSchema);
export default Topic;