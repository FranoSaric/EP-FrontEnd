/**
 * function for client side filtering in data grid
 * @param {object} filter - object with information about column field, filter operator and filter value
 * @param {array} dataArray - array of objects (table rows) to filter
 * @returns 
 */
function FilterData({filter, dataArray}){
	
	if(filter===undefined){
		// console.log("filter was undefined");
		return dataArray;
	}
	
	if(filter.value===undefined){
		// console.log("filter value was undefined");
		return dataArray;
	}
	
	const column=filter.columnField;
	const operator=filter.operatorValue;
	const value=filter.value.toString();
		
	if(operator==="contains"){
		return dataArray.filter((element)=> element[column].toString().toLowerCase().includes(value.toLowerCase()));
	}
	if(operator==="equals"){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=> element[column].toString().toLowerCase()===value.toLowerCase());
	}
	if(operator==="startsWith"){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=> element[column].toString().toLowerCase().startsWith(value.toLowerCase()));
	}
	if(operator==="endsWith"){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=> element[column].toString().toLowerCase().endsWith(value.toLowerCase()));
	}
	if(operator==="<"){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=>element[column]<value);
	}
	if(operator===">"){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=>element[column]>value);
	}
	if(operator==="="){
		if(value===""){
			return dataArray;
		}
		return dataArray.filter((element)=>element[column].toString()===value);
	}
	
	return dataArray;
}

export default FilterData;