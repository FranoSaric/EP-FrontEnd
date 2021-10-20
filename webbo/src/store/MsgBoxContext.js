import React, { useState } from "react";
/**
 * context that manages showing modal windows
 */
const MsgBoxContext = React.createContext({
    isModalOn: false,
    setIsModalOn: () => {},
    itemId: 0,
    setItemId: () => {},
});

export const MsgBoxContextProvider = (props) => {
    const [isModalOn, setIsModalOn] = useState(false);
    const [itemId, setItemId] = useState();
    
    return (
        <MsgBoxContext.Provider
            value={{
                isModalOn: isModalOn,
                setIsModalOn: setIsModalOn,
                itemId: itemId,
                setItemId: setItemId,
            }}
        >
            {props.children}
        </MsgBoxContext.Provider>
    );
};

export default MsgBoxContext;
