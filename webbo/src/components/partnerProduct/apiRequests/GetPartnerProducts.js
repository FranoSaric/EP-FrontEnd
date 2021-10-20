import FetchRequest from "../../../api/FetchRequest";

/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
// { filter, page, pageSize, specialFilter }
async function GetPartnerProducts(partnerId) {
    const URL = process.env.REACT_APP_API_PARTNER + "/getPartnerProduct";
	
    let dataArray = [];
	console.log("partnerID", partnerId)
    const data = await FetchRequest(URL, "post", {"partnerID": partnerId});
	console.log("data", data)
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDPartnerProduct,
            partnerId: element.PartnerID,
            productId: element.ProductID,
            name: element.Name
        });
    });
    
    return dataArray;
}

export default GetPartnerProducts;
