import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { sendMessage, getMessages } from '../../api';
import useStyles from './styles';

function combineMessages(messages) {
  let previousAuthor = null;
  const messageComponents = [];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const messageComponent = {};

    // Check if the author has changed
    if (message.author !== previousAuthor) {
      messageComponent.author = message.userName;
      previousAuthor = message.author;
    }

    messageComponent.content = message.content;
    messageComponent.date = message.date;
    messageComponents.push(messageComponent);
  }

  return messageComponents;
}

const MessageComponent = ({ message }) => (
  <div>
    <Typography variant="h6" style={{ fontWeight: 'bold' }}>{message.author}</Typography>
    <Typography variant="h6">{message.content}</Typography>
  </div>
);

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const messagesRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();

    console.log(message);

    dispatch(sendMessage({ content: message }));
    setMessage(''); // Clear the message input field after sending
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages();
        setMessages(combineMessages(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 100); // Refresh every 3 seconds

    // Clean up function
    return () => clearInterval(intervalId);
  }, []);

  const numberofMessages = messages.length;
   
  useEffect(() => {
    //if messages length > numberofMessages scroll to bottom
    if (messages.length > numberofMessages) {
      if (messagesRef.current) {
        const { scrollHeight, clientHeight } = messagesRef.current;
        messagesRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
      
  }, [messages]);

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSend}>
        <Typography variant="h6">Messages:</Typography>
        <div className={classes.messagesContainer} ref={messagesRef}>
          {
            messages.map((message, index) => (
              <MessageComponent message={message} key={index} />
            ))
          }
        </div>
        <TextField name="chat" variant="outlined" label="Chat" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
        <Typography variant="h6">Send a Message</Typography>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Send</Button>
      </form>
    </Paper>
  );
};

export default Messages;
