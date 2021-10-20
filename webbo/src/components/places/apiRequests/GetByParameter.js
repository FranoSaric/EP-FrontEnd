import FetchRequest from "../../../api/FetchRequest";
import FilterData from "../../../api/dataGridApi/FilterData";
import GetPagedData from "../../../api/dataGridApi/GetPagedData";
import useGlobalState from "../../../store/useGlobalState";
import sortByName from "../../../functions/sortByName";

/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
async function GetByParameter({ filter, page, pageSize, specialFilter }) {
    const URL = process.env.REACT_APP_API_SHOP + "/getPlace";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let dataArray = [];

    const data = await FetchRequest(URL, "post", { });
    // item.nazivDrzave === nazivDrzave
    const filteredData = JSON.parse(data.data).filter(item => item.DrzavaID === specialFilter);
    filteredData.forEach((element) => {
        dataArray.push({
            id: element.IDMjesto,
            nazivMjesta: element.NazivMjesta,
            drzavaID: element.DrzavaID,
            nazivDrzave: element.NazivDrzave,
        });
    });
	dataArray = sortByName(dataArray, "nazivMjesta");
    dataArray = FilterData({ filter, dataArray });
    let pagedData = GetPagedData(dataArray, pageSize);

    const numberOfRows = dataArray.length;
    const pageOfRows = pagedData[page];

    setLoadedTable(pageOfRows);

    return { numberOfRows, pageOfRows };
}

export default GetByParameter;
