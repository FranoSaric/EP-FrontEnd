import FetchRequest from "../../../api/FetchRequest";
import FilterData from "../../../api/dataGridApi/FilterData";
import GetPagedData from "../../../api/dataGridApi/GetPagedData";
import useGlobalState from "../../../store/useGlobalState";
import { PausePresentationTwoTone } from "@material-ui/icons";

/**
 *
 * @param {string} userID - userID from params
 * @returns
 */
async function GetRoleClaims(userID) {
    const URL = process.env.REACT_APP_API_LOCALE + "/getRoleClaim";
	
	
    let dataArray = [];

	
    const data = await FetchRequest(URL, "post", {userId: parseInt(userID)});
	
	data.forEach((element) => {
        dataArray.push({
            id: element.permissionClaimFK,
            roleID: element.roleFK,
            ClaimType: element.permissionClaim.type,
            ClaimValue: element.permissionClaim.value
        });
    });
	
    return dataArray;
}

export default GetRoleClaims;