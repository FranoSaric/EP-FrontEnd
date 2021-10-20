import React from "react";
import Button from "@material-ui/core/Button";
import { Container, Paper, Typography } from "@material-ui/core";
import useStyles from "./Styles";

/**
 *Form that should be shown if user clicked on "delete" button on the table row, asks user to confirm they want to delete an item
 * currently not in usage, may be deleted
 * @param {function} onClickYes - function that shoud run if "yes" button is clicked
 * @param {function} onClickNo - function that should run if "no" button is clicked
 * 
 * @returns
 */
const DeleteModal = (props) => {
	const classes = useStyles();

	const onClickYesHandler = () => {
		props.onClickYes();
	};

	const onClickNoHandler = () => {
		props.onClickNo();
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" component="h2">
				Are you sure you want to delete that item?
			</Typography>
			<Container className={classes.container}>
				
				<Button
					variant="contained"
					size="large"
					color="primary"
					className={classes.button}
					onClick={onClickYesHandler}
				>
					Yes
				</Button>
				<Button
					variant="contained"
					size="large"
					color="primary"
					className={classes.button}
					onClick={onClickNoHandler}
				>
					No
				</Button>
				
				<Button>
					Ok
				</Button>
			</Container>
		</Paper>
	);
};

export default DeleteModal;
