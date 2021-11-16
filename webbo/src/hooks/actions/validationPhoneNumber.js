export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^[\+\d]?(?:[\d-.\s()]*)$/.test(value)) {
			message = "phoneNumberInvalid";
		} else message = "";

	}else message = "inputReq";
	return message;
}
