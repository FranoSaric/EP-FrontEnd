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
import PostCourse from "../apiRequests/PostCourse";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import SelectField from "../../UI/SelectField";
import { Container } from "@material-ui/core";
import ActionValidator from "../../../validators/ActionValidator";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */

const initialState = {
    name: "",
    academicYear: new Date(),
    semester: "",
    studyFK: "",
    userFK: "",
};
function CourseForm() {
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
    const [responseStatus, setResponseStatus] = useState();
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
        if (params.courseId === undefined) {
            fetchSelectFieldMenuItems(["studies", "users"]).then((data) =>
                setMenuItemsObject(data)
            );
            if (isUpdate) {
                setIsUpdate(false);
            }
        } else {
            fetchSelectFieldMenuItems(["studies", "users"]).then((data) =>
                setMenuItemsObject(data)
            );
            let model = getRow(params.courseId);
            delete model["userName"];
            delete model["studyName"];
            if (
                model === undefined ||
                model === null ||
                Object.keys(model) <= 0
            ) {
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
            temp[name].message !==
            validationMessageAndValidityObject[name].message
        ) {
            setValidationMessageAndValidityObject(temp);
        }
        setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
    };

    const handleDateTimeChange = (newValue) => {
      let temp = {
          ...validationMessageAndValidityObject,
          ["academicYear"]: useInputFormValidation.validateSingleValue(
              "academicYear",
              newValue
          ),
      };
      if (formIsValid !== useInputFormValidation.validateWholeForm(temp)) {
          setFormIsValid(useInputFormValidation.validateWholeForm(temp));
      }
      if (
          temp["academicYear"].message !==
          validationMessageAndValidityObject["academicYear"].message
      ) {
          setValidationMessageAndValidityObject(temp);
      }
      setInputFieldValuesObject({
          ...inputFieldValuesObject,
          ["academicYear"]: newValue,
      });
  };

    useEffect(() => {
        if (params.courseId === undefined && isUpdate === true) {
            fetchSelectFieldMenuItems(["users", "studies"]).then((data) =>
                setMenuItemsObject(data)
            );
            setIsUpdate(false);
            let temp = useInputFormValidation.validateAllValues(initialState);
            setInputFieldValuesObject(initialState);
            setValidationMessageAndValidityObject(temp);
            setFormIsValid(useInputFormValidation.validateWholeForm(temp));
        }
    }, [params.courseId]);

    async function saveClickHandler(event) {
        event.preventDefault();
        let response = {};
        let course = inputFieldValuesObject;
        if (isUpdate) {
            setType("done");
            setTitle("successTitle");
            setContent("successContentUpdate");
            response = await PostCourse(course).then((data) => {
                return data;
            });
        } else {
            setType("done");
            setTitle("successTitle");
            setContent("successContentAdd");
            response = await PostCourse(course).then((data) => {
                return data;
            });
        }
        if (response !== undefined) {
            setResponseStatus(response.status);
            if (response.status === 101) {
                setType("done");
                setTitle("successTitle");
                setContent("successContentUpdate");
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
        if (isUpdate) {
            history.goBack();
        }
    };
    return (
        <TemplateForm
            title={isUpdate ? t("updateCourse") : t("addCourse")}
            size="small"
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            name="academicYear"
                            renderInput={(props) => <TextField {...props} />}
                            label={t("academicYear")}
                            value={inputFieldValuesObject["academicYear"]}
                            onChange={handleDateTimeChange}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        name="semester"
                        label={t("semester")}
                        value={inputFieldValuesObject}
                        valueHandler={handleChange}
                        validationValues={
                            validationMessageAndValidityObject["semester"]
                        }
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectField
                        name="studyFK"
                        id="studies"
                        label="studies"
                        menuItemsData={menuItemsObject}
                        value={inputFieldValuesObject}
                        valueHandler={handleChange}
                        validationValues={
                            validationMessageAndValidityObject["studyFK"]
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <SelectField
                        name="userFK"
                        id="users"
                        label="userFK"
                        menuItemsData={menuItemsObject}
                        value={inputFieldValuesObject}
                        valueHandler={handleChange}
                        validationValues={
                            validationMessageAndValidityObject["userFK"]
                        }
                        readonly={isUpdate}
                    />
                </Grid>
            </Grid>
            <Container className={classes.buttons}>
                {params.courseId && (
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
                    type="submit"
                    disabled={!formIsValid}
                    onClick={saveClickHandler}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    {isUpdate ? t("save") : t("addCourse")}
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
            </Container>
        </TemplateForm>
    );
}

export default CourseForm;
