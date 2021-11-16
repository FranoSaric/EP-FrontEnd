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
    const URL = process.env.REACT_APP_API_LOCALE + "/getClassrooms";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let role = localStorage.getItem("role");
    let institutionId = parseInt(localStorage.getItem("institutionId"));
    let newData = [];
    let dataArray = [];
    // let partnerId = parseInt(localStorage.getItem("partnerId"));

    const data = await FetchRequest(URL, "post");

    if (role === "Developer") {
        newData = data.filter((item) => item.institution.id === specialFilter);
    } else {
        newData = data.filter((item) => item.institutionFK === institutionId);
    }

    newData.forEach((element) => {
        dataArray.push({
            id: element.id,
            numberOfClassroom: element.numberOfClassroom,
            numberOfSeats: element.numberOfSeats,
            floor: element.floor,
            free: element.free,
            institutionFK: element.institutionFK,
            institutionName: element.institution.name,
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
