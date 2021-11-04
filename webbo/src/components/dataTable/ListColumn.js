import React, { useContext, useEffect } from "react";
import {FormatListBulleted} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import MsgBoxContext from "../../store/MsgBoxContext";
import {Typography} from "@material-ui/core";
import useStyles from "./Styles";
import {EditDeleteClaimValidator, updateClaim, deleteClaim, Unvalidate} from "../../validators/EditDeleteClaimValidator";
/**
 * data grid cell component for Edit/Delete column that contains buttons for edit and delete it's row
 * @param {integer} id - int value representing id of selected row from table
 * @param {string} link - string value representing route to form for editing the selected item from table
 * @param {object} row - object of data from the specific table row
 * @param {string} claimType - specifies claim type from which edit and delete claims should be validated
 * @param {boolean} deleteDisabled - specifies if delete is disabled regardles of claims
 *
 * @returns
 */
export const ListColumn = (props) => {
    const ctx = useContext(MsgBoxContext);
    const classes = useStyles();
    const history = useHistory();
    
    useEffect(()=>{
        return ()=>{
            Unvalidate();
        }
    }, []);
    const listClickHandler = () => {
        history.push(`${props.link}/${props.numberOfClassroom}/${props.startTime}/${props.endTime}`);
    };
    
    return (
        <React.Fragment>
            <IconButton onClick={listClickHandler}>
                <FormatListBulleted className={classes.listIcon} />
            </IconButton>
        </React.Fragment>
    );
};
