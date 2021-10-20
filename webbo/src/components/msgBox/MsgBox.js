import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import useStyles from "./MsgBoxStyles";
import { green } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import MsgBoxContext from "../../store/MsgBoxContext";
import { useTranslation } from "react-i18next";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * modal windows for alerting user
 * @param {string} type - type of message(error, info)
 * @param {string} title - title of message
 * @param {string} content - content of message
 * @returns
 */
export default function MsgBox(props) {
	// const { handleOK, type, icon, handleDelete  } = props;
	const [open, setOpen] = useState(false);
	const [titleContent, setTitleContent] = useState({
		title: "",
		content: "",
	});
	const [avatar, setAvatar] = useState();
	const [button, setButton] = useState();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();
	const ctx = useContext(MsgBoxContext);
	const { t } = useTranslation();

	const themeColor = createTheme({
		palette: {
			primary: green,
		},
	});
	useEffect(() => {
		if (ctx.isModalOn) {
			return setOpen(true);
		} else {
			setOpen(false);
		}
	}, []);

	const handleClose = () => {
		setOpen(false);
		ctx.setIsModalOn(false);
		localStorage.removeItem("openMsgBox");
	};
	const handleOK = () => {
		if (props.handleOK !== undefined) {
			props.handleOK();
		} else {
			handleClose();
		}
	};
	const handleBackdropClick = () => {
		if (props.handleBackdropClick !== undefined) {
			props.handleBackdropClick();
		} else {
			handleClose();
		}
	};
	const handleError = () => {
		if (props.handleError !== undefined) {
			props.handleError();
		} else {
			handleClose();
		}
	};

	const avatars = {
		errorAvatar: (
			<Avatar className={classes.msgBoxWarning}>
				<ErrorOutlineIcon style={{ fontSize: "40px" }} />
			</Avatar>
		),
		doneAvatar: (
			<Avatar className={classes.msgBoxInfo}>
				<DoneIcon style={{ fontSize: "40px" }} />
			</Avatar>
		),
		deleteAvatar: (
			<Avatar className={classes.msgBoxWarning}>
				<DeleteIcon style={{ fontSize: "40px" }} />
			</Avatar>
		),
		updateAvatar: (
			<Avatar className={classes.msgBoxUpdateWarning}>
				<HelpOutlineIcon style={{ fontSize: "40px" }} />
			</Avatar>
		),
		loadingAvatar: (
			<Avatar className={classes.msgBoxUpdateWarning}>
				<CircularProgress style={{ fontSize: "40px" }} />
			</Avatar>
		),
	};
	const buttons = {
		errorButtons: (
			<ThemeProvider theme={themeColor}>
				<Button
					autoFocus={true}
					onClick={handleError}
					variant="contained"
					color="secondary"
					className={classes.button}
				>
					{t("ok")}
				</Button>
			</ThemeProvider>
		),
		doneButtons: (
			<ThemeProvider theme={themeColor}>
				<Button
					autoFocus={true}
					onClick={handleOK}
					variant="contained"
					color="primary"
					className={classes.button}
				>
					{t("ok")}
				</Button>
			</ThemeProvider>
		),
		deleteButtons: (
			<>
				<Button
					onClick={props.handleDelete || handleOK}
					variant="contained"
					color="secondary"
					className={classes.button}
				>
					{t("yes")}
				</Button>
				<Button
					onClick={handleClose}
					variant="contained"
					className={classes.button}
				>
					{t("no")}
				</Button>
			</>
		),
		updateWarningButtons: (
			<>
				<Button
					onClick={handleOK}
					variant="contained"
					color="primary"
					className={classes.button}
				>
					{t("yes")}
				</Button>
				<Button
					onClick={handleClose}
					variant="contained"
					className={classes.button}
				>
					{t("no")}
				</Button>
			</>
		),
		loadingButtons: <></>,
	};

	useEffect(() => {
		switch (props.type) {
			case "done":
				setButton(buttons.doneButtons);
				setAvatar(avatars.doneAvatar);
				break;

			case "warning":
				setButton(buttons.updateWarningButtons);
				setAvatar(avatars.updateAvatar);
				break;

			case "error":
				setButton(buttons.errorButtons);
				setAvatar(avatars.errorAvatar);

				break;

			case "delete":
				setButton(buttons.deleteButtons);
				setAvatar(avatars.deleteAvatar);
				break;

			case "loading":
				setButton(buttons.loadingButtons);
				setAvatar(avatars.loadingAvatar);
				break;

			default:
				setButton(buttons.errorButtons);
				setAvatar(avatars.errorAvatar);
		}
	}, [props.type]);

	return (
		<form>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleBackdropClick}
				aria-labelledby="responsive-dialog-title"
			>
				{avatar}

				<DialogTitle
					id="responsive-dialog-title"
					className={classes.text}
				>
					{t(props.title)}
				</DialogTitle>
				<DialogContent className={classes.text}>
					{t(props.content)}
				</DialogContent>
				<DialogActions className={classes.actions}>
					{button}
				</DialogActions>
			</Dialog>
		</form>
	);
}
