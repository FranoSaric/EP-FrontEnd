import React, { useState, useEffect} from "react";
import Scope from "./Scope";
import GetRoleClaims from "../claimMapperRole/apiRequests/GetRoleClaims";

/**
 * 
 * @param {string} roleId 
 * @param {[]} scopes - array of objects representing claims sorted by their respective scopes
 * @param {boolean} expanded
 * @returns 
 */
const Role=(props)=>{
	//state
	const [roleId, setRoleId]=useState(props.roleId);
	const [scopes, setScopes] = useState(props.scopes);
	const [expanded, setExpanded]=useState(props.expanded);
	const [loaded, setLoaded]=useState(false);
	const [existingClaims, setExistingClaims]=useState([]);
	// const [changed, setChanged]=useState(false);
	const [type, setType]=useState("updateWarning");
	//hooks
	// const { t } = useTranslation();
	// const {setExistingClaims}=useGlobalStateClaims();
	
	// used to load data
	useEffect(() => {
		setExpanded(props.expanded);
		if(props.expanded && !loaded){
			setLoaded(true);
			existingClaimsSetter();
		}else{
			//ovdje cemo unloadat podatke 
		}
	}, [props.expanded]);
	
	async function existingClaimsSetter(){
		const data=await GetRoleClaims(roleId);
		
		const newScopes=scopes.filter((scope)=>{
			let counter=0;
			scope.types.forEach((type) => {
				data.forEach((element)=>{
					// console.log(element.ClaimType, "(iz existingClaims)===", type.ClaimType,"(iz scopes)");
					if(element.ClaimType===type.ClaimType){
						counter=counter+1;
					}
				});
			});
			if(counter>0){
				return scope;
			}
		});
		
		setScopes(newScopes);
		setExistingClaims(data);
	}
	
	
	
	return (
		<>
			{scopes.map((scope)=> 
				<Scope 
					key={scope.scopeId} 
					scopeObject={scope} 
					refreshState={existingClaims} 
					existingClaims={existingClaims}
				/> 
			)}
		</>
	);
}

export default Role;