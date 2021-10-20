
import React, {useState, useEffect} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import GlobalStateRole from "./GlobalStateRole";
import PostUserRole from "../apiRequests/PostUserRole";
import DeleteUserRole from "../apiRequests/DeleteUserRole";

/**
 * 
 * @param {string} roleName
 * @param {int} roleId 
 * @param {int} userId
 * @param {function} setRoleCheckboxDisabled ?????????????????????
 * @param {boolean} roleCheckboxDisabled
 * @returns 
 */
const CustomCheckbox=(props)=>{
	
	const [checked, setChecked]=useState(false);
	// const [existing, setExisting]=useState(false);
	const [userRoleId, setUserRoleId]=useState();
	const [disabled, setDisabled]=useState(true);
	const {roleName, roleId, userId }=props;
	const {
		// addToDeletion, 
		// removeFromDeletion, 
		// addToAdding, 
		// removeFromAdding, 
		findRole, 
		getUserRoleId
		} = GlobalStateRole();
	
	useEffect(()=>{
		if(findRole(roleId)){
			setChecked(true);
			// setExisting(true);
			setUserRoleId(getUserRoleId(roleId));
		}else{
			setChecked(false);
			// setExisting(false);
			setUserRoleId(0);
		}
		setDisabled(false);
	// }, [props.refreshState]);
	}, []);
	
	useEffect(()=>{
		if(props.roleCheckboxDisabled){
			setDisabled(true);
		}else{
			setDisabled(false);
		}
	}, [props.roleCheckboxDisabled])
	
	async function checkHandler(){
		// if(checked){
		// 	if(!existing){
		// 		removeFromAdding(roleId);
		// 	}else{
		// 		addToDeletion(userRoleId);
		// 	}
		// }else{
		// 	if(existing){
		// 		removeFromDeletion(userRoleId);
		// 	}else{
		// 		addToAdding(userId, roleId);
		// 	}
		// }
		props.setRoleCheckboxDisabled(true);
		setDisabled(true);
		if(userRoleId===0){
			const response=await PostUserRole(userId, roleId);
			const extractedId=parseInt(response.data.split(":")[1].replace("]", ""));
			setUserRoleId(extractedId);
		}else{
			const response=await DeleteUserRole(userRoleId);
			setUserRoleId(0);
		}
		props.setRefreshState(Math.random());
		setChecked(!checked);
		if(!props.roleCheckboxDisabled){
			setDisabled(false);
		}
	}
	
	return(
		<Checkbox
			checked={checked}
			onChange={checkHandler}
			color="primary"
			disabled={disabled}
		/>
	);
}

export default CustomCheckbox;