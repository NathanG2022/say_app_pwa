import * as api from '../api/index.js';
import { FETCH_MESSAGES, SEND_MESSAGE, END_LOADING, START_LOADING, FETCH_USERS } from '../constants/actionTypes.js';

export const getMessages = (startindex, endindex) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.getMessages(startindex, endindex);
        dispatch({ type: FETCH_MESSAGES, payload: data });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        dispatch({ type: 'FETCH_MESSAGES_ERROR', error });
    } finally {
        dispatch({ type: END_LOADING });
    }
}

export const sendMessage = (message) => async (dispatch) => {
    if (!message) {
        console.error("No message provided");
        return;
    }
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.sendMessage(message);
        dispatch({ type: SEND_MESSAGE, payload: data });
    } catch (error) {
        console.error("Failed to send message:", error);
        dispatch({ type: 'SEND_MESSAGE_ERROR', error });
    } finally {
        dispatch({ type: END_LOADING });
    }
}

export const getUsers = () => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_USERS, payload: data }); 
    } catch (error) {
        console.error("Failed to fetch users:", error);
        dispatch({ type: 'FETCH_USERS_ERROR', error });
    } finally {
        dispatch({ type: END_LOADING });
    }
}

export const getDirectMessages = () => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.getDirectMessages();
        dispatch({ type: FETCH_MESSAGES, payload: data });
    } catch (error) {
        console.error("Failed to fetch direct messages:", error);
        dispatch({ type: 'FETCH_DIRECT_MESSAGES_ERROR', error });
    } finally {
        dispatch({ type: END_LOADING });
    }
}

export const sendDirectMessage = (receiverId, message) => async (dispatch) => {
    if (!receiverId || !message) {
        console.error("Receiver ID or message not provided");
        return;
    }
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.sendDirectMessage(receiverId, message);
        dispatch({ type: SEND_MESSAGE, payload: data });
    } catch (error) {
        console.error("Failed to send direct message:", error);
        dispatch({ type: 'SEND_DIRECT_MESSAGE_ERROR', error });
    } finally {
        dispatch({ type: END_LOADING });
    }
}