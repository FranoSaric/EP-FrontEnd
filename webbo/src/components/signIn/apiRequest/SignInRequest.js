import FetchRequest from "../../../api/FetchRequest";

/**
 *function for updating user 
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function SignInRequest(model){
	const URL = process.env.REACT_APP_API_LOCALE + "/signIn";
    const data = await FetchRequest(URL, "post", model);
    return data;
}

export default SignInRequest;