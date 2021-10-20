export default function validate(value) {
    let message;
    if (!value) {
        message = "descriptionReq";
    } else if (!/^(.|\s)*[a-zA-Z]+(.|\s)*$/.test(value)) {
        message = "descriptionInvalid";
    } else message = "";

    return message;
}
