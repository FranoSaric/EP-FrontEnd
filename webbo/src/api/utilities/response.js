export function handleResponse(response) {
    const responseJSON = response.json();

    if (responseJSON.result) {
        return response.results;
    }

    if (responseJSON.data) {
        return response.data;
    }

    return responseJSON;
}

export function handleError(error) {
    if (error.data) {
        return error.data;
    }
    return error;
}
