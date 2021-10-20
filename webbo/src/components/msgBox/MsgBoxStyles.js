import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	msgBoxWarning: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: "0 auto",
		marginTop: "20px",
		backgroundColor: theme.palette.grey[50],
		border: "2px solid red",
		color: "red",
	},
	msgBoxInfo: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: "0 auto",
		marginTop: "20px",
		backgroundColor: theme.palette.grey[50],
		border: "2px solid green",
		color: "green",
	},
	msgBoxUpdateWarning: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: "0 auto",
		marginTop: "20px",
		backgroundColor: theme.palette.grey[50],
		border: "2px solid blue",
		color: "blue",
	},
	text: {
		textAlign: "center",
	},
	actions: {
		display: "flex",
		justifyContent: "space-evenly",
	},
	button: {
		margin: "10px",
	},
}));

export default useStyles;
