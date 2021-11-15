import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import DeleteClassroom from "../apiRequests/DeleteClassroom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import SelectField from "../../UI/SelectField";
import useFormValidation from "../../../hooks/use-formValidation";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import { useHistory } from "react-router-dom";
import FloatingButton from "../../UI/FloatingButton/FloatingButton";
import ButtonContainer from "../../UI/Buttons/ButtonContainer";
import ActionValidator from "../../../validators/ActionValidator";

/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */

const initialState = {
    institutionFK: "",
};
function TableOfClassrooms() {
    let history = useHistory();
    //other hooks
    const { t } = useTranslation();
    const ctx = useContext(MsgBoxContext);
    const classes = useStyles();
    //nesto
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
        fetchSelectFieldMenuItems(["institutions"]).then((data) =>
            setMenuItemsObject(data)
        );
    }, []);

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
            const data = await DeleteClassroom(model);

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
            <TemplateForm title={t("classroomManagement")} size="large">
                {role === "developer" && <h3>{t("selectInstitution")}</h3>}
                {role === "developer" && (
                    <SelectField
                        className={classes.selectField}
                        name="institutionFK"
                        id="institutions"
                        label="institutions"
                        menuItemsData={menuItemsObject}
                        value={inputFieldValuesObject}
                        valueHandler={handleChange}
                    />
                )}
                <DataTable
                    columns={newColumns}
                    getByParameter={GetByParameter}
                    pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                    initialPageSize={10}
                    dataGridClasses={classes.dataGrid}
                    tableName={"Classrooms"}
                    refreshState={refreshState}
					specialFilter={inputFieldValuesObject["institutionFK"]}
                />
                <ButtonContainer>
                {ActionValidator("classrooms.create") && <FloatingButton elevation={5}
                        onClick={() => history.push("/administration/classrooms/addClassroom")}
                        >
                        {t("addClassroom")}
                    </FloatingButton>
                }
                </ButtonContainer>
            </TemplateForm>{" "}
            {ctx.isModalOn && (
                <MsgBox
                    type={type}
                    title={title}
                    content={content}
                    handleOK={handleDelete}
                    handleError={handleDelete}
                    handleBackdropClick={
                        type === "done" ? handleDelete : () => {}
                    }
                />
            )}
        </React.Fragment>
    );
}

export default TableOfClassrooms;
