export default function validate(value) {
    let message;
    if (
        value.length > 0 &&
        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'.-]+$/.test(
            value
        )
    ) {
        message = "cityInvalid";
    } else message = "";

    return message;
}
