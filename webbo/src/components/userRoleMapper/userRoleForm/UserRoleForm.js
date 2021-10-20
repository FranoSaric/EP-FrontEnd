import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import { useTranslation } from "react-i18next";
import useStyles from "./Styles";
import Button from "@material-ui/core/Button";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import GetUserRoles from "../apiRequests/GetUserRoles";
import GetAllRoles from "../apiRequests/GetAllRoles";
import GlobalStateRole from "./GlobalStateRole";
// import PostUserRole from "../apiRequests/PostUserRole";
// import DeleteUserRole from "../apiRequests/DeleteUserRole";
import MsgBoxContext from "../../../store/MsgBoxContext";
// import MsgBox from "../../msgBox/MsgBox";
import GetAllClaims from "../../claimMapperComponents/apiRequests/GetAllClaims";
import AccordionItem from "./AccordionItem";
import useGlobalState from "../../../store/useGlobalState";
// import SaveChanges from "../../claimMapperUser/apiRequests/SaveChanges";
import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import GetUserClaims from "../../claimMapperUser/apiRequests/GetUserClaims";
import ClaimsFromRolesSetter, {Clear} from "../../claimMapperUser/apiRequests/ClaimsFromRolesSetter";
import Scope from "../../claimMapperComponents/Scope";
import CircularProgress from "@material-ui/core/CircularProgress";
// import MapperUserForm from "../../claimMapperUser/mapperUserForm/MapperUserFormB";

// let roleOrClaim="";

