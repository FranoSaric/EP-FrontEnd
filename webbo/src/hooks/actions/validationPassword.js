export default function validate(value) {
    let message;
    if (!value) {
        message = "passwordReq";
    } else if (value.length < 8 || value.length > 32) {
        message = "passwordSize";
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%;:_<>!@#$&()\\\-`.+,/\"])[a-zA-Z0-9;:_<>%!@#$&()\\\-`.+,/\"]+$/.test(value)) {
        message = "passwordInvalid";
    } else message = "";

    return message;
}
