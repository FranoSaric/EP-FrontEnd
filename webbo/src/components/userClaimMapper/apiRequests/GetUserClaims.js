import FetchRequest from "../../../api/FetchRequest";
import FilterData from "../../../api/dataGridApi/FilterData";
import GetPagedData from "../../../api/dataGridApi/GetPagedData";
import useGlobalState from "../../../store/useGlobalState";
import { PausePresentationTwoTone } from "@material-ui/icons";

/**
 *
 * @param {object} filter - filter object
 * @param {integer} page - page number
 * @param {integer} pageSize - number of rows per page
 * @returns
 */
async function GetUserClaims(userID) {
    const URL = process.env.REACT_APP_API_LOCALE + "/getUserClaim";
	
	const setLoadedTable=useGlobalState()[0];
    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page,",pagesize: ",pageSize);
	
    let dataArray = [];
	
    const data = await FetchRequest(URL, "post", {id: parseInt(userID)});
	
	data.forEach((element) => {
        dataArray.push({
            id: element.permissionClaimFK,
            userID: element.userFK,
            ClaimType: element.permissionClaim.type,
            ClaimValue: element.permissionClaim.value
        });
    });
	
    return dataArray;
}

export default GetUserClaims;
