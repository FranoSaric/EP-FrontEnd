import FetchRequest from "../../../api/FetchRequest";

/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
// { filter, page, pageSize, specialFilter }
async function GetProducts(partnerId) {
    const URL = process.env.REACT_APP_API_PARTNER + "/getProduct";
    

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let dataArray = [];

    const data = await FetchRequest(URL, "post", {});
    // item.nazivDrzave === nazivDrzave
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDProduct,
            name: element.Name,
        });
    });
    
    return dataArray;
}

export default GetProducts;
