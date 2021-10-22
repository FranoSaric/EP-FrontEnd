import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import useStyles from "./FormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
// import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import useGlobalState from "../../../store/useGlobalState";
import GetAllClaims from "../../claimMapperComponents/apiRequests/GetAllClaims";
import Type from "../../claimMapperComponents/Type";
import GetRoleClaims from "../apiRequests/GetRoleClaims";
// import SaveChanges from "../apiRequests/SaveChanges";

const MapperRoleForm=()=>{
	//path handling hooks
	let history = useHistory();
	const params = useParams();
	//state 
	const [types, setTypes] = useState([]);
	const [roleName, setRoleName]=useState("");
	const [enteredFromAdd, setEnteredFromAdd]=useState(false);
	// const [changed, setChanged]=useState(false);
    // const [type, setType] = useState("warning");
	// const [title, setTitle] = useState("updateWarningTitle");
	// const [content, setContent] = useState ("updateWarningContent");
	//hooks
	const { t } = useTranslation();
	const classes = useStyles();
	const ctx = useContext(MsgBoxContext);
	const {setExistingClaims}=useGlobalStateClaims();
	const getRow=useGlobalState()[1];
    const getLoadedId=useGlobalState()[3];
	const getLoadedName=useGlobalState()[5];
	const clearState=useGlobalState()[6];
	// used to load data
	useEffect(() => {
		const roleRow=getRow(params.roleId);
		const roleId=getLoadedId();
		if(roleRow!==undefined){
			setRoleName(roleRow.name);
		}else if(roleId===parseInt(params.roleId)){
			setRoleName(getLoadedName());
		}
		else{
			history.replace("/dashboard");
		}
		
		if(roleId>0){
			setEnteredFromAdd(true);
		}
		
		existingClaimsSetter().
		then(()=>{
			typesSetter();
		});
		
		return(()=>{
			clearState();
		});
	}, []);
	
	async function typesSetter(){
		const data=await GetAllClaims();
		setTypes(data);
	}
	
	async function existingClaimsSetter(){
		const data=await GetRoleClaims(params.roleId);
		setExistingClaims(data);
	}
	
	// const saveClickHandler=()=>{
	// 	ctx.setIsModalOn(true);
	// }
	
	// const handleModal=()=>{
	// 	if(type==="warning"){
	// 		setType("loading");
    //         setTitle("loadingTitle");
	// 		SaveChanges({
	// 			roleId: params.roleId, 
	// 			setType: setType,
    //             setTitle: setTitle,
    //             setContent: setContent,
	// 			existingClaimsSetter: existingClaimsSetter,
	// 			scopesSetter: scopesSetter,
	// 		});
	// 	}else{
	// 		setType("warning");
	// 		setTitle("updateWarningTitle");
	// 		setContent("updateWarningContent");
	// 		ctx.setIsModalOn(false);
	// 	}
	// }
	
	// const handleBackdropClick=()=>{
		
	// }
	return (
		<TemplateForm title={t("roleClaimManagement")+": "}>
			<Typography variant="h6" gutterBottom>
				{roleName}
			</Typography>
			
			{types.map((type)=> <Type 
				key={type.values.claimId}
				typeObject={type}
				roleId={parseInt(params.roleId)}
				mapperType={"role"}
				refreshState={types}/> )}
			
			
			<Button
				onClick={() => history.replace(enteredFromAdd ? "/administration/roles/rolesManagement" : "/administration/roles/roleForm/"+params.roleId)}
				variant="contained"
				color="primary"
				className={classes.button}
			>
				{t("back")}
			</Button>
			
		</TemplateForm>
	);
}

export default MapperRoleForm;