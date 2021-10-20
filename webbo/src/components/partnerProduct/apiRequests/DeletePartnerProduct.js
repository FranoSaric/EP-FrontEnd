import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 *  {
 *      "idPartnerProduct": 0
 *  }
 * @returns either response or error
 */
async function DeletePartnerProduct(model) {
    const URL = process.env.REACT_APP_API_PARTNER + "/deletePartnerProduct";
    const data = await FetchRequest(URL, "post", model);
    
    
    console.log("da vidimo brise li?", data);
    
    return data;
}

export default DeletePartnerProduct;