const UserRoleForm=()=>{
	//path handling hooks
	const history=useHistory();
	const params=useParams();
	//states
	const [userName, setUserName]=useState("");
	const [allRoles, setAllRoles]=useState([]);
	const [scopes, setScopes] = useState([]);
	const [loaded, setLoaded] = useState(false);
	//
	const [roleCheckboxDisabled, setRoleCheckboxDisabled]= useState(false);
	//
    // const [type, setType] = useState("warning");
    // const [title, setTitle] = useState("updateWarningTitle");
    // const [content, setContent] = useState("updateWarningContent");
	//
	const [refreshState, setRefreshState]=useState(0);
	const [refreshStateClaims, setRefreshStateClaims]=useState(0);
	// const [refreshStateClaimsEffect, setRefreshStateClaimsEffect]=useState(0);
	// const [refreshStateRoles, setRefreshStateRoles]=useState(0);
	// const [refreshStateRolesEffect, setRefreshStateRolesEffect]=useState(0);
	//other hooks
	const { t } = useTranslation();
	const classes=useStyles();
	const ctx = useContext(MsgBoxContext);
	const getRow=useGlobalState()[1];
	const {setExistingClaims,
			// clearDeletion,
			// clearAdding,
			}=useGlobalStateClaims();
	
	const {
			setExistingRoles,
			// getRolesForDeletion,
			// getRolesForAdding,
			// clearDeletionRole,
			// clearAddingRole
			}= GlobalStateRole();
			
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
			
			existingRolesSetter()
			.then(scopesSetter())
			.then(allRolesSetter())
			.then(ClaimsFromRolesSetter(parseInt(params.userId)))
			.then(async ()=>{
				const data= await existingClaimsSetter();
				// setRefreshStateRoles(Math.random());
				setRefreshStateClaims(Math.random());
				setLoaded(true);
			});
		}
		return(()=>{
			Clear();
			// clearDeletion();
			// clearAdding();
		});
		
	}, []);
	
	//this useEffect is used to refresh user's existing claims
	useEffect(()=>{
		if(loaded){
			ClaimsFromRolesSetter(parseInt(params.userId)).
			then(async ()=>{
				const data= await existingClaimsSetter();
				setRefreshStateClaims(Math.random());
				setLoaded(true);
			})
			.then(()=>{
				setRoleCheckboxDisabled(false);
			});
		}
		
	}, [refreshState]);
	
	//this useEffect is used to refresh user's existing roles
	// useEffect(()=>{
	// 	if(loaded){
	// 		existingRolesSetter()
	// 		.then(()=>{
	// 			setRefreshStateRoles(Math.random());
	// 			setRefreshStateClaimsEffect(Math.random());
	// 		});
	// 	}
	// }, [refreshStateRolesEffect]);
	
	
	
	async function existingRolesSetter(){
		const array=await GetUserRoles(parseInt(params.userId));
		setExistingRoles(array);
	}
	
	async function allRolesSetter(){
		const array=await GetAllRoles();
		setAllRoles(array);
	}
	
	async function scopesSetter(){
		const data=await GetAllClaims();
		setScopes(data);
	}
	
	async function existingClaimsSetter(){
		const data=await GetUserClaims(params.userId);
		setExistingClaims(data);
	}
	
	// function saveClickHandlerRoles(){
	// 	ctx.setIsModalOn(true);
	// 	roleOrClaim="role";
	// }
	
	// function saveClickHandlerClaims(){
	// 	ctx.setIsModalOn(true);
	// 	roleOrClaim="claim"
	// }
	
	// async function handleModal(){
	// 	if(type==="warning"){
	// 		if(roleOrClaim==="role"){
	// 			setType("loading");
	// 			setTitle("loadingTitle");
	// 			saveChanges();
	// 		}else if(roleOrClaim==="claim"){
	// 			setType("loading");
	// 			setTitle("loadingTitle");
	// 			SaveChanges({
	// 				userId: params.userId, 
	// 				setType: setType, 
	// 				setTitle: setTitle,
	// 				setContent: setContent,
	// 				existingClaimsSetter: existingClaimsSetter,
	// 				scopesSetter: scopesSetter,
	// 				setRefreshStateClaimsEffect: setRefreshStateClaimsEffect,
	// 			});
	// 		}else{
				
	// 		}
			
	// 	}else{
	// 		setType("warning");
    //         setTitle("updateWarningTitle");
    //         setContent("updateWarningContent");
	// 		ctx.setIsModalOn(false);
	// 	}
	// }
	
	// async function saveChanges(){
	// 	let OK=true;
	// 	const deletion=getRolesForDeletion();
	// 	const adding=getRolesForAdding();
	// 	deletion.forEach(async (element)=>{
	// 		const data=await DeleteUserRole(element);
	// 		if(data===undefined || data.status!==101){
	// 			setType("");
	// 			OK=false;
	// 		}
	// 	});
	// 	adding.forEach(async (element)=>{
	// 		const data=await PostUserRole(element.userId, element.roleId);
	// 		if(data===undefined || data.status!==101){
	// 			setType("");
	// 			OK=false;
	// 		}
	// 	});
	// 	clearDeletionRole();
	// 	clearAddingRole();
	// 	setTimeout(()=>{
	// 		if(OK){
	// 			setType("done");
    //             setTitle("successTitle");
    //             setContent("successContentUpdate");
	// 		}
	// 		setRefreshStateRolesEffect(Math.random());
	// 	}, 2000);
	// }
	
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
				{t("manageRoles")}
			</Typography>
			<Typography >{t("roles")+":"}</Typography>
			<List dense={false} >
				{allRoles.map((item)=>{
					return (
						<React.Fragment key={item.id}>
							<ListItem key={item.id}>
								
								<AccordionItem 
									item={item} 
									userId={parseInt(params.userId)} 
									setRefreshState={setRefreshState}
									scopes={scopes}
									roleCheckboxDisabled={roleCheckboxDisabled}
									setRoleCheckboxDisabled={setRoleCheckboxDisabled}
									/>
							</ListItem>
						</React.Fragment>
					);
				})}
                
            </List>
			
			{/* <Button
				key={1}
				type="submit"
				// disabled={!changed}
				onClick={saveClickHandlerRoles}
				variant="contained"
				color="primary"
				className={classes.button}
			>
				{t("save")}
			</Button> */}
			
			<Typography
				variant="h5"
				className={classes.title}
				gutterBottom
			>
				{t("manageClaims")}
			</Typography>
			
			{scopes.map((scope)=> <Scope 
				key={scope.scopeId} 
				scopeObject={scope} 
				userId={parseInt(params.userId)}
				mapperType={"user"}
				refreshState={refreshStateClaims}/> )}
			
			{/* <Button
				type="submit"
				// disabled={!changed}
				onClick={saveClickHandlerClaims}
				variant="contained"
				color="primary"
				className={classes.button}
			>
				{t("save")}
			</Button> */}
			<Button
				onClick={() => history.goBack()}
				variant="contained"
				color="primary"
				className={classes.button}
			>
				{t("back")}
			</Button>
			{/* {ctx.isModalOn && <MsgBox
                    type={type}
                    title={title}
                    content={content}
                    handleOK={handleModal}
                    handleBackdropClick={()=>{}}
                    handleError={handleModal}
					/>
								} */}
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