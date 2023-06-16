import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }, 
  content: {
    type: String,
  },
  date: {
    type: Date,
  }
});

var Message = mongoose.model("Message", messageSchema);

export default Message;