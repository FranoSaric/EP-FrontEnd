import useGlobalStateClaims from "../../../store/useGlobalStateClaims";
import DeleteRoleClaim from "./DeleteRoleClaim";
import PostRoleClaim from "./PostRoleClaim";

let OK=true;
/**
 * it takes all necesary state setter functions and id for role it changes, it calls delete and add api's for role
 * for each item in claimsForDeletion and claimsForAdding from globalStateClaims,
 * it saves the changes to the server and refresh changes on the screen
 * @param {{string, function, function, function, function, function}} 
 */
async function SaveChanges({roleId, setType, setTitle, setContent, existingClaimsSetter, scopesSetter}){
	const {clearDeletion}=useGlobalStateClaims();
	const {clearAdding}=useGlobalStateClaims();
	const {getClaimsForDeletion}=useGlobalStateClaims();
	const {getClaimsForAdding}=useGlobalStateClaims();
	
	
	const deletion=getClaimsForDeletion();
	const adding=getClaimsForAdding();
	
	await deletion.forEach(async (element)=>{
		const model={
			"idRoleClaim": element
		};
		const data=await DeleteRoleClaim(model);
		if(data===undefined || data.status!==101){
			setType("error");
			setTitle("errorTitle");
			setContent("errorContent");
			OK=false;
		}
	});
	await adding.forEach(async (element)=>{
		const model={
			"roleID": parseInt(roleId),
			"claimType": element.claimType,
			"claimValue": element.claimValue
		}
		const data=await PostRoleClaim(model);
		if(data===undefined || data.status!==101){
			setType("error");
			setTitle("errorTitle");
			setContent("errorContent");
			OK=false;
		}
	});
	
	// claimDeletion({deletion, setType})
	// .then(claimAdding({adding, setType, roleId}))
	// .then(()=>{
	// 	console.log("OK na kraju je: ", OK);
	// });
	
	clearDeletion();
	clearAdding();
	setTimeout(()=>{
		if(OK){
			setType("done");
			setTitle("successTitle");
			setContent("successContentUpdate")
		}
		existingClaimsSetter().
		then(()=>{
			scopesSetter();
		});
	}, 2000);
}

export default SaveChanges;