
import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useTranslation } from "react-i18next";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import SelectField from "../../UI/SelectField";
/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */
const initialState = {
    institutionFK: "",
};
function TableOfUsers() {
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
    return (
        <React.Fragment>
            <CssBaseline />
            <TemplateForm title={t("userManagement")} size="large">
            <h3>{t("selectInstitution")}</h3>
                <SelectField
                    className={classes.selectField}
                    name="institutionFK"
                    id="institutions"
					label="institutions"
                    menuItemsData={menuItemsObject}
                    value={inputFieldValuesObject}
                    valueHandler={handleChange}
                />
                <DataTable
                    columns={newColumns}
                    getByParameter={GetByParameter}
                    pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                    initialPageSize={10}
                    dataGridClasses={classes.dataGrid}
                    tableName={"Users"}
                    specialFilter={inputFieldValuesObject["institutionFK"]}
                />
            </TemplateForm>
        </React.Fragment>
    );
}

export default TableOfUsers;