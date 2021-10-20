import FetchRequest from "../../../api/FetchRequest";

async function GetAllRoles(userId){
	
	const URL = process.env.REACT_APP_API_USER + "/getRole";
    
    let dataArray = [];
    let partnerId=parseInt(localStorage.getItem("partnerId"));
    const data = await FetchRequest(URL, "post", {});
    
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDRole,
			Name: element.Name
        });
    });
    
    let newArray=[];
	if(partnerId!==0){
		dataArray.forEach((element)=>{
			if(element.Name!=="Developer"){
				newArray.push(element);
			}
		})
	}else{
		newArray=dataArray;
	}
    dataArray=newArray;
    return dataArray;
}

export default GetAllRoles;