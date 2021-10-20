import FetchRequest from "../../../api/FetchRequest";
/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
async function GetAllClaims() {
    const URL = process.env.REACT_APP_API_PARTNER + "/getPermissionClaim";
	
    let dataArray = [];
	
    const data = await FetchRequest(URL, "post", {});
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDPermissionClaim,
            scopePermissionName: element.ScopePermissionName,
            scopePermissionID: element.ScopePermissionID,
            ClaimType: element.Type,
            ClaimValue: element.Value,
        });
    });
	
	// console.log("dataArray: ", dataArray);
	// data shape
	// let object={
	// 	scopeName: "",
	// 	types: [
	// 		{
	// 			typeName: "",
	// 			value: [
	// 				{
	// 					claimId: "",
	// 					claimValue: "",
	// 				},
	// 				{
	// 					claimId: "",
	// 					claimValue: "",
	// 				},
	// 				{
	// 					claimId: "",
	// 					claimValue: "",
	// 				}
	// 			],
	// 		},
	// 	],
	// }
	
	// let typeObject={
	// 	ClaimType: "",
	// 	values: [],
	// }
	
	// let valueObject={
	// 	claimId: "",
	// 	claimValue: "",
	// }
	
	/////////////////////////////////////////////////////
	let scopeArray=[];
	let customTypesArray=[];
	let counterScopes=0;
	let counter=0;
    let type="";
	let value="";
	let typeArray=[];
	let counterType=0;
	
	//grupiranje scopeova
	dataArray.forEach((element)=>{
		for(let i=0;i<counterScopes;i++){
			if(element.scopePermissionName===typeArray[i]){
				counterType=counterType+1;
			}
		}
		if(counterType<1){
			typeArray.push(element.scopePermissionName);
			scopeArray.push({
				scopeId: element.scopePermissionID,
				scopeName: element.scopePermissionName,
				types: [],
			});
			counterScopes=counterScopes+1;
		}
		counterType=0;
	});
	// console.log("Scope array: ", scopeArray);
	
	/////////////////////////
	counter=0;
    type="";
	value="";
	typeArray=[];
	counterType=0;
    //grupiranje claim tipova:
	dataArray.forEach((element)=>{
		for(let i=0;i<counter;i++){
			if(element.ClaimType===typeArray[i]){
				counterType=counterType+1;
			}
		}
		if(counterType<1){
			typeArray.push(element.ClaimType);
			customTypesArray.push({
				scopeId: element.scopePermissionID,
				ClaimType: element.ClaimType,
				values: [],
			});
			counter=counter+1;
		}
		counterType=0;
	});
	// console.log("customTypesArray: ", customTypesArray);
	//dodavanje claim value-a u odgovarajuce tipove
    for(let i=0; i<counter;i++){
		type=customTypesArray[i].ClaimType;
		dataArray.forEach((element)=>{
			if(element.ClaimType===type){
				
				customTypesArray[i].values.push({
					claimId: element.id,
					claimValue: element.ClaimValue,
				});
			}
		});
	}
	// console.log("customTypesArray nakon dodavanja value-a: ", customTypesArray);
	//////////////////////
	for(let i=0;i<counterScopes;i++){
		customTypesArray.forEach((element)=>{
			if(element.scopeId===scopeArray[i].scopeId){
				scopeArray[i].types.push({
					ClaimType: element.ClaimType,
					values: element.values,
				});
			}
		});
	}
	// console.log("scope array nakon dodavanje tipova: ", scopeArray);
	///////////////////////////////////////////////////////////////////////////////////////////////
	
    return scopeArray;
}

export default GetAllClaims;
