import sortByName from "../functions/sortByName";
import FetchRequest from "./FetchRequest";

const getData = async (URL) => {
    const data = await FetchRequest(URL, "get", {});
    return data;
};

export default async function fetchSelectFieldMenuItems(ids) {
    let sortedDataObjects = {};
    let url = "";
    let name = "name";
    for (let i = 0; i < ids.length; i++) {
        switch (ids[i]) {
            case "userType":
                url = `${process.env.REACT_APP_API_USER}/getUserType`;
                break;

            case "users":
                url = `${process.env.REACT_APP_API_LOCALE}/getUsers`;
                name = "firstName";
                break;

            case "studies":
                url = `${process.env.REACT_APP_API_LOCALE}/getStudies`;
                name = "name";
                break;

            case "scopePermission":
                url = `${process.env.REACT_APP_API_PARTNER}/getPermissionScope`;
                name = "Name";
                break;

            case "role":
                url = `${process.env.REACT_APP_API_USER}/getRole`;
                name = "name";
                break;

            case "states":
                url = `${process.env.REACT_APP_API_SHOP}/getState`;
                name = "NazivDrzave";
                break;

            case "partnerID":
                url = `${process.env.REACT_APP_API_PARTNER}/getPartner`;
                name = "Naziv";
                break;

            case "product":
                url = `${process.env.REACT_APP_API_PARTNER}/getProduct`;
                name = "Name";
                break;

            ///////////////////////////
            case "institutions":
                url = `${process.env.REACT_APP_API_LOCALE}/getInstitutions`;
                name = "name";
                break;

            case "categories":
                url = `${process.env.REACT_APP_API_LOCALE}/getCategories`;
                name = "name";
                break;

            case "roleFK":
                url = `${process.env.REACT_APP_API_LOCALE}/getRoles`;
                name = "name";
                break;

            case "libraries":
                url = `${process.env.REACT_APP_API_LOCALE}/getLibraries`;
                name = "name";
                break;

            case "books":
                url = `${process.env.REACT_APP_API_LOCALE}/getBooks`;
                name = "name";
                break;

            case "classrooms":
                url = `${process.env.REACT_APP_API_LOCALE}/getClassrooms`;
                name = "numberOfClassroom";
                break;

            case "courses":
                url = `${process.env.REACT_APP_API_LOCALE}/getCourses`;
                name = "name";
                break;

            default:
                url = `${process.env.REACT_APP_API_USER}/getUserType`;
                break;
        }
        let data = await getData(url);
        let sortedArray = sortByName(data, name);
        sortedDataObjects = { ...sortedDataObjects, [ids[i]]: sortedArray };
    }

    return sortedDataObjects;
}
