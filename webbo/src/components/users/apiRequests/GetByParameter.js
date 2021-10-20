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
async function GetByParameter({ filter, page, pageSize, sort, specialFilter }) {
    const URL = process.env.REACT_APP_API_USER + "/getUsers";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page,",pagesize: ",pageSize);

    let dataArray = [];
    // let partnerId = parseInt(localStorage.getItem("partnerId"));
    
    // console.log("specialFilter: ", specialFilter);
    let model={
        partnerID: specialFilter!=="" ? specialFilter : 0,
        pageNumber: page+1,//paging in dataGrid starts with 0
        pageSize: pageSize,
        sortType: sort!==undefined ? sort.sort : "ASC",//ili DESC
        sortingColumn: sort!==undefined ? sort.field : "string"
    }
    const data = await FetchRequest(URL, "post", model);
    const dataSet=JSON.parse(data.data);
    
    dataSet.Items.forEach((element) => {
        dataArray.push({
            id: element.IDUser,
            userName: element.UserName,
            firstName: element.FirstName,
            lastName: element.LastName,
            email: element.Email,
            phoneNumber: element.PhoneNumber,
			userTypeName: element.UserTypeID,
			userType: element.UserTypeID,
			active: element.Active
        });
    });
    // dataArray = FilterData({ filter, dataArray });
    // let pagedData = GetPagedData(dataArray, pageSize);
    const types=await typesGetter();
    dataArray.forEach((user)=>{
        types.forEach((type)=>{
           if(type.id===user.userTypeName){
               user.userTypeName=type.name;
           } 
        });
    });
    
    
    const numberOfRows = dataSet.TotalCount;
    const pageOfRows = dataArray;
    
    setLoadedTable(dataArray);

    return { numberOfRows, pageOfRows };
}

export default GetByParameter;


async function typesGetter () {
    const URL = process.env.REACT_APP_API_USER + "/getUserType";

    let dataArray = [];
    let partnerId = parseInt(localStorage.getItem("partnerId"));

    const data = await FetchRequest(URL, "post", { partnerID: partnerId });
    JSON.parse(data.data).forEach((element) => {
        dataArray.push({
            id: element.IDUserType,
            name: element.Name,
            description: element.Description,
        });
    });
    
    return dataArray;
}