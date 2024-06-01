import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
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

const GlobalMessageForm = () => {
	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false); // Track loading status
	const messagesRef = useRef(null);

	const handleSend = async (event) => {
		event.preventDefault();
		try {
			await sendMessage({ content: message });
			setMessage('');
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		// Only send new getMessages request when the previous one completes
		if (!loading) {
			const fetchMessages = async () => {
				try {
					setLoading(true); // Set loading status to true
					const { data } = await getMessages(0, 10);
					setMessages(combineMessages(data));
				} catch (error) {
					console.error(error);
				} finally {
					setLoading(false); // Set loading status to false after completion
				}
			};

			// Fetch messages every 5 seconds
			const interval = setInterval(fetchMessages, 5000);

			return () => {
				clearInterval(interval); // Clean up the interval on component unmount
			};
		}
	}, [loading]);

	return (
		<div>
			<div className={classes.messagesContainer}>
				<Paper className={classes.paper}>
					<div className={classes.messagesContainer} ref={messagesRef}>
						{messages.map((message, index) => (
							<p key={index}>{message.author} {message.date}: {message.content}</p>
						))}
					</div>
				</Paper>
			</div>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSend}>
				<TextField
					name="chat"
					variant="outlined"
					label="Enter Global Message Here"
					fullWidth
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Send Global Message
				</Button>
			</form>
		</div>
	);
};

export default GlobalMessageForm;
