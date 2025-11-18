import mongoose from "mongoose";

const messageShema = new mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: String,
    attachment: String,
},
{
    timestamps: true,
}
);