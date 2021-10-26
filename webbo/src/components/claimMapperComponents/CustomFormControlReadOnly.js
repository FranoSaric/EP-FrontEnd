import React, {useState, useEffect} from "react";
import CustomCheckbox from "./CustomCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useTranslation } from "react-i18next";
import useStyles from "./Styles.js";
import useGlobalStateClaims from "../../store/useGlobalStateClaims";
import CustomCheckboxUncheckedDisabled from "./CustomCheckboxUncheckedDisabled";
/**
 * 
 * @param {string} claimType 
 * @param {string} claimValue
 * @param {int} refreshState - state used to trigger component rerender
 * @param {[]} existingClaims - set of existing claims for this role to check 
 * @returns 
 */
const CustomFormControlReadOnly=(props)=>{
	
	// states for checkboxes
	const [checked, setChecked]=useState(false);
	//hoooks
	const classes = useStyles();
	
	useEffect(()=>{
		setTimeout(()=>{
			let claim=getClaim(props.claimType, props.claimValue);
			if(claim!==undefined){
				setChecked(true);
			}else{
			}
		}, 1500);
		
		
	}, [props.refreshState]);
	
	
	const getClaim=(type, value)=>{
		const array=props.existingClaims.filter((element)=>{
			return element.ClaimType===type && element.ClaimValue===value;
		});
		
		const claim=array[0];
		
		return claim;
	};
	
	const componentOne=
	<FormControlLabel
		classes={{
			label: classes.label
		}}
		control={
			<CustomCheckbox
				checked={true}
				name="create"
				color="primary"
				disabled={true}
			/>}
			label={props.claimValue}
	/>
	;
	const componentTwo= 
	<FormControlLabel
		classes={{
			label: classes.label
		}}
		control={
			<CustomCheckboxUncheckedDisabled
				checked={false}
				name="create"
				color="primary"
				disabled={true}
			/>
		}
		label={props.claimValue}
	/>
	;
	return(
			checked 
			?
			componentOne 
			: 
			componentTwo
	);
}

export default CustomFormControlReadOnly;