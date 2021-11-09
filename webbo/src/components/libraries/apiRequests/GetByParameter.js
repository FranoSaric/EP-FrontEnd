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
	const URL = process.env.REACT_APP_API_LOCALE + "/getLibraries";

	const setLoadedTable = useGlobalState()[0];

	// console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

	let role = localStorage.getItem("role");
	let institutionId = parseInt(localStorage.getItem("institutionId"));
	let newData = [];

	const data = await FetchRequest(URL, "post", {});
	console.log("data", data)

	if(role === 'developer'){
		newData = data;
	}else{
		newData = data.filter(item => item.institutionId === institutionId);
	}

	let dataArray = [];
	
	newData.forEach((element) => {
		dataArray.push({
			id: element.id,
			name: element.name,
            institutionId: element.institutionId,
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
