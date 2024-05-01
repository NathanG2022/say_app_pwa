import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import loadingImage from '../../images/nd.png';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    // Styles specifically for the loading image
    const loadingImageStyles = {
        width: '100%',  // Relative size to make it responsive
        height: 'auto',  // Maintain aspect ratio
        display: 'block',
        margin: 'auto',
        maxWidth: '500px'  // Limit the size to not be too large on bigger screens
    };
    
    return (
        isLoading ? (
            <img src={loadingImage} alt="Loading" style={loadingImageStyles} />
        ) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;
