import React, { useState, useContext } from "react";
import { Button, Grid, Container } from "@material-ui/core";
import MsgBox from "../msgBox/MsgBox";
import InputField from "../UI/InputField";
import useStyles from "../UI/TemplateForm/TemplateFormStyles";
import { useTranslation } from "react-i18next";
import MsgBoxContext from "../../store/MsgBoxContext";
import ChangePasswordRequest from "./apiRequests/ChangePasswordAPI";
import useInputFormValidation from "../../hooks/use-inputFormValidation";
import ContentWrapper from "../UI/ContentWrapper/ContentWrapper";
/**
 * Settings form for changing language and timezone
 * @returns
 */
const initialState = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};
function ChangePassword() {
  //state for modal window
  const [type, setType] = useState("updateSuccess");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //other hooks
  const classes = useStyles();
  const { t } = useTranslation();
  const ctx = useContext(MsgBoxContext);
  //input field state
  const [inputFieldValuesObject, setInputFieldValuesObject] =
    useState(initialState);
  //validation state
  const [
    validationMessageAndValidityObject,
    setValidationMessageAndValidityObject,
  ] = useState(
    useInputFormValidation.validateAllValues(inputFieldValuesObject)
  );
  const [formIsValid, setFormIsValid] = useState(false);
  //setting values in state on every click
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
      temp[name].message !== validationMessageAndValidityObject[name].message
    ) {
      setValidationMessageAndValidityObject(temp);
    }
    setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
  };

  async function saveClickHandler(event) {
    event.preventDefault();
    let response = {};
    let model = {};
    if (
      inputFieldValuesObject["newPassword"] !==
      inputFieldValuesObject["newPassword2"]
    ) {
      setType("error");
      setTitle("passwordNotMatchingErrorTitle");
      setContent("passwordMatchingErrorContent");
    } else if (
      inputFieldValuesObject["newPassword"] ===
        inputFieldValuesObject["oldPassword"] ||
      inputFieldValuesObject["newPassword2"] ===
        inputFieldValuesObject["oldPassword"]
    ) {
      setType("error");
      setTitle("passwordMatchingErrorTitle");
      setContent("oldPasswordMatchingErrorContent");
    } else {
      model = {
        ...inputFieldValuesObject,
        id: localStorage.getItem("userID"),
      };
      delete model["newPassword2"];
      response = await ChangePasswordRequest(model).then((data) => {
        return data;
      });
      if (response !== undefined) {
        if (response.status === 101) {
          setType("done");
          setTitle("successTitle");
          setContent("successContentUpdate");
          let temp = useInputFormValidation.validateAllValues(initialState);
          setInputFieldValuesObject(initialState);
          setFormIsValid(useInputFormValidation.validateWholeForm(temp));
        } else if (response.info === "Wrong old password!") {
          setType("error");
          setTitle("falsePasswordTitle");
          setContent("falsePasswordContent");
        } else {
          setType("error");
          setTitle("falseInfoTitle");
          setContent("falseInfoContent");
        }
      }
    }

    ctx.setIsModalOn(true);
  }
  return (
    <ContentWrapper title={t("changePassword")} size="small">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name="oldPassword"
            type="password"
            label={t("oldPassword")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["oldPassword"]}
            required={true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name="newPassword"
            type="password"
            label={t("password")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["newPassword"]}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="newPassword2"
            type="password"
            label={t("oldPassword")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={
              validationMessageAndValidityObject["newPassword2"]
            }
            required={true}
          />
        </Grid>
      </Grid>
      <Container className={classes.buttons}>
        <Button
          type="submit"
          disabled={!formIsValid}
          onClick={saveClickHandler}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {t("applySettings")}
        </Button>
      </Container>

      {ctx.isModalOn && <MsgBox type={type} title={title} content={content} />}
    </ContentWrapper>
  );
}

export default ChangePassword;
