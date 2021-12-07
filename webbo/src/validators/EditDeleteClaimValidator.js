export let updateClaim=false;
export let deleteClaim=false;
let isValidated=false;

export const EditDeleteClaimValidator=(claimType)=>{
	if(!isValidated){
		let claims=JSON.parse(localStorage.getItem("claims"));
		claims=claims.filter(element => {
			
			return element.ClaimType===claimType;
		});
		if(claims[0]!==undefined){
			claims[0].ClaimValues.forEach((value)=>{
				if(value.includes("manage")){
					updateClaim=true;
				}
				if(value.includes("manage")){
					deleteClaim=true;
				}
			});
		}
		isValidated=true;
	}
}

export const Unvalidate=()=>{
	isValidated=false;
	updateClaim=false;
	deleteClaim=false;
}
