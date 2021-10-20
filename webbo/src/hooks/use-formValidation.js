import { useState, useEffect } from "react";
/**
 *
 * @param {object} list object with boolean properties, one for determining validity of each input.
 * 						Based on those properties it is determined whether the form is valid
 * @param {array} dependenciesArray array of pointers to object properties from "list"
 * @returns
 */

const useFormValidation = (validationObject, setValidationObject, dependenciesArray) => {
	const [formIsInvalid, setFormIsInvalid] = useState(true);
	const validationObjectHandler = (type, value) => {
		let temp = validationObject;
		temp[type] = value;
		setValidationObject(temp);
	};
	const resetFormIsInvalid = () => {
		setFormIsInvalid(true);
	};
	useEffect(() => {
		let validity = false;
		for (const key in validationObject) {
			if (validationObject[key] === false) {
				validity = true;
			}
		}
		setFormIsInvalid(validity);
	}, dependenciesArray);
	return { formIsInvalid, validationObjectHandler, resetFormIsInvalid };
};

export default useFormValidation;
