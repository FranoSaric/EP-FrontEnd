/**
 * Function takes all rows and page size and transforms rows into array of pages of rows
 * @param {array} rows - array of objects that represent rows in table
 * @param {integer} pageSize - represents number of rows shown per page
 * @returns array of arrays, which represents pages of data
 */
const GetPagedData=(rows, pageSize)=>{
	let counter=0;
	let arrayOfArrays=[];
	let array=[];
	rows.forEach((row)=>{
		array.push(row);
		if((counter+1)===pageSize){
			arrayOfArrays.push(array);
			array=[];
			counter=0;
		}else{
			counter=counter+1;
		}
	});
	arrayOfArrays.push(array);
	return arrayOfArrays;
}

export default GetPagedData;