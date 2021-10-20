import Routes from "../routes/Routes";
import ClaimValueArray from "./ClaimValueArray";

let isValidated=false;
/**
 * this is global variable in which validated routes are stored for layout to map from
 */
export let validatedRoutes=[];

/**
 * function takes packed claims from local storage and filter
 * all application routes that are not defined by those claims
 */
export const RoutesValidator=()=>{
	
	if(!isValidated){
		
		let claimValueArray=ClaimValueArray();
		
		let filteredRoutes;
		let isDeveloper=false;
		
		filteredRoutes=Routes.filter((route)=>{
			for(let i=0;i<claimValueArray.length;i++){
				if(route.claimValue===claimValueArray[i]){
					return route;
				}else if(route.claimValue===""){
					return route;
				}
			}
		});
		
		isValidated=true;
		validatedRoutes=filteredRoutes;
	}
	
}