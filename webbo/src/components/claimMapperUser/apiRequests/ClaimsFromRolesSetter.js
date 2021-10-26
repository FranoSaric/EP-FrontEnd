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

async function ClaimsFromRolesSetter(claimsArray){
	claimsFromRoles=claimsArray;
	claimsLoaded=true;
}

export default ClaimsFromRolesSetter;


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