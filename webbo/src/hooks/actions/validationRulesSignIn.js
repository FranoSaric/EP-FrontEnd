import validateUsername from "./validationUsername";
import validatePassword from "./validationPassword";
export default function validate({ username, password }) {
    let errors = {};

    if (validateUsername(username).username) {
        errors.username = validateUsername(username);
    }
    if (validatePassword(password).password) {
        errors.password = validatePassword(password);
    }

    return errors;
}
