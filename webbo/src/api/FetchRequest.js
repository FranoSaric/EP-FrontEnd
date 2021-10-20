import { logger } from "../hooks/functions/Logger";
/**
 * function for dynamic api calls
 * @param {string} url - api url
 * @param {string} method - string representing fetch method(GET,POST...)
 * @param {object} model -object of data for sending
 * @returns either response or error
 */
async function FetchRequest(url, method, model) {
    let options = {};

    if (method === "get") {
        options = {
            method: "GET",
            headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
    }

    if (method === "post") {
        options = {
            method: "POST",
            body: JSON.stringify(model),
            headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                accept: "*/*",
            },
        };
    }

    try {
        const data = await fetch(url, options)
            .then((response) => {
                // console.log("response", response);
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }
                return response.json();
            })
            .then((data) => {
                return data;
            });
        return data;
    } catch (error) {
        return logger.error(error, 1001);
    }
}

export default FetchRequest;
