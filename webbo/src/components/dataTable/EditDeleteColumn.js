import React, { useContext, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
export const EditDeleteColumn = (props) => {
    const ctx = useContext(MsgBoxContext);
    const classes = useStyles();
    const history = useHistory();
    
    EditDeleteClaimValidator(props.claimType);
    useEffect(()=>{
        return ()=>{
            Unvalidate();
        }
    }, []);
    const editClickHandler = () => {
        history.push(`${props.link}/${props.id}`);
    };

    const deleteClickHandler = () => {
        ctx.setIsModalOn(true);
        ctx.setItemId(props.id);
    };
    
    const slash = <h2>/</h2>;
    
    
    return (
        <React.Fragment>
            { updateClaim && <IconButton onClick={editClickHandler}>
                <EditIcon className={classes.editIcon} />
            </IconButton>}
            {updateClaim && deleteClaim && !props.deleteDisabled && <Typography variant="h5" component="p">/</Typography>}
            { deleteClaim && !props.deleteDisabled && <IconButton onClick={deleteClickHandler}>
                <DeleteIcon className={classes.deleteIcon} />
            </IconButton>}
        </React.Fragment>
    );
};
