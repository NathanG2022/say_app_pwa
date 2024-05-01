import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Paper } from '@material-ui/core';
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
	const handleChange = (event) => {
		setSelectedUser(event.target.value);
	};

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
		setInterval(fetchUsers, 10000); // Fetch users every 10 seconds

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
			<Paper className={classes.paper}>
				<FormControl fullWidth>
					<InputLabel id="user-select-label">Select DM Sender</InputLabel>
					<Select
						labelId="user-select-label"
						value={selectedUser}
						onChange={handleChange}
						displayEmpty
						fullWidth
					>
						{Object.entries(messages).map(([authorId, { userName }]) => (
							<MenuItem key={authorId} value={authorId}>
								{userName}
							</MenuItem>
						))}
					</Select>
					{selectedUser && messages[selectedUser]?.messages.map((message, index) => (
						<div key={index}>
							<p>{message.date}: {message.content}</p>
						</div>
					))}
				</FormControl>
				</Paper>
			</div>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<div className={classes.users}>
					<Grid container alignItems="center" spacing={2}>
						<Grid item>
							<InputLabel htmlFor="recipient-select">Select DM recipient</InputLabel>
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