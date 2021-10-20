import FetchRequest from "../../../api/FetchRequest";

async function GetUserRoles(userId){
	
	const URL = process.env.REACT_APP_API_USER + "/getUserRole";
    
	const model={
		"userID": userId
	}
	
    let dataArray = [];
    const data = await FetchRequest(URL, "post", model);
    
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDUserRole,
            userId: element.UserID,
            roleId: element.RoleID,
			roleName: element.Name
        });
    });
    return dataArray;
}

export default GetUserRoles;