import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./MenuStyles";
import MenuItem from "./MenuItem";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

/**
 * Prints items that have children and gives them some functionality
 * like the ability to dropdown and set an arrow to open
 * @param {object} item contains object or object with children in it
 * @param {boolean} showNav variable of useState which determinate will sideBar be opened or closed
 * @param {function} setShowNav function of useState that sets the value to showNav
 * @returns
 */

const MultiLevel = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { items: children } = props.item;
    const [showNav, setShowNav] = useState(true);
    const [expandedId, setExpandedId] = useState(-1);
    const [isSelected, setIsSelected] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    const handleExpandClick = (i) => {
        props.setExpandedId(props.expandedId === i ? -1 : i);

        if (props.expandedId === props.id) {
            setExpandedId(-1);
        }

        if (props.item === undefined) return;
        else if (props.showNav === undefined) {
            return;
        } else {
            if (!props.showNav) props.setShowNav(true);
        }
    };
    useEffect(() => {
        if (!props.showNav) {
            setExpandedId(-1);
        }
        const linkArray = props.item.to.split("/");

        if (window.location.href.includes(linkArray[linkArray.length - 1])) {
            props.setIsSelected(true);
        } else {
            props.setIsSelected(false);
        }
    }, [props.showNav, window.location.href]);

    return (
        <React.Fragment>
            <ListItem
                button
                onClick={() => handleExpandClick(props.id)}
                aria-expanded={props.expandedId === props.id}
                aria-label="show more"
                classes={{
                    selected: classes.selected,
                }}
                selected={props.isSelected}
            >
                <ListItemIcon className={classes.button}>
                    <Tooltip title={t(props.item.title)}>
                        {props.item.icon}
                    </Tooltip>
                </ListItemIcon>
                <ListItemText
                    className={clsx(!isMobile && classes.link)}
                    primary={t(props.item.title)}
                />
                {props.expandedId === props.id ? (
                    <ExpandLessIcon />
                ) : (
                    <ExpandMoreIcon />
                )}
            </ListItem>
            <Collapse
                in={props.expandedId === props.id}
                timeout="auto"
                mountOnEnter
            >
                <List component="div" disablePadding className={classes.nested}>
                    {children.map((child, key) => (
                        <MenuItem
                            key={child.title}
                            item={child}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            id={key}
                            showNav={showNav}
                            setShowNav={setShowNav}
                            onItemClick={props.onItemClick}
                        />
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default MultiLevel;
