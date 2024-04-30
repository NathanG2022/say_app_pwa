import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(-1),
    top: theme.spacing(-1),
    color: theme.palette.grey[500],
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Responsive width
    maxHeight: '80vh', // Limits height on smaller screens
    overflowY: 'auto', // Allows scrolling within the modal if content is too tall
    backgroundColor: theme.palette.background.paper, // Uses theme for background
    boxShadow: theme.shadows[5], // Uses theme for shadow
    padding: theme.spacing(2, 4, 3), // Standard spacing
    [theme.breakpoints.down('xs')]: {
      width: '95%', // Increased width for extra small devices
      maxHeight: '90vh', // Slightly more height for very small screens
      padding: theme.spacing(2), // Reduced padding on smaller screens
    },
  },
}));
