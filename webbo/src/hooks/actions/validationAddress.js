export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^[A-Za-z0-9'\.\-\s\,]+$/.test(value)) {
			message = "addressInvalid";
		} else message = "";

	}else message = "inputReq";
	return message;
}