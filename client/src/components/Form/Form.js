import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const [chipInputValue, setChipInputValue] = useState('');
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = useCallback(() => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }, [setCurrentId]);

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post, clear]);

  const handleAddChip = (tag) => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      tags: [...prevPostData.tags, tag],
    }));
    setChipInputValue('');
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      tags: prevPostData.tags.filter((tag) => tag !== chipToDelete),
    }));
  };

  const handleBlur = () => {
    if (chipInputValue) {
      handleAddChip(chipInputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting postData:', postData);

    if (currentId === 0) {
      await dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      await dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Connections, Like others' Connections, and See others' Connections.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Create a Connect'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            onUpdateInput={(e) => setChipInputValue(e.target.value)}
            onBlur={handleBlur}
            key={postData.tags.join(',')} // Ensure re-render if tags change
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
