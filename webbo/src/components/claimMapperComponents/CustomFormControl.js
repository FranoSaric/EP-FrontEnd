import React, { useState, useEffect } from "react";
import CustomCheckbox from "./CustomCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./Styles.js";
import { useTranslation } from "react-i18next";
import useGlobalStateClaims from "../../store/useGlobalStateClaims";
import {
    getClaimFromUserRoles,
    isLoaded,
} from "../claimMapperUser/apiRequests/ClaimsFromRolesSetter";

import DeleteUserClaim from "../userClaimMapper/apiRequests/DeleteUserClaim";
import PostUserClaim from "../userClaimMapper/apiRequests/PostUserClaim";
import PostRoleClaim from "../userClaimMapper/apiRequests/PostRoleClaim";
import DeleteRoleClaim from "../claimMapperRole/apiRequests/DeleteRoleClaim";

import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { Slide } from "@material-ui/core";

/**
 * component with checkbox logic management
 * @param {string} claimType
 * @param {string} claimValue
 * @param {int} userId
 * @param {int} roleId
 * @param {string} mapperType - User claim mapper or role claim mapper, this prop should either hold "user" or "role"
 * @param {int} refreshState - state used to trigger component rerender
 * @returns
 */

let timer;

const CustomFormControl = (props) => {
    //state
    const [type, setType] = useState(props.claimType);
    const [value, setValue] = useState(props.claimValue);
    const [id, setId] = useState(0);
    // states for checkboxes
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    //hoooks
    const classes = useStyles();
    const { t } = useTranslation();
    //global state claims hooks
    const { getClaim } = useGlobalStateClaims();
    // const { addToDeletion } = useGlobalStateClaims();
    // const { addToAdding } = useGlobalStateClaims();
    // const { removeFromAdding } = useGlobalStateClaims();
    // const { removeFromDeletion } = useGlobalStateClaims();
    const [alertToggled, setAlertToggled] = useState(false);
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        setDisabled(true);
        setChecked(false);
        const timer = setTimeout(() => {
            let claim = getClaim(props.claimType, props.claimValue);
            setDisabled(false);
            if (claim !== undefined) {
                setChecked(true);
                setType(claim.ClaimType);
                setValue(claim.ClaimValue);
                setId(claim.id);
            } else {
                setId(0);
                if (isLoaded()) {
                    claim = getClaimFromUserRoles(
                        props.claimType,
                        props.claimValue
                    );
                    console.log("claim iz roleClaimova: ", claim);
                    if (claim !== undefined) {
                        setDisabled(true);
                        setChecked(true);
                        setType(claim.ClaimType);
                        setValue(claim.ClaimValue);
                        setId(claim.id);
                    }
                }
            }
        }, 1050);
        return () => {
            clearTimeout(timer);
        };
    }, [props.refreshState]);

    async function checkHandler(event) {
        // if (checked) {
        //     if (id === 0) {
        //         removeFromAdding({
        //             claimType: type,
        //             claimValue: value,
        //         });
        //     } else {
        //         addToDeletion(id);
        //     }
        // } else {
        //     if (id !== 0) {
        //         removeFromDeletion(id);
        //     } else {
        //         addToAdding({
        //             claimType: type,
        //             claimValue: value,
        //         });
        //     }
        // }
        setDisabled(true);
        let response;
        let messageType = "";
        if (props.mapperType === "user") {
            if (id === 0) {
                console.log("PROPS USER", props)
                response = await PostUserClaim({
                    userFK: props.userId,
                    permissionClaimFK: props.claimId,
                });
                console.log(response)
                const extractedId = response.userClaimId
                setId(extractedId);
                messageType = "post";
            } else {
                const response = await DeleteUserClaim({ id: id });
                setId(0);
                messageType = "delete";
            }
        } else if (props.mapperType === "role") {
            if (id === 0) {
                response = await PostRoleClaim({
                    roleFK: props.roleId,
                    permissionClaimFK: props.claimId,
                });
                const extractedId = response.roleClaimId;
                setId(extractedId);
                messageType = "post";
            } else {
                response = await DeleteRoleClaim({ id: id });
                setId(0);
                messageType = "delete";
            }
        }

        if (response) {
            if (response.status === 101) {
                setChecked(!checked);
            }
            toggleAlert(response.status, messageType);
        }
        setDisabled(false);
    }

    const toggleAlert = (status, messageType) => {
        if (messageType === "post") {
            if (status === 101) {
                setSeverity("success");
                setAlertMessage("alertSuccessAddMessage");
            } else {
                setSeverity("error");
                setAlertMessage("alertErrorAddMessage");
            }
        } else {
            if (status === 101) {
                setSeverity("success");
                setAlertMessage("alertSuccessDeleteMessage");
            } else {
                setSeverity("error");
                setAlertMessage("alertErrorDeleteMessage");
            }
        }
        setAlertToggled(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
            setAlertToggled(false);
        }, 3500);
    };

    const TransitionComponent = (props) => {
        return <Slide {...props} direction="up" />;
    };

    return (
        <>
            <FormControlLabel
                classes={{
                    label: classes.label,
                }}
                control={
                    <CustomCheckbox
                        checked={checked}
                        onChange={checkHandler}
                        name="create"
                        color="primary"
                        disabled={disabled}
                    />
                }
                label={props.claimValue}
            />
            <Snackbar
                open={alertToggled}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                TransitionComponent={TransitionComponent}
                // autoHideDuration={3500}
            >
                <Alert severity={severity} variant="filled">
                    {t(alertMessage)}
                </Alert>
            </Snackbar>
        </>
    );
};
export default CustomFormControl;
