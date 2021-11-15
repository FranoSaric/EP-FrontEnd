import React from 'react';
import "./ButtonContainer.css"
/**
 * 
 * @param {*} props 
 * @returns 
 */
const ButtonContainer = (props) => {
	return (
		<div className="buttonContainer">
			{props.children}
		</div>
	)
}

export default ButtonContainer
