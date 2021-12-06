import { sizing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            margin: theme.spacing(3),
            padding: theme.spacing(4),
        },
    },
    dataGrid: {
        width: "100%",
        height: 550,
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            height: 820,
        },
        marginTop: theme.spacing(5),
        border: "none !important"
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    selectField: {
        width: "50%",
        marginBottom: "8px",
      },
      selectWrapper: {
        padding: "0 16px",
      },
}));

export default useStyles;
