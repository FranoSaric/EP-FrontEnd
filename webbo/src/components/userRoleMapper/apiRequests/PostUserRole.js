import FetchRequest from "../../../api/FetchRequest";

/**
 * 
 * @param {int} userId 
 * @param {int} roleId 
 * @returns 
 */
async function PostUserRole(userId, roleId){
	
	const URL = process.env.REACT_APP_API_USER + "/addUserRole";
    
	const model={
		"userID": userId,
		"roleID": roleId
	}
	
    const data = await FetchRequest(URL, "post", model);
    return data;
}

export default PostUserRole;