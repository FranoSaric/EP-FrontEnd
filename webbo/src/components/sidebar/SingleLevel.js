import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import useStyles from "./MenuStyles";
import { useTranslation } from "react-i18next";

/**
 * Prints items that have no children
 * @param {object} item contains object or object with children in it
 * @param {boolean} showNav variable of useState which determinate will sideBar be opened or closed
 * @param {function} setShowNav function of useState that sets the value to showNav
 * @returns
 */

const SingleLevel = (props) => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const classes = useStyles();
    const { t } = useTranslation();
    const [expandedId, setExpandedId] = useState(-1);

    
    const handleExpandClick = (i) => {
        sessionStorage.clear();
        props.setExpandedId(props.expandedId === i ? -1 : i);

        if (props.expandedId === props.id) {
            props.setIsSelected(true);
            setExpandedId(-1);
        }

        if (props.item === undefined) return;
        else if (props.showNav === undefined) {
            return;
        } else {
            {
                isMobile && props.setShowNav(false);
            }
            if (!props.showNav) props.setShowNav(true);
        }
    };

    useEffect(() => {
        if (!props.showNav) {
            props.setExpandedId(-1);
        }

        let linkArray = props.item.to.split("/");

        if (window.location.href.includes(linkArray[linkArray.length - 1])) {
            props.setIsSelected(true);
        } else {
            props.setIsSelected(false);
        }
    }, [props.showNav, window.location.href, props.expandedId]);

    return (
        <ListItem
            className={classes.sublink}
            button
            onClick={() => handleExpandClick(props.id)}
            classes={{
                selected: classes.selected,
            }}
            selected={props.isSelected}
        >
            <ListItemIcon className={classes.button}>
                <Tooltip title={t(props.item.title)}>{props.item.icon}</Tooltip>
            </ListItemIcon>
            <NavLink exact to={props.item.to} className={classes.sublink}>
                <ListItemText primary={t(props.item.title)} />
            </NavLink>
        </ListItem>
    );
};

export default SingleLevel;
