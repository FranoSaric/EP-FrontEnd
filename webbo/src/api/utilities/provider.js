import { handleResponse, handleError } from "./response";

const BASE_URL =
    "https://services.testnisite.com:8103/Staging/BO01/api";

/** @param {string} resource */
const post = async (resource, model) => {
    const requestOptions = {
        method: "POST",
		mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
    };
    return await fetch(`${BASE_URL}/${resource}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);
};

const postLogger = async (resource, model) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return await fetch(`${BASE_URL}/${resource}`, requestOptions)
    .then(handleResponse)
    .catch(handleError);
};

const get = async () => {
  return await fetch(`${BASE_URL}`).then(handleResponse).catch(handleError);
};

export const apiProvider = {
    post,
    postLogger,
    get,
};
