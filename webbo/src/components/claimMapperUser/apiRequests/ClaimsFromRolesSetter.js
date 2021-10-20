import React from "react";
import GetUserRoles from "../../userRoleMapper/apiRequests/GetUserRoles";
import GetRoleClaims from "../../claimMapperRole/apiRequests/GetRoleClaims";

/**
 * 
 * @param {int} userId 
 * @returns 
 */

let claimsFromRoles=[];
let userRoles=[];
let claimsLoaded=false;

async function ClaimsFromRolesSetter(userId){
	claimsFromRoles=[];
	if(claimsFromRoles.length<1){
	}
	userRoles=await GetUserRoles(userId);
	
	let key=0;
	key=await prva(key);
	
	if(key!==0){
		claimsLoaded=true;
	}
	return(claimsFromRoles);
}

export default ClaimsFromRolesSetter;

async function prva(key){
	if(key===userRoles.length){
		return key;
	}
	let array=await GetRoleClaims(userRoles[key].roleId)
	claimsFromRoles=[...claimsFromRoles, ...array];
	let newKey=await prva(key+1);
	return newKey;
}

export const getClaimFromUserRoles=(type, value)=>{
	const array=claimsFromRoles.filter((element)=>{
		return element.ClaimType===type && element.ClaimValue===value;
	});
	
	const claim=array[0];
	
	return claim;
}

export const Clear=()=>{
	claimsFromRoles=[];
	userRoles=[];
	claimsLoaded=false;
}

export const isLoaded=()=>{
	return claimsLoaded;
}