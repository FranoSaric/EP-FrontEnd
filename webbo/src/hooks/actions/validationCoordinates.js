export default function validate(value) {
    let message;
    if (!value) {
        message = "coordinatesReq";
    } else if (
        !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
            value
        )
    ) {
        message = "coordinatesInvalid";
    } else message = "";

    return message;
}
