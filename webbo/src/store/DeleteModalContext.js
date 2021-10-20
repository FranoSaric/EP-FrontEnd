import React, {useState} from "react";

const DeleteModalContext=React.createContext({
	isModalOn: false,
	itemId: 0,
	setIsModalOn: ()=>{},
	setItemId: ()=>{},
});


export const DeleteModalContextProvider=(props)=>{
	const [isModalOn, setIsModalOn]=useState(false);
	const [itemId, setItemId]=useState(0);
	
	return(
		<DeleteModalContext.Provider value={{isModalOn: isModalOn, itemId: itemId, setIsModalOn: setIsModalOn, setItemId: setItemId}}>
			{props.children}
		</DeleteModalContext.Provider>
	);
}

export default DeleteModalContext;