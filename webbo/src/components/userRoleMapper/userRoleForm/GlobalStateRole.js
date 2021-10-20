let existingRoles=[];
let rolesForDeletion=[];//array of ID's
let rolesForAdding=[];//array of claimType claimValue pairs

const useGlobalState=()=>{
	
	const setExistingRoles=(roles)=>{
		existingRoles=roles;
	}
	
	const getExistingRoles=()=>{
		return existingRoles;
	}
	
	/**
	 * 
	 * @param {int} roleId 
	 * @returns {boolean} isFound
	 */
	const findRole=(roleId)=>{
		let isFound=false;
		existingRoles.forEach((element)=>{
			if(element.roleId===roleId){
				isFound=true;
			}
		});
		return isFound;
	}
	
	/**
	 * 
	 * @param {int} roleId 
	 * @returns {int} userRoleId
	 */
	const getUserRoleId=(roleId)=>{
		let userRoleId=0;
		existingRoles.forEach((element)=>{
			if(element.roleId===roleId){
				userRoleId=element.id;
			}
		})
		return userRoleId;
	}
	
	const clearDeletionRole=()=>{
		rolesForDeletion=[];
	}
	
	const getRolesForDeletion=()=>{
		return rolesForDeletion;
	}
	
	const addToDeletion=(id)=>{
		rolesForDeletion.push(id);
	}
	
	const removeFromDeletion=(id)=>{
		const array=rolesForDeletion.filter((element)=>{
			return element!==id;
		})
		rolesForDeletion=array;
	}
	
	const clearAddingRole=()=>{
		rolesForAdding=[];
	
	}
	const getRolesForAdding=()=>{
		return rolesForAdding;
	}
	
	/**
	 * 
	 * @param {int} userId 
	 * @param {int} roleId 
	 */
	const addToAdding=(userId, roleId)=>{
		rolesForAdding.push({userId: userId, roleId: roleId });
	}
	
	/**
	 * 
	 * @param {int} roleId 
	 */
	const removeFromAdding=(roleId)=>{
		const array=rolesForAdding.filter((element)=>{
			return element.roleId!==roleId;
		})
		rolesForAdding=array;
	}
	
	return {
		setExistingRoles,
		getExistingRoles,
		findRole,
		getUserRoleId,
		clearDeletionRole,
		getRolesForDeletion,
		addToDeletion,
		removeFromDeletion,
		clearAddingRole,
		getRolesForAdding,
		addToAdding,
		removeFromAdding,
	};
}

export default useGlobalState;