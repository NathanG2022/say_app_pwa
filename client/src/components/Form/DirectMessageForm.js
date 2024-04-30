import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Select, MenuItem, InputLabel, FormControl, Grid } from '@material-ui/core';
import useStyles from './styles';
import { sendDirectMessage, getUsers, fetchDirectMessages } from '../../api';

const DirectMessageForm = () => {
	const classes = useStyles();
	const [messages, setMessages] = useState({});
	const [selectedUser, setSelectedUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [directMessage, setDirectMessage] = useState('');
	const [recipient, setRecipient] = useState('');
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await getUsers();
				setUsers(res.data);
			} catch (error) {
				console.error(error);
			}
		};

		// Fetch users every 10 seconds
		const interval = setInterval(fetchUsers, 10000); // Fetch users every 10 seconds

		if (!loading) {
			const getDirectMessages = async () => {
				try {
					const res = await fetchDirectMessages();
					const groupedMessages = res.data.reduce((acc, message) => {
						if (!acc[message.author]) {
							acc[message.author] = {
								userName: message.userName,
								messages: []
							};
						}
						acc[message.author].messages.push({
							content: message.content,
							date: message.date
						});
						return acc;
					}, {});
					setMessages(groupedMessages);
					setLoading(false);
				} catch (error) {
					console.error(error);
				}
			};
			getDirectMessages();
		}
	}, [loading]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(recipient + directMessage);
		try {
			await sendDirectMessage(recipient, { content: directMessage });
			setDirectMessage('');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<div className={classes.messagesContainer} >
					{Object.entries(messages).map(([authorId, { userName, messages }]) => (
						<div key={authorId}>
							<button onClick={() => setSelectedUser(authorId)} variant="contained" color="primary" size="large" type="submit" fullWidth>{userName}</button>
							{selectedUser === authorId && messages.map((message, index) => (
								<p key={index}>{message.date}: {message.content}</p>
							))}
						</div>
					))}
			</div>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<div className={classes.users}>
					<Grid container alignItems="center" spacing={2}>
						<Grid item>
							<InputLabel htmlFor="recipient-select">Select a recipient</InputLabel>
						</Grid>
						<Grid item xs>
							<FormControl fullWidth>
								<Select
									value={recipient}
									onChange={(event) => setRecipient(event.target.value)}
									inputProps={{
										name: 'recipient',
										id: 'recipient-select',
									}}
								>
									{users.map((user) => (
										<MenuItem key={user._id} value={user._id}>
											{user.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</div>
				<TextField
					name="message"
					variant="outlined"
					label="Enter Direct Message Here"
					fullWidth
					value={directMessage}
					onChange={(event) => setDirectMessage(event.target.value)}
				/>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Send Direct Message
				</Button>
			</form>
		</div>
	);
};

export default DirectMessageForm;
