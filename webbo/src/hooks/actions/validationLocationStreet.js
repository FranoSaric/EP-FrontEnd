export default function validate(value) {
    let message = {};
    if (!value) {
        message = "locationReq";
    } else if (!/^[A-Za-z0-9._ ]+( [A-Za-z0-9._ ]+)*$/.test(value)) {
        message = "locationInvalid";
    } else if (value.length < 4 || value.length > 32) {
        message = "sizeLocation";
    } else message = "";

    return message;
}
