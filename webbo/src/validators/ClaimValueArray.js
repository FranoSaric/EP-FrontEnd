let claimValueArray=[];
/**
 * 
 * @returns {[]} claimValueArray - array of all ClaimValues that user have
 */
const ClaimValueArray = () => {
	
	if(claimValueArray.length<1){
		const claims=JSON.parse(localStorage.getItem("claims"));
		
		claims.forEach((element)=>{
			element.ClaimValues.forEach((value)=>{
				claimValueArray.push(value);
			})
		});
		
	}
	
	return claimValueArray;
}

export default ClaimValueArray;