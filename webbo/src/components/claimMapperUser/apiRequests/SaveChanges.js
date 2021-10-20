import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import DeleteUserClaim from "./DeleteUserClaim";
import PostUserClaim from "./PostUserClaim";

let OK=true;

async function SaveChanges({ userId, setType, setTitle, setContent, existingClaimsSetter, scopesSetter, setRefreshStateClaimsEffect}){
	const {clearDeletion,
			clearAdding,
			getClaimsForDeletion,
			getClaimsForAdding
		}=useGlobalStateClaims();
	
	
	const deletion=getClaimsForDeletion();
	const adding=getClaimsForAdding();
	
	await deletion.forEach(async (element)=>{
		const model={
			"idUserClaim": element
		};
		const data=await DeleteUserClaim(model);
		if(data===undefined || data.status!==101){
			setType("error");
			setTitle("errorTitle");
			setContent("errorContent");
			OK=false;
		}
	});
	await adding.forEach(async (element)=>{
		const model={
			"UserID": parseInt(userId),
			"claimType": element.claimType,
			"claimValue": element.claimValue
		}
		const data=await PostUserClaim(model);
		if(data===undefined || data.status!==101){
			setType("error");
			setTitle("errorTitle");
			setContent("errorContent");
			OK=false;
		}
	});
	
	clearAdding();
	setTimeout(()=>{
		if(OK){
			setType("done");
			setTitle("successTitle");
			setContent("successContentUpdate");
		}
		setRefreshStateClaimsEffect(Math.random());
	}, 1500);
	
}

export default SaveChanges;