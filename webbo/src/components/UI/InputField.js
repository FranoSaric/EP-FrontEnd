import React, { useState } from "react";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useTranslation } from "react-i18next";
/**
 * Textfield with properties and handlers fowarded from Signup
 * @param {boolean} isTouched used for determening whether the input field touched
 * @param {boolean} inputIsValid used for determening whether the user input is valid
 * @param {string} errorMessage message that informs the user whether thr input is invalid
 * @param {string} type id, name, and autocomplete value
 * @param {string} label value placed inside the input field when there is no value typed in
 * @param {boolean} autoFocus used for immediate focusing on the input field upon rendering the page
 * @param {function} changeHandler used to store entered value in state
 * @param {function} onBlurHandler used for setting the isTouched value to true and generating initial error message
 * @param {string} value user-entered value
 */
const InputField = (props) => {
	const [showPassword, setshowPassword] = useState(false);
	const [isBlured, setIsBlured] = useState(false);
	const toggleVisibility = () => {
		setshowPassword(!showPassword);
	};
	const { t } = useTranslation();
	let adornment;
	let disablePaste = false;
	if (props.type ? props.type==="password" : props.name === "password") {
		adornment = (
			<InputAdornment position="end">
				<IconButton tabIndex="-1" onClick={toggleVisibility}>
					{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
				</IconButton>
			</InputAdornment>
		);
		disablePaste = true;
	}

	const onBlurHandler = (event) => {
		props.valueHandler(event);
		if (isBlured !== true) {
			setIsBlured(true);
		}
	};
	const paste = (event) => {
		if (disablePaste) {
			event.preventDefault();
		}
	};
	return (
		<TextField
			name={props.name}
			fullWidth
			margin={props.margin}
			variant={props.variant}
			required={props.required}
			type={showPassword ? "text" : props.type ? props.type : props.name}
			autoComplete={props.name}
			autoFocus={props.autoFocus}
			error={!props.validationValues.isValid && isBlured}
			helperText={isBlured && t(props.validationValues.message)}
			label={props.label}
			onChange={props.valueHandler}
			onBlur={onBlurHandler}
			value={props.value[props.name]}
			InputProps={{
				readOnly: props.readonly,
				endAdornment: adornment,
			}}
			onPaste={paste}
		/>
	);
};

export default InputField;
