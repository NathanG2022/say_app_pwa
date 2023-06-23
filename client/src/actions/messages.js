import * as api from '../api/index.js';
import { FETCH_MESSAGES , SEND_MESSAGE , END_LOADING , START_LOADING } from '../constants/actionTypes.js';
/*
export const getMessages = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    try{
        const messages = await messages.find();

        res.status(200).json(messages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const message = req.body;

    const newMessage = new messages(message);

    //save the author of the message
    newMessage.author = req.userId;

    try {
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
*/

export const getMessages = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING });

        const { data } = await api.getMessages();

        dispatch({ type: FETCH_MESSAGES, payload: response.data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = (message) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING });

        const { data } = await api.sendMessage(message);

        dispatch({ type: SEND_MESSAGE, payload: response.data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}