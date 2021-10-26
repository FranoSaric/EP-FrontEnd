import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 * {
 *      "roleID": 0,
 *      "claimType": "string",
 *      "claimValue": "string"
 * }
 * @returns either response or error
 */
async function PostRoleClaim(model) {
    const URL = process.env.REACT_APP_API_LOCALE + "/createRoleClaim";
    const data = await FetchRequest(URL, "post", model);
    return data;
}

export default PostRoleClaim;
