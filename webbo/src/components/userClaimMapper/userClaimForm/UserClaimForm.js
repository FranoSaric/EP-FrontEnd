import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useTranslation } from "react-i18next";
import useStyles from "./FormStyles";
import Button from "@material-ui/core/Button";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import GetRoleClaims from "../apiRequests/GetRoleClaims";
// import PostUserRole from "../apiRequests/PostUserRole";
// import DeleteUserRole from "../apiRequests/DeleteUserRole";
import MsgBoxContext from "../../../store/MsgBoxContext";
// import MsgBox from "../../msgBox/MsgBox";
import GetAllClaims from "../../claimMapperComponents/apiRequests/GetAllClaims";
import useGlobalState from "../../../store/useGlobalState";
// import SaveChanges from "../../claimMapperUser/apiRequests/SaveChanges";
import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import GetUserClaims from "../apiRequests/GetUserClaims";
import ClaimsFromRolesSetter, {Clear} from "../../claimMapperUser/apiRequests/ClaimsFromRolesSetter";
import Type from "../../claimMapperComponents/Type";
import CircularProgress from "@material-ui/core/CircularProgress";
// import MapperUserForm from "../../claimMapperUser/mapperUserForm/MapperUserFormB";

// let roleOrClaim="";

const UserRoleForm=()=>{
	//path handling hooks
	const history=useHistory();
	const params=useParams();
	//states
	const [userName, setUserName]=useState("");
	const [types, setTypes] = useState([]);
	const [loaded, setLoaded] = useState(false);
	//other hooks
	const { t } = useTranslation();
	const classes=useStyles();
	const ctx = useContext(MsgBoxContext);
	const getRow=useGlobalState()[1];
	const {setExistingClaims,
			}=useGlobalStateClaims();
	
			
	//this useEffect is to be run only once
	useEffect(()=>{
		if(!loaded){
			// setLoaded(false);
			const userRow=getRow(params.userId);
			if(userRow!==undefined){
				setUserName(userRow.userName);
			}else{
				history.replace("/dashboard");
				// setUserName("Unknown");
			}
			typesSetter()
			.then(claimsFromRoleSetter(params.userId))
			.then(async ()=>{
				const data= await existingClaimsSetter();
				// setRefreshStateRoles(Math.random());
				setLoaded(true);
			});
		}
		return(()=>{
			Clear();
		});
		
	}, [])

	async function claimsFromRoleSetter(userId){
		const data=await GetRoleClaims(userId);
		console.log("deder mi ove: ", data);
		ClaimsFromRolesSetter(data);
	}
	
	async function typesSetter(){
		const data=await GetAllClaims();
		setTypes(data);
	}
	
	async function existingClaimsSetter(){
		const data=await GetUserClaims(params.userId);
		setExistingClaims(data);
	}
	
	const actualComponent=(
	<TemplateForm size="small">
		<Typography
				variant="h6"
				className={classes.userTitle}
			>
				{t("user")+": "+userName}
			</Typography>
			
			<Typography
				variant="h5"
				className={classes.title}
				gutterBottom
			>
				{t("manageClaims")}
			</Typography>
			
			{types.map((type)=> <Type 
				key={type.values.claimId}
				typeObject={type}
				userId={parseInt(params.userId)}
				mapperType={"user"}
				/> )}
			
			<Button
				onClick={() => history.goBack()}
				variant="contained"
				color="primary"
				className={classes.button}
			>
				{t("back")}
			</Button>
			
	</TemplateForm>);
	
	const loadingComponent=(
		<TemplateForm size="small" className={classes.loadingComponent}>
			<CircularProgress size={60}/>
		</TemplateForm>
	);
	
	return(
		<>
			{loaded ? 
				actualComponent :
				loadingComponent
			}
		</>
	);
}

export default UserRoleForm;