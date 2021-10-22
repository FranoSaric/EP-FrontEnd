import React, { useState, useEffect } from "react";
import CustomCheckbox from "./CustomCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./Styles.js";
import useGlobalStateClaims from "../../store/useGlobalStateClaims";
import {
    getClaimFromUserRoles,
    isLoaded,
} from "../claimMapperUser/apiRequests/ClaimsFromRolesSetter";

import DeleteUserClaim from "../claimMapperUser/apiRequests/DeleteUserClaim";
import PostUserClaim from "../claimMapperUser/apiRequests/PostUserClaim";
import PostRoleClaim from "../claimMapperRole/apiRequests/PostRoleClaim";
import DeleteRoleClaim from "../claimMapperRole/apiRequests/DeleteRoleClaim";

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
    //global state claims hooks
    const { getClaim } = useGlobalStateClaims();
    // const { addToDeletion } = useGlobalStateClaims();
    // const { addToAdding } = useGlobalStateClaims();
    // const { removeFromAdding } = useGlobalStateClaims();
    // const { removeFromDeletion } = useGlobalStateClaims();

    useEffect(() => {
        setDisabled(true);
        setChecked(false);
        const timer=setTimeout(() => {
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
        return()=>{
            clearTimeout(timer);
        }
    }, [props.refreshState]);

    async function checkHandler(event){
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
        if(props.mapperType==="user"){
            if(id===0){
                const response=await PostUserClaim({
                    "UserID": props.userId,
                    "claimType": type, 
                    "claimValue": value});
                const extractedId=parseInt(response.data.split(":")[1].replace("]", ""));
                setId(extractedId);
            }else{
                const response=await DeleteUserClaim({"idUserClaim": id});
                setId(0);
            }
        }else if(props.mapperType==="role"){
            if(id===0){
                console.log("props", props)
                const response=await PostRoleClaim({
                    "roleFK": props.roleId,
                    "permissionClaimFK": props.claimId
                });
                const extractedId=response.roleClaimId;
                setId(extractedId);
            }else{
                const response=await DeleteRoleClaim({"id": id});
                // console.log("response: ", response);
                setId(0);
            }
        }
        
        setChecked(!checked);
        setDisabled(false);
    };

    return (
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
    );
};
export default CustomFormControl;
