import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Typography} from '@material-ui/core';

import useStyles from './sytles';
import say from '../../images/say.jpg';

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">Say</Typography>
        <img className={classes.image} src={say} alt="icon" height="60" />
      </div>
    </AppBar>
  )
}

export default Navbar