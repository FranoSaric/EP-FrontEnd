import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),

        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 250,
        overlofw: "hidden",
    },
    select: {
        display: "flex",
    },
    item: {
        flexWrap: "wrap",
        width: "35rem",
        textOverflow: "ellipsis",
    },
    menuPaper: {
        maxHeight: 500,
        maxWidth: 300,
        overflow: "auto",
    },
    input: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "pre",
    },
}));

export default useStyles;
