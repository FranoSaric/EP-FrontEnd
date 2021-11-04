
/**
 * 
 * @param {string} dataClaims - response from fetch 
 * @returns array of claims sorted by their respective types and packed into objects
 */
const ClaimPacker=(dataClaims)=>{
	let typeArray=[];
	let claimTypeNames=Object.keys(dataClaims);
	claimTypeNames.forEach((type)=>{
		typeArray.push({
			ClaimType: type,
			ClaimValues: []
		});
	});
	for(let i=0;i<typeArray.length;i++){
		typeArray[i].ClaimValues=dataClaims[typeArray[i].ClaimType];
	}

	return typeArray;
}

export default ClaimPacker;