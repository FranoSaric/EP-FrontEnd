import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import clsx from "clsx";
import { menu } from "../components/sidebar/SideBarData";
import MenuItem from "../components/sidebar/MenuItem";
import ProfileMenu from "../components/profileMenu/ProfileMenu";
import Routes from "../routes/Routes";
import useStyles from "./LayoutStyles";
import { useMediaQuery } from "react-responsive";
import SimpleBackdrop from "../components/backdrop/SimpleBackdrop";
import {
    Typography,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    IconButton,
    Grid,
    Slide,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MsgBoxContextProvider } from "../store/MsgBoxContext";
import StatusError from "../components/UI/ErrorMessage/StatusError";
import logo from "../assets/back-office-logo.png";
import logo2 from "../assets/back-office-logo2.png";
import { logger } from "../hooks/functions/Logger";
import {
    RoutesValidator,
    validatedRoutes,
} from "../validators/RoutesValidator";
import {
    SideBarValidator,
    validatedSideBar,
} from "../validators/SideBarValidator";

/**
 * component that renders main layout of the page
 * @returns
 */
export default function Layout() {
    const [showNav, setShowNav] = useState(true);
    const [expandedId, setExpandedId] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const claims = JSON.parse(localStorage.getItem("claims"));
	
    RoutesValidator();
    SideBarValidator();

    useEffect(() => {
        if (localStorage.getItem("showNav") === "false") {
            return setShowNav(false);
        }
        setShowNav(true);
    }, []);

    useEffect(() => {
        if (!showNav) {
            setExpandedId(-1);
        }
        localStorage.setItem("showNav", showNav);
    }, [showNav]);

    useEffect(() => {
        if (isMobile) {
            return setShowNav(false);
        }
    }, [isMobile]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(
                    classes.appBar,
                    !isMobile && showNav && classes.appBarShift,
                    isMobile && showNav && classes.appBarShiftMobile,
                )}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setShowNav(!showNav)}
                        className={clsx(
                            classes.menuButton,
                            showNav && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    {!showNav && (
                        <Slide
                            direction="down"
                            in={true}
                            timeout={1000}
                            mountOnEnter
                            unmountOnExit
                        >
                            <img className={classes.logo} src={logo2} alt="" />
                        </Slide>
                    )}
                    <ProfileMenu showNav={showNav} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? "persistent" : "permanent"}
                classes={{
                    paper: clsx(
                        !isMobile && classes.drawerPaper,
                        !isMobile && !showNav && classes.drawerPaperClose,
                        isMobile && classes.drawerPaperMobile,
                        isMobile && !showNav && classes.drawerPaperClose
                    ),
                }}
                open={showNav}
            >
                <div className={classes.toolbarIcon}>
                    {showNav && (
                        <Slide
                            direction="down"
                            in={true}
                            timeout={1000}
                            mountOnEnter
                            unmountOnExit
                        >
                            <img className={classes.logo} src={logo} alt="" />
                        </Slide>
                    )}
                    <IconButton onClick={() => setShowNav(!showNav)}>
                        <ChevronLeftIcon className={classes.items} />
                    </IconButton>
                </div>
                <div className={classes.menuSubContainer}>
                    <List className={classes.items}>
                        {validatedSideBar.map((item, key) => (
                            <MenuItem
                                expandedId={expandedId}
                                setExpandedId={setExpandedId}
                                isSelected={isSelected}
                                setIsSelected={setIsSelected}
                                key={key}
                                id={key}
                                item={item}
                                showNav={showNav}
                                setShowNav={setShowNav}
                                onItemClick={() => {
                                    setShowNav(!showNav);
                                    setIsSelected(!isSelected);
                                }}
                            />
                        ))}
                    </List>
                    <Divider />

                    {showNav && (
                        <h5 className={classes.version}>
                            {process.env.REACT_APP_VERSION}
                        </h5>
                    )}
                </div>
            </Drawer>
            {isMobile && (
                <SimpleBackdrop
                    showNav={showNav}
                    close={() => setShowNav(false)}
                />
            )}
            <main
                className={classes.content}
                onClick={() => {
                    if (showNav && isMobile) setShowNav(!showNav);
                }}
            >
                {" "}
                <div className={classes.offset} />
                <MsgBoxContextProvider>
                    <Switch>
                        {validatedRoutes.map((route, idx) => {
                            return [
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                >
                                    <route.component classes={classes} />
                                </Route>,
                            ];
                        })}
                        <Redirect exact from="/" to="/dashboard" />
                        <Route path="*">
                            <Grid item xs={12} lg={12} sm={12}>
                                <StatusError
                                    errorTitle="pageNotFound"
                                    statusNumber="404"
                                    errorText="404text"
                                />
                            </Grid>
                        </Route>
                    </Switch>
                </MsgBoxContextProvider>
            </main>
        </div>
    );
}
