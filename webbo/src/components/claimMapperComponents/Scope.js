import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { KeyboardArrowDown } from "@material-ui/icons";
import Type from "./Type";

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";

import useStyles from "./Styles";

/**
 * component which maps all claim types in this scope
 * @param {{}} scopeObject - object representing claimTypes grouped by it's respective scope 
 * scopeObject={
		scopeId: 1,
		scopeName: "",
		types: [
			{
				ClaimType: "",
				value: [
					{
						claimId: "",
						claimValue: "",
					},
					{
						claimId: "",
						claimValue: "",
					},
					{
						claimId: "",
						claimValue: "",
					}
				],
			},
		],
	}
 * @param {int} userId
 * @param {int} roleId
 * @param {string} mapperType - User claim mapper or role claim mapper, this prop should either hold "user" or "role"
 * @param {int} refreshState - state used to trigger component rerender
 * @returns 
 */
const Scope = (props) => {
    
    //hooks
    const classes = useStyles();
    
    const [refreshState, setRefreshState] = useState(props.refreshState);
    useEffect(() => {
        setRefreshState(props.refreshState);
    }, [props.refreshState]);
    
    return (
        <>
            <Accordion className={classes.accordion} defaultExpanded={props.mapperType==="role" ? true : (props.existingClaims ? true : false)}>
                <AccordionSummary
                    key={props.scopeObject.scopeId}
                    expandIcon={<KeyboardArrowDown />}
                    aria-controls="panel1a-content"
                    id={props.scopeObject.scopeId}
                >
                    <Typography>{props.scopeObject.scopeName}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.typeList}>
                    {props.scopeObject.types.map((type) => (
                        <Type
                            key={type.ClaimType}
                            typeObject={type}
                            userId={props.userId}
                            roleId={props.roleId}
                            mapperType={props.mapperType}
                            refreshState={props.refreshState}
							existingClaims={props.existingClaims}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Scope;
