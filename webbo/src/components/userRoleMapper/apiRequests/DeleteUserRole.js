import FetchRequest from "../../../api/FetchRequest";

/**
 * 
 * @param {int} userRoleId 
 * @returns 
 */
async function DeleteUserRole(userRoleId){
	
	const URL = process.env.REACT_APP_API_USER + "/deleteUserRole";
    
	const model={
		"idUserRole": userRoleId
	}
	
    const data = await FetchRequest(URL, "post", model);
    return data;
}

export default DeleteUserRole;