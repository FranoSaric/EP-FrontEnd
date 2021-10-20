export default function validate(value) {
    let message;
    if(!value){
		message = "inputReq";
	} else if (value.length < 1 || value.length > 3) {
        message = "ISO2";
    } else message = "";

    return message;
}