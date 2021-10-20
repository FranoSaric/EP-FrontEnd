export default function validate(value) {
    let message;
    if (!value) {
        message = "inputReq";
    } else if (
        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'.-]+$/.test(
            value
        )
    ) {
        message = "inputInvalid";
    } else if (value.length < 2 || value.length > 16) {
        message = "inputSize";
    } else message = "";

    return message;
}
