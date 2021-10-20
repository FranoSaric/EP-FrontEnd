import { useState, useEffect } from "react";

let globalState={};
let listeners=[];
let actions={}

/**
 * example of context and redux alternative 
 * @param {boolean} shouldListen - it tells if the component should listen to state changes if it uses this hook 
 * @returns 
 */
export const useStore=(shouldListen=true)=>{
	const setState=useState(globalState)[1];
	
	const dispatch=actionIdentifier=>{
		const newState=actions[actionIdentifier](globalState);
		globalState={...globalState, ...newState}
		
		for (const listener of listeners){
			listener(globalState);
		}
	}
	
	useEffetc(()=>{
		if(shouldListen){
			listeners.push(setState);
		}
		
		return()=>{
			if(shouldListen){
				listeners=listerners.filter(li=>li!== setState);
			}
		}
	},[shouldListen]);
	
	return [globalState, dispatch];
}

export const initState=(userActions, initialState)=>{
	if(initialState){
		globalState={...globalState, initialState};
	}
	actions={...actions, ...userActions};
}