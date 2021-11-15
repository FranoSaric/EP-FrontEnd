import React from "react";
import AddIcon from"@material-ui/icons/Add";
import "./FloatingButton.css";

const FloatingButton = (props) => {
	return (
		<button
			type="button"
			className={
				"floatingButton " + props.color + " elevation" + props.elevation
			}
			onClick={props.onClick}
		>
			<AddIcon className="floatingButton_icon"/>
		</button>
	);
};

export default FloatingButton;
