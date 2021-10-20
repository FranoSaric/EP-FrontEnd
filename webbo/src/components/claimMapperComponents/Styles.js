import { sizing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    // dataGrid: {
    //     '& .MuiDataGrid-renderingZone': {
    // 		maxHeight: 'none !important',
    //     },
    //     '& .MuiDataGrid-cell': {
    //         lineHeight: 'unset !important',
    //         maxHeight: 'none !important',
    //         whiteSpace: 'normal',
    //     },
    //     '& .MuiDataGrid-row': {
    // 		maxHeight: 'none !important',
    //     },
    // 	width: "100%",
    //     height: 550,
    //     [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
    //         height: 820,
    //     },
    // },
    accordion: {
        width: "100%",
    },
    label: {
        fontSize: "12px",
        padding: "0px",
        margin: "0px",
    },
    typeList: {
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
