import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "content-height",
        marginTop: theme.spacing(4),
		display: "flex",
		justifyContent: "center",
    },
    paper: {
		width: "clamp(200px, 65vw, 1000px)",
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
		justifyContent: "center",
    },
    button: {
        margin: theme.spacing(2),

    },
	buttonText: {
        fontSize: "clamp(0.7rem, 1.2vw, 4rem)",
    },
    text: {
        color: "#545454",
        textAlign: "center",
        fontSize: "clamp(0.8rem, 2vw, 5rem)",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        fontFamily: "Impact, fantasy",
        margin: 0,
		fontSize: "clamp(1.2rem, 5vw, 7rem)",

    },
    status: {
        fontFamily: "Impact, fantasy",
        margin: 0,
		fontSize: "clamp(3rem, 7vw, 10rem)",
    },
}));
export default useStyles;
