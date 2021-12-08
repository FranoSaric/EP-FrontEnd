import { makeStyles } from "@material-ui/core/styles";

const drawerWidthMobile = "250px";
const drawerWidth = "350px";

const useStyles = makeStyles(
    (theme) => ({
        root: {
            backgroundColor: "rgba(241,245,249,1)",
            display: "flex",
            '& .MuiGrid-spacing-xs-3': {
                width: 'auto !important',
                margin: 0
             },
             '& .MuiGrid-spacing-xs-3 > .MuiGrid-item': {
                padding: "12px 16px"
             },
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,
        },
        appBar: {
            backgroundColor: "#fff",
            color: "#475569",
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShiftMobile: {
            marginLeft: drawerWidthMobile,
            width: `calc(100% - ${drawerWidthMobile})`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperMobile: {
            backgroundColor: "rgba(30,41,59, 1)",
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidthMobile,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            height: "100vh",
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth})`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: "2vw",
        },
        // button: {
        //     display: "flex",
        //     flexGrow: 1,
        //     justifyContent: "flex-end",
        // },
        // buttonMobile: {
        //     display: "flex",
        //     flexGrow: 1,
        //     marginLeft: "-25px",
        // },
        menu: {
            flexGrow: 10,
        },
        menuButtonHidden: {
            display: "none",
        },
        
        drawerPaper: {
            backgroundColor: "rgba(30,41,59, 1)",
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            height: "100vh",
        },
        drawerPaperClose: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(0),
            [theme.breakpoints.up("761")]: {
                width: theme.spacing(9),
            },
        },
        menuSubContainer: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
        },
        fixedHeight: {
            height: 240,
        },
        offset: theme.mixins.toolbar,
        items: {
            color: "#c3c2c8",
        },
        logo: {
            height: "55px",
            width: "115px",
        },
        version: {
            width: "100%",
            textAlign: "center",
            color: "#fff",
        },
    }),
    { index: 1 }
);

export default useStyles;
