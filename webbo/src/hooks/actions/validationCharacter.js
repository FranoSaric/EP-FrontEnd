export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^[A-Za-z ]*$/.test(value)) {
			message = "characterInvalid";
		} else message = "";

	}else message = "inputReq";
	return message;
}
