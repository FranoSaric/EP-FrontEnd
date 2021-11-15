import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import DeleteInstitution from "../apiRequests/DeleteInstitution";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useHistory } from "react-router-dom";
import FloatingButton from "../../UI/FloatingButton/FloatingButton";
import ButtonContainer from "../../UI/Buttons/ButtonContainer";
import ActionValidator from "../../../validators/ActionValidator";

/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */
function TableOfInstitution() {
    let history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();
    const [refreshState, setRefreshState] = useState("1518");
    const [type, setType] = useState("delete");
    const [title, setTitle] = useState("deleteTitle");
    const [content, setContent] = useState("deleteContent");
    const ctx = useContext(MsgBoxContext);

    const newColumns = columns.map((column) => {
        return { ...column, headerName: t(column.headerName) };
    });

    async function handleDelete() {
        if (type === "delete") {
            const model = {
                id: ctx.itemId,
            };
            const data = await DeleteInstitution(model);

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

    return (
        <React.Fragment>
            <CssBaseline />
            <TemplateForm title={t("institutionManager")} size="large">
                <DataTable
                    columns={newColumns}
                    getByParameter={GetByParameter}
                    pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                    initialPageSize={10}
                    dataGridClasses={classes.dataGrid}
                    tableName={"Institutions"}
                    refreshState={refreshState}
                />
                <ButtonContainer>
                {ActionValidator("institutions.create") && <FloatingButton elevation={5}
                        onClick={() => history.push("/administration/institutions/addInstitution")}
                        >
                        {t("addInstitution")}
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
                    handleBackdropClick={type==="done" ? handleDelete : ()=>{}}
                />
            )}
        </React.Fragment>
    );
}

export default TableOfInstitution;
