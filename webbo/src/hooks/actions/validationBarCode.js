export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^123456\d{8}$/.test(value)) {
			message = "";
		} else message = "";

	}else message = "inputReq";
	return message;
}
