import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function PostPermissionScope(model) {
    const URL = process.env.REACT_APP_API_PARTNER + "/addPermissionScope";
    const data = await FetchRequest(URL, "post", model);

    return data;
}

export default PostPermissionScope;
