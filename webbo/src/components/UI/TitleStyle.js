import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    // titleWrapper: {
    //     display: "flex",
    //     alignItems: "center",
    // },
    arrowBack: {
        marginRight: "8px",
    },
    newWrapper: { display: "flex", alignItems: "center" , cursor: "pointer"},
    newItem: {
        fontSize: "14px",
        marginRight: "8px",
    },
    title: {
        flexGrow: 1,
    },
}));
export default useStyles;
