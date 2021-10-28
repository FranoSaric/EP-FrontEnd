import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import PostStudy from "../apiRequests/PostStudy";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import useFormValidation from "../../../hooks/use-formValidation";
import SelectField from "../../UI/SelectField";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */
const initialState = {
	name: "",
	year: "",
	cycle: "",
	institutionFK:""
};
function StudyForm() {
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
		fetchSelectFieldMenuItems(["institutions"]).then((data) =>
			setMenuItemsObject(data)
		);
		if (params.studyId !== undefined) {
			let model = getRow(params.studyId);
			delete model["institutionName"];
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
	}, [params.studyId]);
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
		let studies = {};
		if (isUpdate) {
		setType("done");
		setTitle("successTitle");
		setContent("successContentUpdate");
		studies = {
			...inputFieldValuesObject,
			id: parseInt(params.studyId),
		};
		}else {
			setType("done");
			setTitle("successTitle");
			setContent("successContentAdd");
			studies = inputFieldValuesObject;
		}
		console.log("post data", studies)

		response = await PostStudy(studies).then((data) => {
		    return data;
		});

		if (response !== undefined) {
		    setResponseStatus(response.status);
		    if (response.status === 101) {
		        setType("done");
				setTitle("successTitle");
				setContent("successContentUpdate");
				let temp = useInputFormValidation.validateAllValues(initialState);
				setInputFieldValuesObject(initialState);
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
		<TemplateForm title={isUpdate ? t("updateStudy") : t("addStudy")}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<SelectField
						id={"institutions"}
						name={"institutionFK"}
						menuItemsData={menuItemsObject}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["institutionFK"]
						}
						readonly={isUpdate}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						name="name"
						label={t("name")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["name"]
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						name="year"
						label={t("year")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["year"]
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						name="cycle"
						label={t("cycle")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["cycle"]
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
					{isUpdate ? t("save") : t("addStudy")}
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

export default StudyForm;
