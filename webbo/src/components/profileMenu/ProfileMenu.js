import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileMenuButton from "./ProfileMenuButton";
import signOut from "../../api/signApi/signOut";
import useStyles from "./ProfileMenuStyle.js";

/**
 * Button and user profile menu in toolbar
 * @param {object} className css styling for button component
 * @param {boolean} showNav variable of useState which determines will sideBar be open or closed
 * @returns
 */

function ProfileMenu(props) {
	const { className, showNav } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [notifications, setNotifications] = useState(4);
	const [username, setUsername] = useState("User Name");
	const classes = useStyles();
	const { t } = useTranslation();
	let history = useHistory();
	useEffect(() => {
		if (localStorage.getItem("username")) {
			setUsername(localStorage.getItem("username"));
		}
	}, []);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setNotifications(0);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		signOut({}).then((data => {
			// if(data === 200){
				localStorage.setItem("authenticated", false);
				localStorage.clear();
				window.location.reload();
			// }else{
			// 	console.log("what now");
			// }
		}))
	};
	return (
		<>
			<ProfileMenuButton
				handleClick={handleClick}
				anchorEl={anchorEl}
				notifications={notifications}
				username={username}
				showNav={showNav}
				className={className}
			/>
			<Menu
				elevation={3}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem className={classes.color}>
					<Link
						to="/settings"
						className={classes.menu}
					>
						<ListItemIcon className={classes.color}>
							<SettingsApplicationsIcon />
						</ListItemIcon>
						<ListItemText
							primary={t("settings")}
							onClick={handleClose}
						/>
					</Link>
				</MenuItem>
				<MenuItem className={classes.color}>
					<Link
						to="/changePassword"
						className={classes.menu}
					>
						<ListItemIcon className={classes.color}>
							<LockOpenIcon />
						</ListItemIcon>
						<ListItemText
							primary={t("changePassword")}
							onClick={handleClose}
						/>
					</Link>
				</MenuItem>
				<MenuItem className={classes.color} onClick={handleLogout}>
					<ListItemIcon className={classes.color}>
						<ArrowBackIcon />
					</ListItemIcon>
					<ListItemText primary={t("signOut")} />
				</MenuItem>
			</Menu>
		</>
	);
}

export default ProfileMenu;
