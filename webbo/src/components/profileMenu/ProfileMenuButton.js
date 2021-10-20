import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Badge from "@material-ui/core/Badge";
import PersonIcon from "@material-ui/icons/Person";
import { Button, Box } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

/**
 * Button that opens a user profile menu
 * @param {object} className css styling for box wrapper
 * @param {function} handleClick used for opening user menu and removing notification badge if it is there
 * @param {boolean} anchorEl used for determening whether the menu should be opened or closed
 * @param {integer} notifications number of user notifications shown on userIcon badge
 * @param {string} username username value shown on button
 * @param {boolean} showNav variable of useState which determines will sideBar be open or closed
 * @returns
 */
const useStyles = makeStyles((theme) => ({
	box: {
		display: "flex",
		flexGrow: 1,
		justifyContent: "flex-end",
	},
	boxMobile: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginLeft: "-25px",
	},
}));

//TODO isMobile koristi neku globalnu varijablu
function ProfileMenuButton(props) {
	const { boxMobile, box, button } = useStyles();
	const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
	const { handleClick, anchorEl, notifications, username, showNav } = props;
	return (
		<Box className={showNav && isMobile ? boxMobile : box}>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				color="inherit"
				onClick={handleClick}
				className={showNav ? null : button}
				endIcon={
					anchorEl ? (
						<ExpandLessIcon />
					) : (
						<PersonIcon fontSize="small" />
					)
				}
			>
				{!isMobile && username}
				{/* {!showNav && isMobile && username} */}
			</Button>
		</Box>
	);
}

export default ProfileMenuButton;
