export default function validate(value) {
    let message;
    if (value) {
        if (value.length > 0 && value.length !== 16 || !/^[0-9]+$/.test(value)) {
            message = "giroAccountInvalid";
        } else message = "";
    } else message = "inputReq";
    return message;
}
