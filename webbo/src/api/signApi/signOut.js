import { logger } from "../../hooks/functions/Logger";
const URL = process.env.REACT_APP_API_AUTHENTICATE + "/logout";

const signOut = async (body) => {
	return await fetch(URL, {
		body: JSON.stringify(body),
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if(response === undefined){
				throw new Error("Something went wrong!")
			}
			return response.status;
		})
		// .then((data) => {
		// 	if (data.Status === 404 && data.statusResponse === 404) {
		// 		return ({
		// 			errorTitle: "falseInfoTitle",
		// 			errorContent: "falseInfoContent",
		// 		});
		// 	} else if (data.status === 203 && data.statusResponse === 400) {
		// 		return ({
		// 			errorTitle: "falsePasswordTitle",
		// 			errorContent: "falsePasswordContent",
		// 		});
		// 	} else {
		// 		return(data.data);
		// 	}
		// })
		.catch((error) => {
			logger.error(error, 1001);
		});
};

export default signOut;
