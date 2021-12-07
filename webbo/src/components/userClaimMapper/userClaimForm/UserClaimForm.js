import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useTranslation } from "react-i18next";
import useStyles from "./FormStyles";
import GetRoleClaims from "../apiRequests/GetRoleClaims";
import MsgBoxContext from "../../../store/MsgBoxContext";
import GetAllClaims from "../../claimMapperComponents/apiRequests/GetAllClaims";
import useGlobalState from "../../../store/useGlobalState";
import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import GetUserClaims from "../apiRequests/GetUserClaims";
import ClaimsFromRolesSetter, {
  Clear,
} from "../../claimMapperUser/apiRequests/ClaimsFromRolesSetter";
import Type from "../../claimMapperComponents/Type";
import CircularProgress from "@material-ui/core/CircularProgress";
import ContentWrapper from "../../UI/ContentWrapper/ContentWrapper";

// let roleOrClaim="";

const UserRoleForm = () => {
  //path handling hooks
  const history = useHistory();
  const params = useParams();
  //states
  const [userName, setUserName] = useState("");
  const [types, setTypes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //other hooks
  const { t } = useTranslation();
  const classes = useStyles();
  const ctx = useContext(MsgBoxContext);
  const getRow = useGlobalState()[1];
  const { setExistingClaims } = useGlobalStateClaims();

  //this useEffect is to be run only once
  useEffect(() => {
    if (!loaded) {
      // setLoaded(false);
      const userRow = getRow(params.userId);
      if (userRow !== undefined) {
        setUserName(userRow.userName);
      } else {
        history.replace("/dashboard");
        // setUserName("Unknown");
      }
      typesSetter()
        .then(claimsFromRoleSetter(params.userId))
        .then(async () => {
          const data = await existingClaimsSetter();
          // setRefreshStateRoles(Math.random());
          setLoaded(true);
        });
    }
    return () => {
      Clear();
    };
  }, []);

  async function claimsFromRoleSetter(userId) {
    const data = await GetRoleClaims(userId);
    ClaimsFromRolesSetter(data);
  }

  async function typesSetter() {
    const data = await GetAllClaims();
    setTypes(data);
  }

  async function existingClaimsSetter() {
    const data = await GetUserClaims(params.userId);
    setExistingClaims(data);
  }

  const actualComponent = (
    <ContentWrapper
      link="/administration/users/userManagement"
      title={t("manageClaims")}
      size="small"
    >
      <div className={classes.headingWrapper}>
        <span className={classes.headingLabel}>{t("user")}</span>
        <span className={classes.headingValue}>{userName}</span>
      </div>
      <div className={classes.permissionWrapper}>
        {types.map((type) => (
          <Type
            key={type.values.claimId}
            typeObject={type}
            userId={parseInt(params.userId)}
            mapperType={"user"}
          />
        ))}
      </div>
    </ContentWrapper>
  );

  const loadingComponent = (
    <TemplateForm size="small" className={classes.loadingComponent}>
      <CircularProgress size={60} />
    </TemplateForm>
  );

  return <>{loaded ? actualComponent : loadingComponent}</>;
};

export default UserRoleForm;
