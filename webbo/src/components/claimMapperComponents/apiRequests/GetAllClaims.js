import FetchRequest from "../../../api/FetchRequest";
/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
async function GetAllClaims() {
    const URL = process.env.REACT_APP_API_LOCALE + "/getPermissionClaims";
	
    let dataArray = [];
	
    const data = await FetchRequest(URL, "get");
    data.forEach((element) => {
        dataArray.push({
            id: element.id,
            type: element.type,
            value: element.value,
        });
    });
	let counter=0;
	let typeCounter=0;
	let typeArray=[];
	let lastType="";
	let customTypesArray=[];
	dataArray.forEach((element)=>{
		for(let i=0;i<counter;i++){
			if(element.type===typeArray[i]){
				typeCounter++;
			}
		}
		if(typeCounter<1){
			typeArray.push(element.type);
			customTypesArray.push({
				ClaimType: element.type,
				values: [],
			});
			counter=counter+1;
		}
		typeCounter=0;
	});

	let type="";

	for(let i=0; i<counter;i++){
		type=customTypesArray[i].ClaimType;
		dataArray.forEach((element)=>{
			if(element.type===type){
				
				customTypesArray[i].values.push({
					claimId: element.id,
					claimValue: element.value,
				});
			}
		});
	}


    return customTypesArray;
}

export default GetAllClaims;
