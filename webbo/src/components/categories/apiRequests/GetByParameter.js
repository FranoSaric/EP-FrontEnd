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
	const URL = process.env.REACT_APP_API_LOCALE + "/getCategories";

	const setLoadedTable = useGlobalState()[0];

	let dataArray = [];
	const data = await FetchRequest(URL, "get", {});
	console.log("data",data);
	data.forEach((element) => {
		dataArray.push({
			id: element.id,
			name: element.name,
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
