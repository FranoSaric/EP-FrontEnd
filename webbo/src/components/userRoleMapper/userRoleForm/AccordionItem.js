import React, { useState, useEffect, useContext } from "react";
import useStyles from "./Styles";
import { ListItemText } from "@material-ui/core";
import CustomCheckbox from "./CustomCheckbox";

import { Accordion } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

import Role from "../../claimMapperComponents/Role";

/**
 *
 * @param {{}} item - object of allRoles
 * @param {int} userId - userId
 * @param {[]} refreshState - allRoles
 * @param {[]} scopes - array of objects representing claims sorted by their respective scopes
 * @param {function} setRoleCheckboxDisabled
 * @param {boolean} roleCheckboxDisabled
 * @returns
 */
const AccordionItem = (props) => {
    const [item, setItem] = useState(props.item);
    const [expanded, setExpanded] = useState(false);
    
    const classes = useStyles();
    
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    
    return (
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary aria-controls="panel1a-content">
                <ListItemText primary={item.Name} onClick={handleExpand} />
                <CustomCheckbox
                    roleName={item.Name}
                    roleId={item.id}
                    userId={props.userId}
                    setRefreshState={props.setRefreshState}
                    roleCheckboxDisabled={props.roleCheckboxDisabled}
                    setRoleCheckboxDisabled={props.setRoleCheckboxDisabled}
                />
                {expanded ? (
                    <KeyboardArrowUp className={classes.arrows} onClick={handleExpand} />
                ) : (
                    <KeyboardArrowDown className={classes.arrows} onClick={handleExpand} />
                )}
            </AccordionSummary>
            <AccordionDetails className={classes.typeList}>
                <Role
                    roleId={item.id}
                    scopes={props.scopes}
                    expanded={expanded}
                />
                {/* //expanded ce odavle kupit */}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
