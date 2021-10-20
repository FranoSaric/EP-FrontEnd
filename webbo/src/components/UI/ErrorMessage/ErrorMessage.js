import React from "react";
import { useHistory } from "react-router";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import useStyles from "./ErrorMessageStyles";
/**
 * component for displaying error message
 * @returns
 */

const ErrorMessage = (props) => {
	let history = useHistory();
	const reload = () => {
		history.push("/dashboard");
		window.location.reload();
	}
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h1" component="p">
					Error!
				</Typography>
				<Typography variant="h4" component="p">
					{props.name}
				</Typography>
				<Typography color="textSecondary" variant="p">
					{props.message}
				</Typography>
				<Button
					onClick={reload}
					variant="contained"
					className={classes.button}
					textPrimary
					
				>
					Reload
				</Button>
			</Paper>
		</Container>
	);
};

export default ErrorMessage;
