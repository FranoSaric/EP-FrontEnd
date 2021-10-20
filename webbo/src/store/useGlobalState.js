let loadedTable=[];
let loadedId=0;
let loadedName="";
/**
 * 
 * @returns [function, function] setLoadedTable, getRow 
 * - setLoaded is used to set data from the currently loaded table into an global state
 * - getRow is used to fetch an row from the table by the id
 */
const useGlobalState=(state)=>{
	
	/**
	 * 
	 * @param {[]} newTable - array of objects representing table rows 
	 */
	const setLoadedTable=(newTable)=>{
		// console.log("setLoadedTable je pozvan!");
		loadedTable=newTable;
		// console.log("valjda je postavljen, loadedTable: ", loadedTable);
	}
	
	
	/**
	 * 
	 * @param {integer} id - id of specific row
	 * @returns {} - object representing an row from the table
	 */
	const getRow=(id)=>{
		const array=loadedTable.filter((element)=> { return element.id.toString()===id;});
		const row={...array[0]};
		
		return row;
	}
	
	const setLoadedId=(id)=>{
		loadedId=id;
	}
	
	const getLoadedId=()=>{
		return loadedId;
	}
	
	const setLoadedName=(name)=>{
		loadedName=name;
	}
	
	const getLoadedName=()=>{
		return loadedName;
	}
	
	const clearState=()=>{
		loadedId=0;
		loadedName="";
	}
	
	return [setLoadedTable, getRow, setLoadedId, getLoadedId, setLoadedName, getLoadedName, clearState];
}

export default useGlobalState;