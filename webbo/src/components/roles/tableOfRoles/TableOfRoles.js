import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import DeleteRole from "../apiRequests/DeleteRole";
import { useHistory } from "react-router-dom";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";

/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */
function TableOfRoles() {
  let history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const [type, setType] = useState("delete");
  const [title, setTitle] = useState("deleteTitle");
  const [content, setContent] = useState("deleteContent");
  const [refreshState, setRefreshState] = useState("1518");

  const ctx = useContext(MsgBoxContext);

  const newColumns = columns.map((column) => {
    return { ...column, headerName: t(column.headerName) };
  });

  async function handleModal() {
    if (type === "delete") {
      const model = {
        id: ctx.itemId,
      };
      const data = await DeleteRole(model);
      if (data.status === 401) {
        setType("error");
        setTitle("connectedItemTitle");
        setContent("connectedItemContent");
      } else if (data === undefined || data.status !== 101) {
        setType("");
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
      <ContentWrapper
        text={t("newRole")}
        validator="roles.manage"
        linkAdd="/administration/roles/roleForm"
        title={t("rolesManagement")}
        size="extraSmall"
      >
        <DataTable
          columns={newColumns}
          getByParameter={GetByParameter}
          pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
          initialPageSize={10}
          dataGridClasses={classes.dataGrid}
          tableName={"Roles"}
          refreshState={refreshState}
        />
      </ContentWrapper>
      {ctx.isModalOn && (
        <MsgBox
          type={type}
          title={title}
          content={content}
          handleOK={handleModal}
          handleError={handleModal}
          handleBackdropClick={type === "done" ? handleModal : () => {}}
        />
      )}
    </React.Fragment>
  );
}

export default TableOfRoles;
