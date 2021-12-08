import FetchRequest from "../../../api/FetchRequest";

/**
 *function for updating user 
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function ChangePassword(model){
	const URL = process.env.REACT_APP_API_LOCALE + "/changePassword";
    const data = await FetchRequest(URL, "post", {...model, id: localStorage.getItem("userID")});
    
    return data;
}

export default ChangePassword;