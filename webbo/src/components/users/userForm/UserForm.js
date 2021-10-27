import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
// import emailjs from "emailjs-com";
import DoneIcon from "@material-ui/icons/Done";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import PostUser from "../apiRequests/PostUser";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import SelectField from "../../UI/SelectField";
import { Container } from "@material-ui/core";
import ActionValidator from "../../../validators/ActionValidator";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */

const initialState = {
  indexNumber: "",
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  creationDate: "",
  institutionFK: "",
  roleFK: "",
};
function UserForm() {
  //path handling hooks
  let history = useHistory();
  let params = useParams();
  //state for differentiating between add and update pages
  const [isUpdate, setIsUpdate] = useState(true);
  //other hooks
  const { t } = useTranslation();
  const classes = useStyles();
  const ctx = useContext(MsgBoxContext);
  const getRow = useGlobalState()[1];
  //state for modal window
  const [type, setType] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //state for select field menu items
  const [menuItemsObject, setMenuItemsObject] = useState({});
  //input and select fields state
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
  //fetching menu items for select field
  useEffect(() => {
    if (params.userId === undefined) {
      fetchSelectFieldMenuItems(["institutions", "roleFK"]).then((data) =>
          setMenuItemsObject(data)
      );
      if (isUpdate) {
        setIsUpdate(false);
      }
    } else {
      fetchSelectFieldMenuItems(["institutions","roleFK"]).then((data) =>
        setMenuItemsObject(data)
      );
      let model = getRow(params.userId);
      console.log("model", model)
      delete model["roleName"];
      delete model["institutionName"];
      if (model === undefined || model === null || Object.keys(model) <= 0) {
        history.goBack();
      } else {
        let temp;
        temp = useInputFormValidation.validateAllValues(model);
        setInputFieldValuesObject(model);
        setValidationMessageAndValidityObject(temp);
        setFormIsValid(useInputFormValidation.validateWholeForm(temp));
        setIsUpdate(true);
      }
    }
  }, []);
  //setting is active state with checkbox
  const activeHandler = (event) => {
    setInputFieldValuesObject({
      ...inputFieldValuesObject,
      active: event.target.checked,
    });
  };
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
  useEffect(() => {
    if (params.userId === undefined && isUpdate === true) {
      fetchSelectFieldMenuItems(["institutions", "roleFK"]).then((data) =>
        setMenuItemsObject(data)
      );
      setIsUpdate(false);
      let temp = useInputFormValidation.validateAllValues(initialState);
      setInputFieldValuesObject(initialState);
      setValidationMessageAndValidityObject(temp);
      setFormIsValid(useInputFormValidation.validateWholeForm(temp));
    }
  }, [params.userId]);

  async function saveClickHandler(event) {
    event.preventDefault();
    let response = {};
    let user = inputFieldValuesObject;
    if (isUpdate) {
      setType("done");
      setTitle("successTitle");
      setContent("successContentUpdate");
      console.log("user",user)
      response = await PostUser(user).then((data) => {
        return data;
      });
    } else {
      setType("done");
      setTitle("successTitle");
      setContent("successContentAdd");
      response = await PostUser(user).then((data) => {
        return data;
      });
    }
    if (response !== undefined) {
      if (response.isValid === true) {
        let temp = useInputFormValidation.validateAllValues(initialState);
        setInputFieldValuesObject(initialState);
        setFormIsValid(useInputFormValidation.validateWholeForm(temp));
      } else if (response.isValid === false) {
        if (response.info === "Email already exists") {
          setType("error");
          setTitle("emailExistsErrorTitle");
          setContent("emailExistsErrorContent");
        } else if (response.info === "Username already exists") {
          setType("error");
          setTitle("usernameExistsErrorTitle");
          setContent("usernameExistsErrorContent");
        } else {
          setType("error");
          setTitle("errorTitle");
          setContent("errorContent");
        }
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
    if (isUpdate) {
      history.goBack();
    }
  };
  return (
    <TemplateForm
      title={isUpdate ? t("updateUser") : t("addUser")}
      size="small"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name="indexNumber"
            label={t("indexNumber")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["indexNumber"]}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="userName"
            label={t("username")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["userName"]}
            required={true}
          />
        </Grid>
        {!isUpdate && (
          <Grid item xs={12} sm={6}>
            <InputField
              name="password"
              label={t("password")}
              value={inputFieldValuesObject}
              valueHandler={handleChange}
              validationValues={validationMessageAndValidityObject["password"]}
              required={true}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <InputField
            name="firstName"
            label={t("name")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["firstName"]}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="lastName"
            label={t("surname")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["lastName"]}
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name="email"
            label={t("e-mail")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["email"]}
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name="creationDate"
            label={t("creationDate")}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={
              validationMessageAndValidityObject["creationDate"]
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name="institutionFK"
            id="institutions"
            menuItemsData={menuItemsObject}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={
              validationMessageAndValidityObject["institutionFK"]
            }
          />
        </Grid>
        
          <Grid item xs={12} sm={6}>
            <SelectField
              name="roleFK"
              id="roleFK"
              label="roleFK"
              menuItemsData={menuItemsObject}
              value={inputFieldValuesObject}
              valueHandler={handleChange}
              validationValues={validationMessageAndValidityObject["roleFK"]}
              readonly={isUpdate}
            />
          </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={inputFieldValuesObject["active"]}
                onChange={activeHandler}
                name="active"
                color="primary"
              />
            }
            label={t("active")}
          />
        </Grid>
      </Grid>
      <Container className={classes.buttons}>
        {params.userId && (
          <Button
            onClick={() => history.goBack()}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {t("back")}
          </Button>
        )}
        {params.userId && ActionValidator("users.manageClaims") && (
          <Button
            onClick={() =>
              history.push(
                "/administration/users/claimManagement/" + params.userId
              )
            }
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {t("manageRoles")}
          </Button>
        )}
        <Button
          type="submit"
          disabled={!formIsValid}
          onClick={saveClickHandler}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {isUpdate ? t("save") : t("addUser")}
        </Button>
        {ctx.isModalOn && (
          <MsgBox
            type={type}
            title={title}
            content={content}
            handleOK={handleModal}
            handleBackdropClick={type === "done" ? handleModal : () => {}}
          />
        )}
      </Container>
    </TemplateForm>
  );
}

export default UserForm;
