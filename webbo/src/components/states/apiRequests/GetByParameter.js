import FetchRequest from "../../../api/FetchRequest";
import FilterData from "../../../api/dataGridApi/FilterData";
import GetPagedData from "../../../api/dataGridApi/GetPagedData";
import useGlobalState from "../../../store/useGlobalState";

/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
async function GetByParameter({ filter, page, pageSize }) {
    const URL = process.env.REACT_APP_API_SHOP + "/getState";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let dataArray = [];

    const data = await FetchRequest(URL, "post", {});

    let sortedData = JSON.parse(data.data).sort(function (a, b) {
        var nameA = a.NazivDrzave.toUpperCase(); // ignore upper and lowercase
        var nameB = b.NazivDrzave.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    sortedData.forEach((element) => {
        dataArray.push({
            id: element.IDDrzava,
            nazivDrzave: element.NazivDrzave,
            kraticaDrzave: element.KraticaDrzave,
            isO2: element.ISO2,
            isO3: element.ISO3,
        });
    });

    dataArray = FilterData({ filter, dataArray });
    let pagedData = GetPagedData(dataArray, pageSize);

    const numberOfRows = dataArray.length;
    const pageOfRows = pagedData[page];

    setLoadedTable(pageOfRows);

    return { numberOfRows, pageOfRows };
}

export default GetByParameter;
