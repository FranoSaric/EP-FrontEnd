import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    button: {
        marginTop: theme.spacing(3),
        height: "2rem",
		width: "fit-content",
    },
}));

export default useStyles;
