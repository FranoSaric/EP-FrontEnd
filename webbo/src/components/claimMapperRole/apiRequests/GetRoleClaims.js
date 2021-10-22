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
async function GetRoleClaims(roleID) {
    const URL = process.env.REACT_APP_API_LOCALE + "/getRoleClaim";
	
	const setLoadedTable=useGlobalState()[0];
    // console.log("Data fetched by paramteres: filter: ",filter,",page: ",page,",pagesize: ",pageSize);
	
    let dataArray = [];
    let partnerId = parseInt(localStorage.getItem("partnerId"));
	
    // const data = await FetchRequest(URL, "post", { partnerID: partnerId });
    const data = await FetchRequest(URL, "post", {id: parseInt(roleID)});
	
	data.forEach((element) => {
        dataArray.push({
            id: element.id,
            RoleID: element.roleFK,
            ClaimId: element.permissionClaimFK,
            ClaimType: element.permissionClaim.type,
            ClaimValue: element.permissionClaim.value,
        });
    });
	
    return dataArray;
}

export default GetRoleClaims;
