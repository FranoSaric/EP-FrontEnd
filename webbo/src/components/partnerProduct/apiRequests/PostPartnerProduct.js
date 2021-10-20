import FetchRequest from "../../../api/FetchRequest";

/**
 *function for posting user on the server
 * @param {object} model - object representing data for posting
 *  {
 *      "partnerID": 0,
 *      "productID": 0
 *  }
 * @returns either response or error
 */
async function PostPartnerProduct(model) {
    const URL = process.env.REACT_APP_API_PARTNER + "/addPartnerProduct";
    const data = await FetchRequest(URL, "post", model);
    
    console.log("da vidimo posta li?", data);
    
    return data;
}

export default PostPartnerProduct;
