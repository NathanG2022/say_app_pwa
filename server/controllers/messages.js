import express from 'express';
import Message from '../models/messages.js';
import UserModal from '../models/user.js';

const router = express.Router();
/*
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
*/
export const getMessages = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  try{
    //load 10 messages
      const fetchedmessages = await Message.find()
      res.status(200).json(fetchedmessages);
  }
  catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const sendMessage = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const message = req.body;
    const output = Object.values(message).join('');
    const user = await UserModal.findById(req.userId);
    const formatDate = new Date();
    const newMessage = new Message({
        ...message,  
        content: output, 
        author: req.userId, 
        date: formatDate, 
        userName: user.name
    });
    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;