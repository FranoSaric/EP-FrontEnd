export default function validate(value) {
    let message = {};
    if (!value) {
        message = "usernameReq";
    } else if (!/^[A-Za-z0-9._]+$/.test(value)) {
        message = "usernameInvalid";
    } else if (value.length < 6 || value.length > 16) {
        message = "sizeUsername";
    } else message = "";

    return message;
}
