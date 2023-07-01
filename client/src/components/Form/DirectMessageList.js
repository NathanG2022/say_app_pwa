import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DirectMessageList = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/directMessages/${senderId}/${receiverId}`);
                setMessages(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [senderId, receiverId]);

    return (
        <ul>
            {messages.map((message) => (
                <li key={message._id}>{message.text}</li>
            ))}
        </ul>
    );
};

export default DirectMessageList;
