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
import id from "./actions/validationUserType";
import name from "./actions/validationDescription";
import active from "./actions/validationUserType";
import type from "./actions/validationDescription";
import value from"./actions/validationDescription";
import institutionId from "./actions/validationUserType";
import institutionFK from "./actions/validationUserType";
import author from "./actions/validationCharacter";
import barCode from "./actions/validationBarCode";
import roleName from "./actions/validationUsername";
import institutionName from "./actions/validationUsername";
import categoryFK from "./actions/validationUserType";
import roleFK from "./actions/validationUserType";
import creationDate from "./actions/validateAll";
import indexNumber from "./actions/validationIndexNumber";
import address from "./actions/validationAddress";
import giroAccount from "./actions/validationGiroAccount";
import contact from "./actions/validationPhoneNumber";
import numberOfClassroom from "./actions/validationNumber";
import numberOfSeats from "./actions/validationNumber";
import floor from "./actions/validationNumber";
import free from "./actions/validationNumber";
import year from "./actions/validationNumber";
import cycle from "./actions/validationCharacter";
import academicYear from "./actions/validateAll";
import semester from "./actions/validationNumber";
import studyFK from "./actions/validationNumber";
import userFK from "./actions/validationNumber";
import pickUpDate from "./actions/validateAll";
import returnDate from "./actions/validateAll";
import bookFK from "./actions/validationNumber";
import libraryFK from "./actions/validationNumber";
import classroomFK from "./actions/validationNumber";
import checkInTime from "./actions/validateAll";
import date from "./actions/validateAll";
import startTime from "./actions/validateAll";
import endTime from "./actions/validateAll";
import duration from "./actions/validationNumber";
import courseFK from "./actions/validationNumber";
import courseName from "./actions/validationNumber";
import classroomName from "./actions/validationNumber";

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
	id,
	name,
	type,
	value,
	active,
	institutionId,
	institutionFK,
	author,
	barCode,
	categoryFK,
	roleFK,
	creationDate,
	indexNumber,
	roleName,
	institutionName,
	address,
	giroAccount,
	contact,
	numberOfClassroom,
	numberOfSeats,
	floor,
	free,
	year,
	cycle,
	academicYear,
	semester,
	studyFK,
	userFK,
	pickUpDate,
	returnDate,
	bookFK,
	libraryFK,
	classroomFK,
	classroomName,
	checkInTime,
	date,
	startTime,
	endTime,
	duration,
	courseFK,
	courseName
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
