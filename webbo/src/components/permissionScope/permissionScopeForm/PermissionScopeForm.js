import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import DoneIcon from "@material-ui/icons/Done";
import PostPermissionScope from "../apiRequests/PostPermissionScope";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import useFormValidation from "../../../hooks/use-formValidation";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */
const initialState = {
	name: "",
	active: 0,
};
function PermissionScopeForm() {
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
	//state for response status when data are posted on server
	const [responseStatus, setResponseStatus] = useState();
	//state for input values
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

	const activeHandler = (event) => {
		console.log(event.target.checked);
		let temp = 0;
		if (event.target.checked) {
			temp = 1;
		}
		setInputFieldValuesObject({ ...inputFieldValuesObject, active: temp });
	};

	// used to check if it's add new or update existing item
	useEffect(() => {
		if (params.scopeId) {
			//dohvati podatke za taj id
			const model = getRow(params.scopeId);
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
			}
		}
	}, [params.scopeId]);

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
		let scopes = {};
		if (isUpdate) {
			setType("done");
			setTitle("successTitle");
			setContent("successContentUpdate");
			delete inputFieldValuesObject["id"];
			scopes = {
				...inputFieldValuesObject,
				idPermissionScope: parseInt(params.scopeId),
			};
		} else {
			setType("done");
			setTitle("successTitle");
			setContent("successContentAdd");
			scopes = inputFieldValuesObject;
		}

		response = await PostPermissionScope(scopes).then((data) => {
			return data;
		});

		if (response !== undefined) {
			setResponseStatus(response.status);
			if (response.status === 101) {
				let temp =
					useInputFormValidation.validateAllValues(initialState);
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
		<TemplateForm
			title={
				isUpdate ? t("updatePermissionScope") : t("addPermissionScope")
			}
		>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<InputField
						name="name"
						label={t("name")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["name"]
						}
						required={true}
					/>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={
						<Checkbox
							checked={inputFieldValuesObject["active"] === 0 ? false : true}
							onChange={activeHandler}
							name="active"
							color="primary"
						/>
					}
					label={t("active")}
				/>
			</Grid>
			<div className={classes.buttons}>
				{params.scopeId && (
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
					{isUpdate ? t("save") : t("addType")}
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

export default PermissionScopeForm;
