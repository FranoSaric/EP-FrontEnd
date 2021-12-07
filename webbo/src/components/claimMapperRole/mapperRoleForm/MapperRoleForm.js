import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import useStyles from "./FormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import { useTranslation } from "react-i18next";
import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import useGlobalState from "../../../store/useGlobalState";
import GetAllClaims from "../../claimMapperComponents/apiRequests/GetAllClaims";
import Type from "../../claimMapperComponents/Type";
import GetRoleClaims from "../apiRequests/GetRoleClaims";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";

const MapperRoleForm = () => {
  //path handling hooks
  let history = useHistory();
  const params = useParams();
  //state
  const [types, setTypes] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [enteredFromAdd, setEnteredFromAdd] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();
  const ctx = useContext(MsgBoxContext);
  const { setExistingClaims } = useGlobalStateClaims();
  const getRow = useGlobalState()[1];
  const getLoadedId = useGlobalState()[3];
  const getLoadedName = useGlobalState()[5];
  const clearState = useGlobalState()[6];
  // used to load data
  useEffect(() => {
    const roleRow = getRow(params.roleId);
    const roleId = getLoadedId();
    const loadedName = getLoadedName();
    if (roleRow !== undefined) {
      setRoleName(roleRow.name);
    } else if (roleId === parseInt(params.roleId)) {
      setRoleName(getLoadedName());
    } else {
      history.replace("/dashboard");
    }
    if (loadedName !== undefined && Object.keys(roleRow).length <= 0) {
      setRoleName(loadedName);
    }
    if (roleId > 0) {
      setEnteredFromAdd(true);
    }

    existingClaimsSetter().then(() => {
      typesSetter();
    });

    return () => {
      clearState();
    };
  }, []);

  async function typesSetter() {
    const data = await GetAllClaims();
    setTypes(data);
  }

  async function existingClaimsSetter() {
    const data = await GetRoleClaims(params.roleId);
    setExistingClaims(data);
  }

  return (
    <ContentWrapper
      link={
        enteredFromAdd
          ? "/administration/roles/rolesManagement"
          : "/administration/roles/roleForm/" + params.roleId
      }
      title={t("roleClaimManagement") + ": "}
      size="small"
    >
      <div className={classes.headingWrapper}>
        <span className={classes.headingLabel}>{t("roleFK")}</span>
        <span className={classes.headingValue}>{roleName}</span>
      </div>
	  <div className={classes.roleClaimWrapper}>
      {types.map((type) => (
          <Type
            key={type.values.claimId}
            typeObject={type}
            roleId={parseInt(params.roleId)}
            mapperType={"role"}
            refreshState={types}
          />
		  ))}
		  </div>
    </ContentWrapper>
  );
};

export default MapperRoleForm;
