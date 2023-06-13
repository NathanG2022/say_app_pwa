import express from 'express';
import mongoose from 'mongoose';

import messages from '../models/messages';

const router = express.Router();

export const getMessages = async (req, res) => {
    try {
        const messages = await messages.find();
        const recipient = req.body.recipient;
        const sender = req.body.sender;
        const filteredMessages = messages.filter(message => message.recipient === recipient && message.sender === sender || message.recipient === sender && message.sender === recipient);
        //returns all messages where the recipient is the recipient and the sender is the sender or the recipient is the sender and the sender is the recipient
        res.status(200).json(filteredMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    const message = req.body;

    const newMessage = new messages(message);

    try {
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}