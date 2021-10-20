import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function DeletType(model) {
    const URL = process.env.REACT_APP_API_USER + "/deleteUserType";
    const data = await FetchRequest(URL, "post", model);
    return data;
}

export default DeletType;
