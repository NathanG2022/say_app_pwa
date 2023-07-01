import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { createPost, updatePost } from '../../actions/posts';
import { sendDirectMessage, getDirectMessages, getUsers } from '../../api';
import useStyles from './styles';

const DirectMessageForm = ({ receiverId }) => {
    const [text, setText] = useState('');
    const classes = useStyles();
    const recipient = '6484e33ad3f381e907b2662c';
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await sendDirectMessage(recipient, { content: text });
            setText('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Paper>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Send</Button>
            </form>
        </Paper>
    );
};

export default DirectMessageForm;
