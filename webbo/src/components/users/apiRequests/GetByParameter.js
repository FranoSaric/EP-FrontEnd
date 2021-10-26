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
async function GetByParameter({ filter, page, pageSize, sort, specialFilter }) {
    const URL = process.env.REACT_APP_API_LOCALE + "/getUsers";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

    let dataArray = [];
    // let partnerId = parseInt(localStorage.getItem("partnerId"));
    
    
    const data = await FetchRequest(URL, "get");
    console.log(data)

    data.forEach((element) => {
        dataArray.push({
            id: element.id,
            indexNumber: element.indexNumber,
            userName: element.userName,
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.email,
            creationDate: element.creationDate,
			roleFK: element.role.roleFK,
			institutionFK: element.institution.institutionFK,
            roleName: element.role.name,
            institutionName: element.institution.name
        });
    });
    console.log("data",data)


    dataArray = FilterData({ filter, dataArray });
	let pagedData = GetPagedData(dataArray, pageSize);
	
	const numberOfRows = dataArray.length;
	const pageOfRows = pagedData[page];

	setLoadedTable(pageOfRows);

	return { numberOfRows, pageOfRows };
}

export default GetByParameter;