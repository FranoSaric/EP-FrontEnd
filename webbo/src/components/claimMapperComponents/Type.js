import React, {useState, useEffect} from "react";
import CustomFormControl from "./CustomFormControl";
import useStyles from "./Styles";
import { Typography } from "@material-ui/core";
import CustomFormControlReadOnly from "./CustomFormControlReadOnly";


/**
 * components that maps all claim values in this claim type
 * @param {{}} typeObject - object: 
 * typeObject={
		ClaimType: "",
		values: [],
	}
 * @param {int} userId
 * @param {int} roleId
 * @param {string} mapperType - User claim mapper or role claim mapper, this prop should either hold "user" or "role"
 * @param {int} refreshState - state used to trigger component rerender
 * @param {[]} existingClaims
 * @returns 
 */
const Type=(props)=>{
	
	const classes=useStyles();
	
	const [refreshState, setRefreshState]=useState(props.refreshState);
	useEffect(()=>{
		
		setRefreshState(props.refreshState);
		
	}, [props.refreshState]);
	
	
	
	return(
		<div className={classes.type}>
			<Typography  className={classes.typo}>{props.typeObject.ClaimType}</Typography>
			
			{props.existingClaims ? props.typeObject.values.map((element)=>{
				return <CustomFormControlReadOnly
				key={element.claimId}
				claimType={props.typeObject.ClaimType} 
				claimValue={element.claimValue}
				refreshState={props.refreshState}
				existingClaims={props.existingClaims}
				/>;
			})
			:
			props.typeObject.values.map((element)=>{
				return <CustomFormControl 
					key={element.claimId}
					claimType={props.typeObject.ClaimType} 
					claimValue={element.claimValue}
					userId={props.userId}
					roleId={props.roleId}
					mapperType={props.mapperType}
					refreshState={props.refreshState}
					claimId={element.claimId}
					/>;}
			)
			}
			
		</div>
	);
}

export default Type;