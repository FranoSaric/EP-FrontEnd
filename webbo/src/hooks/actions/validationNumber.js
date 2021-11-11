export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^[0-9]*$/.test(value)) {
			message = "numberInvalid";
		} else message = "";

	}else message = "inputReq";
	return message;
}
