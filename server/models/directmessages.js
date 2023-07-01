import mongoose from "mongoose";
import UserModal from "../models/user.js";

const directMessageSchema = new mongoose.Schema({
    author : {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    content : {
        type: String,
    },
    date : {
        type: Date,
    },
    recipient : {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    userName : {
        type: String,
    }
});

var DirectMessage = mongoose.model("DirectMessage", directMessageSchema);

export default DirectMessage;