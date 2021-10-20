import { useEffect, useState } from "react";
import userName from "./actions/validationUsername";
import firstName from "./actions/validationName";
import lastName from "./actions/validationName";
import password from "./actions/validationPassword";
import newPassword from "./actions/validationPassword";
import newPassword2 from "./actions/validationPassword";
import oldPassword from "./actions/validationPassword";
import phoneNumber from "./actions/validationPhoneNumber";
import email from "./actions/validationEmail";
import coordinates from "./actions/validationCoordinates";
import locationStreet from "./actions/validationLocationStreet";
import userType from "./actions/validationUserType";
import partnerID from "./actions/validationUserType";
import description from "./actions/validationDescription";
import nazivMjesta from "./actions/validationDescription";
import nazivDrzave from "./actions/validationDescription";
import states from "./actions/validationUserType";
import id from "./actions/validationUserType";
import drzavaID from "./actions/validationUserType";
import kraticaDrzave from "./actions/validationISO3"; 
import isO2 from "./actions/validationISO2";
import isO3 from "./actions/validationISO3";
import language from "./actions/validationISO3";
import name from "./actions/validationDescription";
import active from "./actions/validationUserType";
import scopePermissionID from "./actions/validationUserType";
import scopePermissionName from "./actions/validationDescription";
import permissionScopeID from "./actions/validationUserType";
import type from "./actions/validationDescription";
import value from"./actions/validationDescription";
import productID from "./actions/validationUserType";
import productName from  "./actions/validationDescription";

const validate = {
	userName,
	firstName,
	lastName,
	password,
	newPassword,
	newPassword2,
	oldPassword,
	phoneNumber,
	email,
	coordinates,
	locationStreet,
	userType,
	partnerID,
	description,
	states,
	id,
	drzavaID,
	nazivMjesta,
	nazivDrzave,
	kraticaDrzave,
	isO2,
	isO3,
	name,
	active,
	scopePermissionID,
	scopePermissionName,
	permissionScopeID,
	type,
	value,
	productID,
	productName,
	language,
};

const useInputFormValidation = {
	
	validateAllValues: function(valuesObject){
		let temp;
		for (const [key, value] of Object.entries(valuesObject)) {
			temp = {
				...temp,
				[key]: {
					message: validate[key](value),
					isValid: validate[key](value) === "",
				},
			};
		}
		return temp;
	},

	validateSingleValue: function(name, value){
		return {
			message: validate[name](value),
			isValid: validate[name](value) === "",
		};
	},
	
	validateWholeForm: function(validationValuesObject){
		for (const [key, value] of Object.entries(validationValuesObject)) {
			if (value.isValid === false) {
				return false;
			}
		}
		return true;
	},
};

export default useInputFormValidation;
