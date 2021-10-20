import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "fit-content",
        backgroundColor: theme.palette.background.paper,
    },
    selected: {
        "&.Mui-selected": {
            color: "#609bed",
        },
        "& div": {
            color: "#609bed",
        },
    },
    nested: {
        backgroundColor: "rgba(15,23,42,1)",
        paddingLeft: theme.spacing(2),
    },
    nestedChild: {
        paddingLeft: theme.spacing(4),
    },
    button: {
        color: "#c3c2c8",
    },
    link: {
        color: "#c3c2c8",
        textDecoration: "none",
        "&:hover": {
            color: "rgba(255,255,255,1)",
        },
    },
    sublink: {
        textDecoration: "none",
        color: "rgba(148,163,184,1)",
        whiteSpace: "normal",
    },
}));

export default useStyles;
