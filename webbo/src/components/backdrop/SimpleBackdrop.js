import { Backdrop } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
}));
 /**
  * backdrop that covers rest of the screen when sidebar is open in mobile version
  * @param {boolean} showNav - boolean value that opens sidebar
  * @param {function} close - function that closes sidebar  
  * @returns 
  */
 const SimpleBackdrop = (props) => {
	const {showNav, close} = props;
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={showNav} onClick={close}/>
	)
 }
 
 export default SimpleBackdrop
 