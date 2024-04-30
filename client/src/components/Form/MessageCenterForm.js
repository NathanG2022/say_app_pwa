import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import DirectMessageForm from './DirectMessageForm';
import GlobalMessageForm from './GlobalMessageForm';

const MessageCenterForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.formContainer}>
          <Typography variant="h6">Global Message</Typography>
          <GlobalMessageForm type="global" />
        </div>
        <div className={classes.formContainer}>
          <Typography variant="h6">Direct Message</Typography>
          <DirectMessageForm />
        </div>
      </Paper>
    </div>
  );
};

export default MessageCenterForm;
