import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	layoutLarge: {
		[theme.breakpoints.up("xs")]: {
			width: "95%",
			maxWidth: "1035px",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	layoutMedium: {
		[theme.breakpoints.up("xs")]: {
			maxWidth: "835px",
			width: "95%",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	layoutSmall: {
		[theme.breakpoints.up("xs")]: {
			maxWidth: "635px",
			width: "95%",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	layoutExtraSmall: {
		[theme.breakpoints.up("xs")]: {
			maxWidth: "435px",
			width: "95%",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		justifyContent: "center",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			justifyContent: "center",
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(2),
		},
	},
	title: {
		marginBottom: "1.5rem",
		borderBottom: "1px solid black",
		// textShadow: "-0.6px -0.6px 100px rgba(0,0,0,0.1),-0.6px 0.6px 0 rgba(0,0,0,0.2),0.6px -0.6px 0 rgba(0,0,0,0.2),0.6px 0.6px 0 rgba(0,0,0,0.2)"
	},
}));

function TemplateForm(props) {
	const classes = useStyles();
	const [layoutClass, setLayoutClass] = useState(() => {
		switch (props.size) {
			case "large":
				return (classes.layoutLarge);
			case "medium":
				return (classes.layoutMedium);
			case "small":
				return (classes.layoutSmall);
			default:
				return (classes.layoutExtraSmall);
		}
	});

	return (
		<>
			<CssBaseline />
			<form  className={layoutClass}>
				<Paper className={props.className ? props.className : classes.paper}>
					{props.title && (
						<Typography
							variant="h5"
							className={classes.title}
							gutterBottom
						>
							{props.title}
						</Typography>
					)}{" "}
					{props.children}
				</Paper>
			</form >
		</>
	);
}

export default TemplateForm;
