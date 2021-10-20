
/**
 * 
 * @param {string} dataClaims - response from fetch 
 * @returns array of claims sorted by their respective types and packed into objects
 */
const ClaimPacker=(dataClaims)=>{
	console.log("dataClaims",Object.keys(dataClaims))
	Object.keys(dataClaims)
	let data = dataClaims;
	let types=[];
	let typeArray=[];
	let counter=0;
	let counterType=0;
	let type="";
	let claimTypeNames=Object.keys(dataClaims);
	claimTypeNames.forEach((type)=>{
		typeArray.push({
			ClaimType: type,
			ClaimValues: []
		});
	});
	console.log("TypeArray: ", typeArray);
	for(let i=0;i<typeArray.length;i++){
		typeArray[i].ClaimValues=dataClaims[typeArray[i].ClaimType];
	}
	console.log("Novi typeArray",typeArray);

	return typeArray;
}

export default ClaimPacker;