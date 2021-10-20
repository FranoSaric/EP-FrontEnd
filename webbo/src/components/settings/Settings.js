import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "../UI/TemplateForm/TemplateFormStyles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Container } from "@material-ui/core";
import TemplateForm from "../UI/TemplateForm/TemplateForm";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import { useTranslation } from "react-i18next";
import SelectField from "../UI/SelectField";
import useInputFormValidation from "../../hooks/use-inputFormValidation";
/**
 * Settings form for changing language and timezone
 * @returns
 */

function Settings() {
	//state for select field menu items
	const [menuItemsObject, setMenuItemsObject] = useState({
		language: [
			{ value: "hr", name: "Hrvatski" },
			{ value: "en", name: "English" },
		],
	});
	//input and select fields state
	const [inputFieldValuesObject, setInputFieldValuesObject] = useState({
		language: 'en',
	});
	const [formIsValid, setFormIsValid] = useState(false);

	const [tz, setTz] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);
	useEffect(() => {
		console.log(window.navigator.language)
		if(localStorage.getItem("language") !== null){
			console.log("not window", localStorage.getItem("language"))
			setInputFieldValuesObject({language: localStorage.getItem("language")})
		}else{
			setInputFieldValuesObject({language: window.navigator.language.split("-")[0]})
		}
	}, []);
	const classes = useStyles();

	const { t } = useTranslation();
	useEffect(() => {
		const tzValue = tz.value ?? tz;
	}, [tz]);
	//setting values in state on every click
	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let temp = {
			[name]: useInputFormValidation.validateSingleValue(name, value),
		};
		if (formIsValid !== useInputFormValidation.validateWholeForm(temp)) {
			setFormIsValid(useInputFormValidation.validateWholeForm(temp));
		}
		setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
	};
	const changeSettings = (event) => {
		event.preventDefault();
		i18next
			.use(XHR)
			.use(initReactI18next) // passes i18n down to react-i18next
			.init({
				debug: false,
				lng: inputFieldValuesObject.language,
				fallbackLng: "en",
				ns: ["translation"],
				defaultNS: "translation",
				backend: {
					loadPath:
						process.env.PUBLIC_URL +
						"/locales/{{ns}}.{{lng}}.json?v=" +
						process.env.REACT_APP_VERSION,
				},
				react: {
					useSuspense: false,
				},
			});
		if (
			inputFieldValuesObject.language !== localStorage.getItem("language")
		) {
			localStorage.setItem("language", inputFieldValuesObject.language);

		}
	};

	return (
		<TemplateForm title={t("userSettings")} size={"small"}>
			<Grid container spacing={3}>
				<Grid item xs={6} sm={6}>
					{/* <FormControl fullWidth margin="dense">
						<InputLabel id="demo-simple-select-label">
							{t("language")}
						</InputLabel>
						<Select
							my={2}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={language}
							onChange={handleLanguageChange}
						>
							<MenuItem value="en">English</MenuItem>
							<MenuItem value="hr">Hrvatski</MenuItem>
						</Select>
					</FormControl> */}
					<SelectField
						name="language"
						id="language"
						label="language"
						menuItemsData={menuItemsObject}
						value={inputFieldValuesObject}
						valueHandler={handleChange}
					/>
				</Grid>
				<Grid item xs={6} sm={6}>
					<Typography variant="caption" gutterBottom>
						{t("timezone")}
					</Typography>
					<Typography variant="h6" gutterBottom>
						{JSON.stringify(tz, null, 2)}
					</Typography>
				</Grid>
			</Grid>
			<Container className={classes.buttons}>
				<Button
					disabled={!formIsValid}
					onClick={changeSettings}
					variant="contained"
					color="primary"
					className={classes.button}
				>
					{t("applySettings")}
				</Button>
			</Container>

			{/* {ctx.isModalOn && <MsgBox type={type} />} */}
		</TemplateForm>
	);
}

export default Settings;