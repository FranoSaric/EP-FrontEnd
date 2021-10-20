import ClaimValueArray from "./ClaimValueArray";
/**
 * 
 * @param {string} claim specific claim value
 * @returns 
 */
const ActionValidator=(claim)=>{
	let existing=false;
	let claimValueArray=ClaimValueArray();
	claimValueArray.forEach((element)=>{
		if(claim===element){
			existing=true;
		}
	});
	return existing;
}

export default ActionValidator;