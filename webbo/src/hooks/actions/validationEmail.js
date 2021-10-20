export default function validate(value) {
    let message;
    if (!value) {
        message = "emailReq";
    } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
        )
    ) {
        message = "emailInvalid";
    } else if (value.length < 5 || value.length > 50) {
        message = "emailSize";
    } else message = "";

    return message;
}
