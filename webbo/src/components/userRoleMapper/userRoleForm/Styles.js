import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    accordion: {
        width: "100%",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    label:{
        fontSize: "12px",
        padding: "0px",
        margin: "0px",
    },
    typeList:{
        display: "flex",
        flexDirection: "column",
        padding: "4px",
        margin: "4px"
    },
    type: {
        display: "flex",
        flexDirection: "row",
        padding: "4px",
        margin: "3px"
    },
    title: {
		marginBottom: "1.5rem",
		borderBottom: "1px solid black",
        marginTop: theme.spacing(3),
        
	},
    userTitle: {
		marginBottom: "1.5rem",
	},
    loadingComponent: {
        marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
        display: "flex",
        width: "",
        justifyContent: "center",
    },

    arrows:{
        marginTop: "9px"
    }

}));

export default useStyles;
