import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function PostRole(model) {
    const URL = process.env.REACT_APP_API_USER + "/addRole";
    const data = await FetchRequest(URL, "post", model);
    
    return data;
}

export default PostRole;
