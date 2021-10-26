
import React, {useState, useEffect} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import GlobalStateRole from "./GlobalStateRole";
import PostUserRole from "../apiRequests/PostUserRole";
import DeleteUserRole from "../apiRequests/DeleteUserRole";
import { useTranslation } from "react-i18next";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { Slide } from "@material-ui/core";

let timer;

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
	
	//state for managing alert
    const [alertToggled, setAlertToggled] = useState(false);
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
	
	const { t } = useTranslation();
	
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
		let response;
		let messageType="";
		if(userRoleId===0){
			response=await PostUserRole(userId, roleId);
			const extractedId=parseInt(response.data.split(":")[1].replace("]", ""));
			setUserRoleId(extractedId);
			messageType="post";
		}else{
			response=await DeleteUserRole(userRoleId);
			setUserRoleId(0);
			messageType="delete";
		}
		props.setRefreshState(Math.random());
		if(!props.roleCheckboxDisabled){
			setDisabled(false);
		}
		if(response){
			if(response.status===101){
				setChecked(!checked);
			}
			toggleAlert(response.status, messageType);
		}
	}
	
	
	const toggleAlert = (status, messageType) => {
        if(messageType==="post"){
            
            if(status===101){
                setSeverity("success");
                setAlertMessage("alertSuccessAddMessage");
            }else{
                setSeverity("error");
                setAlertMessage("alertErrorAddMessage");
            }
        }else{
            if(status===101){
                setSeverity("success");
                setAlertMessage("alertSuccessDeleteMessage");
            }else{
                setSeverity("error");
                setAlertMessage("alertErrorDeleteMessage");
            }
        }
        setAlertToggled(true);
        clearTimeout(timer);
        timer=setTimeout(()=>{
            setAlertToggled(false);
        }, 3500);
    }
    
	const TransitionComponent= (props) =>{
        return (<Slide {...props} direction="up"/>)  ;  
    }
	
	return(
		<>
		<Checkbox
			checked={checked}
			onChange={checkHandler}
			color="primary"
			disabled={disabled}
		/>
		
		<Snackbar
			open={alertToggled}
			anchorOrigin={{vertical: "bottom", horizontal: "left"}}
			TransitionComponent={TransitionComponent}
			// autoHideDuration={3500}
		>
			<Alert 
			severity={severity}
			variant="filled"
			>
				{t(alertMessage)}
			</Alert>
		</Snackbar>
		
		</>
	);
}

export default CustomCheckbox;