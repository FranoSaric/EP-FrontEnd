let existingClaims=[];
let claimsForDeletion=[];//array of ID's
let claimsForAdding=[];//array of claimType claimValue pairs

/**
 * a hook with local variables in the file that serve as global state
 * it contains all the functions needed for the state manipulation. 
 * It is used for storing loaded claims for roles or users and storing made changes 
 * into either claimsForDeletion or claimsForAdding, from where changes are dispatched 
 * to the server with SaveChanges function
 * @returns  
 * 
 */
const useGlobalState=()=>{
	
	
	/**
	 * it sets loaded claims into the global variable
	 * @param {[]} newClaims array of objects representing claims
	 */
	const setExistingClaims=(newClaims)=>{
		console.log("new claims", newClaims, "claims", existingClaims)
		existingClaims=newClaims;
	}
	
	/**
	 * it gets claim item from existingClaims array 
	 * @param {string} type 
	 * @param {string} value 
	 * @returns {} - object with "type" and "value" properties
	 */
	const getClaim=(type, value)=>{
		const array=existingClaims.filter((element)=>{
			return element.ClaimType===type && element.ClaimValue===value;
		});
		
		const claim=array[0];
		
		return claim;
	}
	/**
	 * @returns {[]} existingClaims - global state variable
	 */
	const getAllClaims=()=>{
		return existingClaims;
	}
	
	const clearDeletion=()=>{
		claimsForDeletion=[];
		// console.log("deletion ociscen");
	}
	
	const getClaimsForDeletion=()=>{
		return claimsForDeletion;
	}
	
	const addToDeletion=(id)=>{
		claimsForDeletion.push(id);
		// console.log("added to deletion");
	}
	
	const removeFromDeletion=(id)=>{
		const array=claimsForDeletion.filter((element)=>{
			return element!==id;
		})
		claimsForDeletion=array;
		// console.log("removed from deletion");
	}
	
	const clearAdding=()=>{
		claimsForAdding=[];
		// console.log("adding ociscen");
	}
	const getClaimsForAdding=()=>{
		return claimsForAdding;
	}
	
	/**
	 * 
	 * @param {{}} claim - object : 
	 * {
	 * 		claimType: "string",
	 * 		claimValue: "string"
	 * } 
	 */
	const addToAdding=(claim)=>{
		claimsForAdding.push(claim);
		// console.log("added to adding");
	}
	
	
	/**
	 * 
	 * @param {{}} claim - object : 
	 * {
	 * 		claimType: "string",
	 * 		claimValue: "string"
	 * } 
	 */
	const removeFromAdding=(claim)=>{
		const array=claimsForAdding.filter((element)=>{
			return element.claimType!==claim.claimType && element.claimValue!==claim.claimValue;
		})
		claimsForAdding=array;
		// console.log("removed from adding");
	}
	
	
	return {
		setExistingClaims, 
		getClaim, 
		getAllClaims, 
		clearDeletion, 
		clearAdding, 
		addToDeletion, 
		addToAdding, 
		removeFromDeletion, 
		removeFromAdding,
		getClaimsForDeletion,
		getClaimsForAdding
	};
}

export default useGlobalState;