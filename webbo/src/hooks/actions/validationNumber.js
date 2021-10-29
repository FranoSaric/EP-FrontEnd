export default function validate(value) {
	let message;
	if(value){
		if (value.length > 0 && !/^[a-zA-Z0-9_. :+/-]*$/.test(value)) {
			message = "phoneNumberInvalid";
		} else message = "";

	}else message = "";
	return message;
}
