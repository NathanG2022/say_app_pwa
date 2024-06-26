import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Modal, Backdrop, Fade, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import MessageCenterForm from '../Form/MessageCenterForm';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();
	const query = useQuery();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	const history = useHistory();
	const [open, setOpen] = useState(false);  // Modal open state
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const searchPost = () => {
		if (search.trim() || tags.length > 0) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
		} else {
			history.push('/');
		}
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);
	const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const logout = useCallback(() => {
		dispatch({ type: actionType.LOGOUT });

		history.push('/auth');

		setUser(null);

		localStorage.clear();

		window.location.reload();
	}, [dispatch, history]);

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		// Set user on every location change
		const tokenCheck = JSON.parse(localStorage.getItem('profile'));
		if (tokenCheck && tokenCheck.token !== user?.token) {
			setUser(tokenCheck);
		}
	}, [location, logout]); // Ensure using optional chaining here

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
					<Grid item xs={12} sm={7} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					{user?.result ? (
					<Grid item xs={12} sm={5} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<Button onClick={handleOpen} className={classes.searchButton} variant="contained" color="primary">
								Message Center
							</Button>
						</AppBar>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								onKeyDown={handleKeyPress}
								name="search"
								variant="outlined"
								label="Search Connect"
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={(chip) => handleAddChip(chip)}
								onDelete={(chip) => handleDeleteChip(chip)}
								label="Search Tags"
								variant="outlined"
							/>
							<Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{(!searchQuery && tags.length === 0) && (
							<Paper className={classes.pagination} elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>) : null}
				</Grid>
				<Modal
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<div className={classes.modal}>
							<IconButton className={classes.closeButton} onClick={handleClose}>
								<CloseIcon />
							</IconButton>
							{/* post.creator*/}
							<MessageCenterForm handleClose={handleClose} />
						</div>
					</Fade>
				</Modal>
			</Container>
		</Grow>
	);
};

export default Home;
