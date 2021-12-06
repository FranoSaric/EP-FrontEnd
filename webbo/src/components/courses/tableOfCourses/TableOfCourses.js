import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useTranslation } from "react-i18next";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import DeleteCourse from "../apiRequests/DeleteCourse";
import SelectField from "../../UI/SelectField";
import { useHistory } from "react-router-dom";
import FloatingButton from "../../UI/FloatingButton/FloatingButton";
import ButtonContainer from "../../UI/Buttons/ButtonContainer";
import ActionValidator from "../../../validators/ActionValidator";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";
/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */
const initialState = {
  userFK: "",
};
function TableOfCourses() {
  let history = useHistory();
  //other hooks
  const { t } = useTranslation();
  const classes = useStyles();
  const ctx = useContext(MsgBoxContext);
  const [refreshState, setRefreshState] = useState("1518");
  //state for modal window
  const [type, setType] = useState("delete");
  const [title, setTitle] = useState("deleteTitle");
  const [content, setContent] = useState("deleteContent");
  // state for select field menu items
  const [menuItemsObject, setMenuItemsObject] = useState();
  //state for select field value
  const [inputFieldValuesObject, setInputFieldValuesObject] =
    useState(initialState);

  const newColumns = columns.map((column) => {
    return { ...column, headerName: t(column.headerName) };
  });
  useEffect(() => {
    fetchSelectFieldMenuItems(["users"]).then((data) =>
      setMenuItemsObject(data)
    );
  }, []);
  //setting values in state on every click
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
  };

  async function handleDelete() {
    if (type === "delete") {
      const model = {
        id: ctx.itemId,
      };
      const data = await DeleteCourse(model);

      if (data === undefined || data.status !== 101) {
        setType("error");
        setTitle("errorTitle");
        setContent("errorContent");
      } else {
        setType("done");
        setTitle("successTitle");
        setContent("successContentDelete");
      }
    } else {
      ctx.setItemId(0);
      ctx.setIsModalOn(false);
      setRefreshState(Math.random());
      setType("delete");
      setTitle("deleteTitle");
      setContent("deleteContent");
    }
  }

  const role = localStorage.getItem("role");

  return (
    <React.Fragment>
      <CssBaseline />
      <ContentWrapper
        text={t("newCourse")}
        validator="courses.create"
        linkAdd="/administration/courses/addCourse"
        title={t("courseManagement")}
        size="large"
      >
        {role === "Developer" && (
          <div className={classes.selectWrapper}>
            <SelectField
              className={classes.selectField}
              name="userFK"
              id="users"
              label="selectUser"
              menuItemsData={menuItemsObject}
              value={inputFieldValuesObject}
              valueHandler={handleChange}
            />
          </div>
        )}
        <DataTable
          columns={newColumns}
          getByParameter={GetByParameter}
          pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
          initialPageSize={10}
          dataGridClasses={classes.dataGrid}
          refreshState={refreshState}
          tableName={"Courses"}
          specialFilter={inputFieldValuesObject["userFK"]}
        />
      </ContentWrapper>
      {ctx.isModalOn && (
        <MsgBox
          type={type}
          title={title}
          content={content}
          handleOK={handleDelete}
          handleError={handleDelete}
          handleBackdropClick={type === "done" ? handleDelete : () => {}}
        />
      )}
    </React.Fragment>
  );
}

export default TableOfCourses;
