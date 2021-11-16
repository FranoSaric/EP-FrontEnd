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
    const URL = process.env.REACT_APP_API_LOCALE + "/getCourses";

    const setLoadedTable = useGlobalState()[0];

    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);



    let role = localStorage.getItem("role");
    let userId = parseInt(localStorage.getItem("userID"));
    let newData = [];
    let dataArray = [];


    const data = await FetchRequest(URL, "post");

    if (role === "Developer") {
        newData = data.filter((item) => item.user.id === specialFilter);
    } else {
        newData = data.filter((item) => item.userFK === userId);
    }

    newData.forEach((element) => {
        dataArray.push({
            id: element.id,
            name: element.name,
            academicYear: new Date(element.academicYear).toLocaleString("en-US", {timeZone: "Europe/Sarajevo"}),
            semester: element.semester,
            studyFK: element.studyFK,
            userFK: element.userFK,
            studyName: element.study.name,
            userName: element.user.name,
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
