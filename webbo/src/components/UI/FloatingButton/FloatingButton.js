import React from "react";
import AddIcon from "@material-ui/icons/Add";
import "./FloatingButton.css";
/**
 * 
 * @property {function} onClick - onclick function 
 * @returns floating button for adding new records
 */

const FloatingButton = (props) => {

	return (
		<button
			type="button"
			className={"floatingButton"}
			onClick={props.onClick}
		>
			<AddIcon className="floatingButton_icon" />
		</button>
	);
};

export default FloatingButton;
