export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/.test(value)) {
			message = "invalidInput";
		} else message = "";

	}else message = "inputReq";
	return message;
}
