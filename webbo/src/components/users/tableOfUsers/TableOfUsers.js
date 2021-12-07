import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import { useTranslation } from "react-i18next";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import SelectField from "../../UI/SelectField";
import { useHistory } from "react-router-dom";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";
/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */
const initialState = {
  institutionFK: "",
};
function TableOfUsers() {
  let history = useHistory();
  //other hooks
  const { t } = useTranslation();
  const classes = useStyles();
  const ctx = useContext(MsgBoxContext);
  // state for select field menu items
  const [menuItemsObject, setMenuItemsObject] = useState();
  //state for select field value
  const [inputFieldValuesObject, setInputFieldValuesObject] =
    useState(initialState);

  const newColumns = columns.map((column) => {
    return { ...column, headerName: t(column.headerName) };
  });
  useEffect(() => {
    fetchSelectFieldMenuItems(["institutions"]).then((data) =>
      setMenuItemsObject(data)
    );
  }, []);
  //setting values in state on every click
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
  };
  const role = localStorage.getItem("role");
  return (
    <React.Fragment>
      <CssBaseline />
      <ContentWrapper
        text={t("newUser")}
        validator="users.manage"
        linkAdd="/administration/users/adduser"
        title={t("userManagement")}
        size="large"
      >
        {role === "Developer" && (
          <div className={classes.selectWrapper}>
            <SelectField
              className={classes.selectField}
              name="institutionFK"
              id="institutions"
              label="selectInstitution"
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
          tableName={"Users"}
          specialFilter={inputFieldValuesObject["institutionFK"]}
        />
      </ContentWrapper>
    </React.Fragment>
  );
}

export default TableOfUsers;
