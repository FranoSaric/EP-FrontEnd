import React, { useState, useEffect } from "react";
import HasChildren from "./HasChildren";
import SingleLevel from "./SingleLevel";
import MultiLevel from "./MultiLevel";

/**
 * Checks whether the forwarded item has children or not.
 * Depending on it sends a multilevel or singlelevel component
 * @param {object} item contains object or object with children in it
 * @param {boolean} showNav variable of useState which determinate will sideBar be opened or closed
 * @param {function} setShowNav function of useState that sets the value to showNav
 * @returns
 */

const MenuItem = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        const linkArray = props.item.to.split("/");
        if (window.location.href.includes(linkArray[linkArray.length - 1])) {
            props.setIsSelected(true);
        } else {
            props.setIsSelected(false);
        }
    }, [window.location.href]);
    
    
    const Component = HasChildren(props.item) ? MultiLevel : SingleLevel;
    return (
        <Component
            expandedId={props.expandedId}
            setExpandedId={props.setExpandedId}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            id={props.id}
            item={props.item}
            showNav={props.showNav}
            setShowNav={props.setShowNav}
            onItemClick={props.onItemClick}
        />
    );
};

export default MenuItem;
