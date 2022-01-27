import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import PostExam from "../apiRequests/PostExam";
import InputField from "../../UI/InputField";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import SelectField from "../../UI/SelectField";
import { Container } from "@material-ui/core";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */

const initialState = {
  date: new Date(),
  courseFK: "",
  classroomFK: "",
};
function ExamForm() {
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
    if (params.examId === undefined) {
      fetchSelectFieldMenuItems(["courses", "classrooms"]).then((data) =>
        setMenuItemsObject(data)
      );
      if (isUpdate) {
        setIsUpdate(false);
      }
    } else {
      fetchSelectFieldMenuItems(["courses", "classrooms"]).then((data) =>
        setMenuItemsObject(data)
      );
      let model = getRow(params.examId);
      delete model["courseName"];
      delete model["classroomName"];
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

  let dateName = "";
  const handleDateTimeChange = (name, newValue) => {
    if (name === "date") {
      dateName = "date";
    }
    let temp = {
      ...validationMessageAndValidityObject,
      [dateName]: useInputFormValidation.validateSingleValue(
        dateName,
        newValue
      ),
    };
    if (formIsValid !== useInputFormValidation.validateWholeForm(temp)) {
      setFormIsValid(useInputFormValidation.validateWholeForm(temp));
    }
    if (
      temp[dateName].message !==
      validationMessageAndValidityObject[dateName].message
    ) {
      setValidationMessageAndValidityObject(temp);
    }
    setInputFieldValuesObject({
      ...inputFieldValuesObject,
      [dateName]: newValue,
    });
  };

  useEffect(() => {
    if (params.examId === undefined && isUpdate === true) {
      fetchSelectFieldMenuItems(["courses", "classrooms"]).then((data) =>
        setMenuItemsObject(data)
      );
      setIsUpdate(false);
      let temp = useInputFormValidation.validateAllValues(initialState);
      setInputFieldValuesObject(initialState);
      setValidationMessageAndValidityObject(temp);
      setFormIsValid(useInputFormValidation.validateWholeForm(temp));
    }
  }, [params.examId]);

  async function saveClickHandler(event) {
    event.preventDefault();
    let response = {};
    let exam = inputFieldValuesObject;
    if (isUpdate) {
      setType("done");
      setTitle("successTitle");
      setContent("successContentUpdate");
      response = await PostExam(exam).then((data) => {
        return data;
      });
    } else {
      setType("done");
      setTitle("successTitle");
      setContent("successContentAdd");
      response = await PostExam(exam).then((data) => {
        return data;
      });
    }
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
    if (isUpdate) {
      history.goBack();
    }
  };

  return (
    <ContentWrapper
      link="/administration/exams/examsManagement"
      title={isUpdate ? t("updateExam") : t("addExam")}
      size="small"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              name="date"
              renderInput={(props) => <TextField {...props} />}
              label={t("date")}
              value={inputFieldValuesObject["date"]}
              onChange={(dateValue) => {
                handleDateTimeChange("date", dateValue);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name="courseFK"
            id="courses"
            label="courses"
            menuItemsData={menuItemsObject}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["courseFK"]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name="classroomFK"
            id="classrooms"
            label="classrooms"
            menuItemsData={menuItemsObject}
            value={inputFieldValuesObject}
            valueHandler={handleChange}
            validationValues={validationMessageAndValidityObject["classroomFK"]}
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
          {isUpdate ? t("save") : t("addExam")}
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
    </ContentWrapper>
  );
}

export default ExamForm;
