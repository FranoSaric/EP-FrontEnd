import sortByName from "../functions/sortByName";
import FetchRequest from "./FetchRequest";

const getData = async (URL, method, model) => {
    const data = await FetchRequest(URL, method, model);
    return data;
};

export default async function fetchSelectFieldMenuItems(ids) {
    let sortedDataObjects = {};
    let url = "";
    let name = "name";
    let method = "";
    let model = {};
    const role = localStorage.getItem("role");
    for (let i = 0; i < ids.length; i++) {
        switch (ids[i]) {
            case "userType":
                url = `${process.env.REACT_APP_API_USER}/getUserType`;
                method = "get";
                break;

            case "users":
                url = `${process.env.REACT_APP_API_LOCALE}/getUsers`;
                method = "post";
                name = "firstName";
                model = {
                    institutionId: parseInt(
                        localStorage.getItem("institutionId")
                    ),
                };
                break;

            case "studies":
                url = `${process.env.REACT_APP_API_LOCALE}/getStudies`;
                method = "post";
                name = "name";
                if (role !== "Developer") {
                    model = {
                        institutionId: parseInt(
                            localStorage.getItem("institutionId")
                        ),
                    };
                }
                break;

            case "scopePermission":
                url = `${process.env.REACT_APP_API_PARTNER}/getPermissionScope`;
                method = "get";
                name = "Name";
                break;

            case "role":
                url = `${process.env.REACT_APP_API_USER}/getRole`;
                method = "get";
                name = "name";
                break;

            case "states":
                url = `${process.env.REACT_APP_API_SHOP}/getState`;
                method = "get";
                name = "NazivDrzave";
                break;

            case "partnerID":
                url = `${process.env.REACT_APP_API_PARTNER}/getPartner`;
                method = "get";
                name = "Naziv";
                break;

            case "product":
                url = `${process.env.REACT_APP_API_PARTNER}/getProduct`;
                method = "get";
                name = "Name";
                break;

            ///////////////////////////
            case "institutions":
                url = `${process.env.REACT_APP_API_LOCALE}/getInstitutions`;
                method = "post";
                name = "name";
                if (role !== "Developer") {
                    model = {
                        institutionId: parseInt(
                            localStorage.getItem("institutionId")
                        ),
                    };
                }
                break;

            case "categories":
                url = `${process.env.REACT_APP_API_LOCALE}/getCategories`;
                method = "get";
                name = "name";
                break;

            case "roleFK":
                url = `${process.env.REACT_APP_API_LOCALE}/getRoles`;
                method = "get";
                name = "name";
                break;

            case "libraries":
                url = `${process.env.REACT_APP_API_LOCALE}/getLibraries`;
                method = "post";
                name = "name";
                model = {
                    institutionId: parseInt(
                        localStorage.getItem("institutionId")
                    ),
                };
                break;

            case "books":
                url = `${process.env.REACT_APP_API_LOCALE}/getBooksLibrary`;
                method = "post";
                name = "books";
                model = {
                    institutionId: parseInt(
                        localStorage.getItem("institutionId")
                    ),
                };
                break;

            case "classrooms":
                url = `${process.env.REACT_APP_API_LOCALE}/getClassrooms`;
                method = "post";
                name = "numberOfClassroom";
                if (role !== "Developer") {
                    model = {
                        institutionId: parseInt(
                            localStorage.getItem("institutionId")
                        ),
                    };
                }
                break;

            case "courses":
                url = `${process.env.REACT_APP_API_LOCALE}/getCourses`;
                method = "post";
                name = "name";
                if (role !== "Developer") {
                    model = {
                        userId: parseInt(
                            localStorage.getItem("userID")
                        ),
                    };
                }
                break;

            default:
                url = `${process.env.REACT_APP_API_USER}/getUserType`;
                method = "get";
                break;
        }
        let data = await getData(url, method, model);
        let sortedArray = sortByName(data, name);
        sortedDataObjects = { ...sortedDataObjects, [ids[i]]: sortedArray };
    }

    return sortedDataObjects;
}
