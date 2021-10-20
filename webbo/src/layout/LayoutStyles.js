import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:"rgba(241,245,249,1)",
        display: "flex",
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
        color:"#475569",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
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
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
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
    logo:{
        height:"45px",
        width:"140px"
    }
}));

export default useStyles;
