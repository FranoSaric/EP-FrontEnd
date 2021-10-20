import { sizing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
/**
 * TODO napisati čemu služi
 */
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(6),
            padding: theme.spacing(4),
            width: "50%",
        },
    },
    button: {
        display: "flex",
        width: "fit-content",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    container: {
        width: "auto",
    },
    toolbar: {
        fontSize: "20px",
    },
    toolbarButton: {
        fontSize: "10px",
    },
    editIcon: {
        color: "#6d7b91",
    },
    deleteIcon: {
        color: "#e3244a",
    },
}));

export default useStyles;
