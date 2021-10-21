import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import PostBook from "../apiRequests/PostBook";
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
	barCode: "",
	name: "",
	author: "",
	categoryFK: ""
};
function BookForm() {
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
		fetchSelectFieldMenuItems(["categories"]).then((data) =>
			setMenuItemsObject(data)
		);
		if (params.bookId !== undefined) {
			let model = getRow(params.bookId);
			delete model["categoryName"];
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
	}, [params.bookId]);
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
		let books = {};
		if (isUpdate) {
		setType("done");
		setTitle("successTitle");
		setContent("successContentUpdate");
		books = {
			...inputFieldValuesObject,
			id: parseInt(params.bookId),
		};
		}else {
			setType("done");
			setTitle("successTitle");
			setContent("successContentAdd");
			books = inputFieldValuesObject;
		}
		console.log("update book", books)

		response = await PostBook(books).then((data) => {
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
		<TemplateForm title={isUpdate ? t("updateBook") : t("addBook")}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<SelectField
						id={"categories"}
						name={"categoryFK"}
						menuItemsData={menuItemsObject}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["categoryFK"]
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
						name="author"
						label={t("author")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["author"]
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						name="barCode"
						label={t("barCode")}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
						validationValues={
							validationMessageAndValidityObject["barCode"]
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
					{isUpdate ? t("save") : t("addBook")}
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

export default BookForm;
