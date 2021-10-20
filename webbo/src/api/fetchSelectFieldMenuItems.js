import sortByName from "../functions/sortByName";
import FetchRequest from "./FetchRequest";

const getData = async(URL) => {
	const data = await FetchRequest(URL, "post", {})
	return JSON.parse(data.data);
}

export default async function fetchSelectFieldMenuItems(ids) {
	let sortedDataObjects = {}
	let url = "";
	let name = "name"
	for(let i = 0; i<ids.length; i++){
		switch (ids[i]) {
			case "userType":
				url = `${process.env.REACT_APP_API_USER}/getUserType`;
				break;
	
			case "scopePermission":
				url = `${process.env.REACT_APP_API_PARTNER}/getPermissionScope`;
				name = "Name";
				break;
	
			case "role":
				url = `${process.env.REACT_APP_API_USER}/getRole`;
				break;
	
			case "states":
				url = `${process.env.REACT_APP_API_SHOP}/getState`;
				name = "NazivDrzave"
				break;
	
			case "partnerID":
				url = `${process.env.REACT_APP_API_PARTNER}/getPartner`;
				name = "Naziv"
				break;
	
			case "product":
				url = `${process.env.REACT_APP_API_PARTNER}/getProduct`;
				name = "Name"
				break;
	
			default:
				url = `${process.env.REACT_APP_API_USER}/getUserType`;
				break;
		}
		let data = await getData(url)
		let sortedArray = sortByName(data, name)
		sortedDataObjects = {...sortedDataObjects, [ids[i]]: sortedArray}
	};

	return sortedDataObjects;
}