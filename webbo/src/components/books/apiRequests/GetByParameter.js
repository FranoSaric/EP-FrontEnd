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
    const URL = process.env.REACT_APP_API_LOCALE + "/getBooksLibrary";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let dataArray = [];

    const data = await FetchRequest(URL, "post", { institutionId: parseInt(localStorage.getItem("institutionId")) });
    // item.nazivDrzave === nazivDrzave
    const filteredData = data.filter(item => item.book.category.id === specialFilter);
    filteredData.forEach((element) => {
        dataArray.push({
            id: element.book.id,
            barCode: element.book.barCode,
            name: element.book.name,
            author: element.book.author,
            categoryFK: element.book.categoryFK,
            categoryName: element.book.category.name
        });
    });
	dataArray = sortByName(dataArray, "name");
    dataArray = FilterData({ filter, dataArray });
    let pagedData = GetPagedData(dataArray, pageSize);

    const numberOfRows = dataArray.length;
    const pageOfRows = pagedData[page];

    setLoadedTable(pageOfRows);

    return { numberOfRows, pageOfRows };
}

export default GetByParameter;
