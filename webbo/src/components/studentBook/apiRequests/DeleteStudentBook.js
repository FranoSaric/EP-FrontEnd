import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 * @returns either response or error
 */
async function DeleteStudentBook(model) {
    const URL = process.env.REACT_APP_API_LOCALE + "/deleteStudentBook";
    const data = await FetchRequest(URL, "delete", model);
    return data;
}

export default DeleteStudentBook;
