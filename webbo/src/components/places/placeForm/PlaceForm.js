import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import PostPlace from "../apiRequests/PostPlace";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import useFormValidation from "../../../hooks/use-formValidation";
import SelectField from "../../UI/SelectField";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */
const initialState = {
	nazivMjesta: "",
	drzavaID: "",
};
function PlaceForm() {
	//path handling hooks
	let history = useHistory();
	const params = useParams();
	//state for differentiating between add and update pages
	const [isUpdate, setIsUpdate] = useState(false);
	//other hooks
	const { t } = useTranslation();
	const ctx = useContext(MsgBoxContext);
	const classes = useStyles();
	const getRow = useGlobalState()[1];
	//state for modal window
	const [type, setType] = useState("done");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	// state for select field menu items
	const [menuItemsObject, setMenuItemsObject] = useState({});
	//state for response status when data are posted on server
	const [responseStatus, setResponseStatus] = useState();
	//input fields state
	const [inputFieldValuesObject, setInputFieldValuesObject] =
		useState(initialState);
	//state for form validity checks
	const [
		validationMessageAndValidityObject,
		setValidationMessageAndValidityObject,
	] = useState(
		useInputFormValidation.validateAllValues(inputFieldValuesObject)
	);
	const [formIsValid, setFormIsValid] = useState(false);

	// used to check if it's add new or update existing item
	useEffect(() => {
		fetchSelectFieldMenuItems(["states"]).then((data) =>
			setMenuItemsObject(data)
		);
		if (params.placeId !== undefined) {
			let model = getRow(params.placeId);
			console.log("model", model)
			if (
				model === undefined ||
				model === null ||
				Object.keys(model) <= 0
			) {
				history.goBack();
			} else {
				let temp;
				for (const [key, value] of Object.entries(model)) {
					if (value === null || value === undefined) {
						model = {
							...model,
							[key]: "",
						};
					}
				}
				temp = useInputFormValidation.validateAllValues(model);
				setInputFieldValuesObject(model);
				setValidationMessageAndValidityObject(temp);
				setFormIsValid(useInputFormValidation.validateWholeForm(temp));
				setIsUpdate(true);
			}
		} else {
			if (isUpdate) {
				setIsUpdate(false);
				let temp = useInputFormValidation.validateAllValues(initialState);
			setInputFieldValuesObject(initialState);
			setValidationMessageAndValidityObject(temp);
			setFormIsValid(useInputFormValidation.validateWholeForm(temp));
			}
		}
	}, [params.placeId]);
	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let temp = {
			...validationMessageAndValidityObject,
			[name]: useInputFormValidation.validateSingleValue(name, value),
		};
		if (formIsValid !== useInputFormValidation.validateWholeForm(temp)) {
			setFormIsValid(useInputFormValidation.validateWholeForm(temp));
		}
		if (
			temp[name].message !==
			validationMessageAndValidityObject[name].message
		) {
			setValidationMessageAndValidityObject(temp);
		}
		setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
	};
	async function saveClickHandler(event) {
		event.preventDefault();
		let response = {};
		let places = {};
		if (isUpdate) {
		setType("done");
		setTitle("successTitle");
		setContent("successContentUpdate");
		delete inputFieldValuesObject["id"]
		delete inputFieldValuesObject["nazivDrzave"]
		places = {
			...inputFieldValuesObject,
			idMjesto: parseInt(params.placeId),
		};
		}else {
			setType("done");
			setTitle("successTitle");
			setContent("successContentAdd");
			places = inputFieldValuesObject;
		}

		response = await PostPlace(places).then((data) => {
		    return data;
		});

		if (response !== undefined) {
		    setResponseStatus(response.status);
		    if (response.status === 101) {
		        setType("done");
				setTitle("successTitle");
				setContent("successContentUpdate");
				let tempVal ={...inputFieldValuesObject, nazivMjesta: ""};
				let temp = useInputFormValidation.validateAllValues(tempVal);
				setInputFieldValuesObject(tempVal);
				setFormIsValid(useInputFormValidation.validateWholeForm(temp));
		    } else {
		        setType("error");
		        setTitle("errorTitle");
		        setContent("errorContent");
		    }
		} else {
		    setType("error");
		    setTitle("errorTitle");
		    setContent("errorContent");
		}

		ctx.setIsModalOn(true);
	}

	const handleModal = () => {
		ctx.setIsModalOn(false);
		if (isUpdate && responseStatus === 101) {
			history.goBack();
		}
	};
	
	return (
		<TemplateForm title={isUpdate ? t("updatePlace") : t("addPlace")}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<SelectField
						id={"states"}
						name={"drzavaID"}
						menuItemsData={menuItemsObject}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["drzavaID"]
						}
						readonly={isUpdate}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						name="nazivMjesta"
						label={t("nazivMjesta")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["nazivMjesta"]
						}
					/>
				</Grid>
			</Grid>
			<div className={classes.buttons}>
				{params.placeId && (
					<Button
						onClick={() => history.goBack()}
						variant="contained"
						color="primary"
						className={classes.button}
					>
						{t("back")}
					</Button>
				)}
				<Button
					disabled={!formIsValid}
					onClick={saveClickHandler}
					variant="contained"
					color="primary"
					className={classes.button}
				>
					{isUpdate ? t("save") : t("addPlace")}
				</Button>
				{ctx.isModalOn && (
					<MsgBox
						type={type}
						title={title}
						content={content}
						handleOK={handleModal}
						handleBackdropClick={
							type === "done" ? handleModal : () => {}
						}
					/>
				)}
			</div>
		</TemplateForm>
	);
}

export default PlaceForm;
