import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: "12px",
        padding: "0px",
        margin: "0px",
    },
    productList: {
        display: "flex",
        flexDirection: "column",
        padding: "4px",
        margin: "4px",
    },
    type: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "4px",
        margin: "3px",
    },
    typo: {
        marginRight: "15px",
    },
}));

export default useStyles;
