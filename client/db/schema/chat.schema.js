// sample chat schema for database mongo


import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    chatMessage: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);

