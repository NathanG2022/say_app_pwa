import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: { // This is the new style for the Paper component
    position: 'relative', // Relative positioning is needed for the closeButton
    padding: '20px',
    borderRadius: '15px',
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
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
