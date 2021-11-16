export default function validate(value) {
    let message;
	if(value){
		if (value.length > 0 && !/^[0-9]$/.test(value)) {
			message = "phoneNumberInvalid";
		}else if(value === undefined || value.length === 0){
			message = "phoneNumberInvalid";
		} else message = "";
	} else if(value === undefined){
		message = "phoneNumberInvalid";
	} else message = "";

    return message;
}
