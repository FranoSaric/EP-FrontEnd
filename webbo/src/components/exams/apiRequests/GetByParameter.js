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
  const URL = process.env.REACT_APP_API_LOCALE + "/getExams";

  const setLoadedTable = useGlobalState()[0];

  // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page, ",pagesize: ", pageSize);

  let dataArray = [];
  // let partnerId = parseInt(localStorage.getItem("partnerId"));

  const data = await FetchRequest(URL, "post");

  const filteredData = data.filter((item) => item.course.id === specialFilter);

  filteredData.forEach((element) => {
    dataArray.push({
      id: element.id,
      date: new Date(element.date).toLocaleString("en-US", {
        timeZone: "Europe/Sarajevo",
      }),
      courseFK: element.courseFK,
      classroomFK: element.classroomFK,
      courseName: element.course.name,
      classroomName: element.classroom.numberOfClassroom,
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
