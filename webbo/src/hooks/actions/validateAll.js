export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && /^[a-zA-Z0-9 _.:\/-]*$/.test(value)) {
			message = "invalidInput";
		} else message = "";

	}else message = "inputReq";
	return message;
}
