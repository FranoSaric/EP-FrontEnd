import React, { useContext, useState } from "react";
import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Typography,
} from "@material-ui/core";
import Copyright from "../dashboard/Copyright";
import useStyles from "./SignInStyles";
import { Redirect } from "react-router-dom";
import InputField from "../UI/InputField";
import MsgBox from "../msgBox/MsgBox";
import MsgBoxContext from "../../store/MsgBoxContext";
import { useTranslation } from "react-i18next";
import parseJwt from "../../functions/parseJwt";
import useInputFormValidation from "../../hooks/use-inputFormValidation";
import SignInRequest from "./apiRequest/SignInRequest";
import logo from "../../assets/back-office-logo2.png";
import ClaimPacker from "./ClaimPacker";

/**
 * Base signin component with validation
 * @returns
 */
const initialState = { email: "", password: "" };
export default function SignIn() {
    //input field values
    const [inputFieldValuesObject, setInputFieldValuesObject] =
        useState(initialState);
    // const [rememberMe, setRememberMe] = useState(false);
    //validation states
    const [
        validationMessageAndValidityObject,
        setValidationMessageAndValidityObject,
    ] = useState(
        useInputFormValidation.validateAllValues(inputFieldValuesObject)
    );
    const [formIsValid, setFormIsValid] = useState(false);
    //other hooks
    const { t } = useTranslation();
    const ctx = useContext(MsgBoxContext);
    console.log(inputFieldValuesObject);
    // const rememberMeHandler = () => {
    // 	const temp = rememberMe;
    // 	setRememberMe(!temp);
    // };
    let debounce;
    const handleInputChange = (event) => {
        event.preventDefault();
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const { name, value } = event.target;
            let temp = {
                ...validationMessageAndValidityObject,
                [name]: useInputFormValidation.validateSingleValue(name, value),
            };
            if (
                formIsValid !== useInputFormValidation.validateWholeForm(temp)
            ) {
                setFormIsValid(useInputFormValidation.validateWholeForm(temp));
            }
            if (
                temp[name].message !==
                validationMessageAndValidityObject[name].message
            ) {
                setValidationMessageAndValidityObject(temp);
            }
            setInputFieldValuesObject({
                ...inputFieldValuesObject,
                [name]: value,
            });
        }, 300);
    };
    async function submitClickHandler(event) {
        event.preventDefault();
        let model = inputFieldValuesObject;
        let response = await SignInRequest(model).then((data) => {
            return data;
        });
        if (response === undefined) {
            ctx.setIsModalOn(true);
        } else {
            console.log(response);
            let claims = ClaimPacker(response.claims);
            // localStorage.setItem("role", temp.role);
            // localStorage.setItem("partnerId", temp.partnerId);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("claims", JSON.stringify(claims));
            // localStorage.setItem("rememberMe", rememberMe);
            // localStorage.setItem(
            // 	"username",
            // 	inputFieldValuesObject["userName"]
            // );
            // localStorage.setItem("authLevel", 4);
            // localStorage.setItem("authenticated", true);
            setInputFieldValuesObject(initialState);
            setFormIsValid(false);
        }
    }
    const classes = useStyles();

    if (localStorage.getItem("accessToken")) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Container component="main" maxWidth="xs" className={classes.paper}>
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.logo} src={logo} alt="" />

                <Typography
                    className={classes.signin}
                    component="h1"
                    variant="h5"
                >
                    {t("signIn")}
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={submitClickHandler}
                >
                    <InputField
                        margin="normal"
                        variant="outlined"
                        name="email"
                        label={t("email")}
                        value={inputFieldValuesObject["email"]}
                        valueHandler={handleInputChange}
                        validationValues={
                            validationMessageAndValidityObject["email"]
                        }
                        autoFocus={true}
                        required={true}
                    />
                    <InputField
                        margin="normal"
                        variant="outlined"
                        name="password"
                        label={t("password")}
                        value={inputFieldValuesObject["password"]}
                        valueHandler={handleInputChange}
                        validationValues={
                            validationMessageAndValidityObject["password"]
                        }
                        autoFocus={false}
                        required={true}
                    />
                    {/* <FormControlLabel
						control={
							<Checkbox
								value="remember"
								color="primary"
								onChange={rememberMeHandler}
								checked={rememberMe}
							/>
						}
						label={t("rememberMe")}
					/> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formIsValid}
                    >
                        {t("signIn")}
                    </Button>
                    <Container>
                        <Grid item xs>
                            <Link href="http://diplomat.ba/" variant="body2">
                                {t("forgotPassword")}
                            </Link>
                        </Grid>
                    </Container>
                </form>
            </div>
            <Copyright />
            {ctx.isModalOn && (
                <MsgBox
                    type="error"
                    title="falseInfoTitle"
                    content="falseInfoContent"
                />
            )}
        </Container>
    );
}
