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
    margin: "16px",
    "& .MuiButton-label": {
      color: "rgba(28, 81, 208, 1)",
    },
    "& .MuiButton-startIcon": {
      color: "rgb(117 130 151)",
    },
  },
  toolbarButton: {
    fontSize: "10px",
  },
  editIcon: {
    color: "#6d7b91",
  },
  deleteIcon: {
    color: "#f43f5e",
  },
  errorPlaceholder: {
    // display: "flex",
    // alignItems:"center",
    // justifyContent: "space-around",
    // height: "100%",
    // width: "100%",
    // background: "red",
    top: "50px",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250, 250, 250, 0.38)",
  },
  dataGrid: {
    "& .MuiDataGrid-window": {
      // minwidth: '950px !important',
    },
    "& .MuiDataGrid-main": {
      // minWidth: 'unset !important',
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
      border: "none !important",
    },
    //header title
    "& .MuiDataGrid-columnsContainer": {
      width: "100% !important",
      display: "flex !important",
      background: "rgb(241 245 249)",
      padding: "0 16px",
      borderTop: "1px solid rgba(226, 232, 240, 1)",
      borderBottom: "1px solid rgba(226, 232, 240, 1)",
    },
    //ovi ja da se title row scale-aq sa slideron
    "& .MuiDataGrid-columnHeaderWrapper": {
      minWidth: "800px !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-columnHeader": {
      minWidth: "unset !important",
      maxWidth: "none !important",
      width: "14% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-columnHeaderDraggableContainer": {
      // minWidth: 'unset !important',
      maxWidth: "none !important",
      width: "100% !important",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      // minWidth: 'unset !important',
      maxWidth: "none !important",
      width: "100% !important",
      paddingRight: 0,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      // minWidth: 'unset !important',
      maxWidth: "none !important",
      width: "100% !important",
      textAlign: "center",
    },

    //cells
    "& .MuiDataGrid-windowContainer": {
      minWidth: "unset !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-window": {
      minWidth: "unset !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    // ova je zasluzna za slider:
    "& .MuiDataGrid-dataContainer": {
      minWidth: "800px !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-renderingZone": {
      minWidth: "800px !important",
      maxWidth: "none !important",
      width: "100% !important",
    },
    "& .MuiDataGrid-row": {
      // maxHeight: 'none !important',
      width: "100% !important",
      // display: "flex !important",
      // justifyContent: "space-around",
      minWidth: "unset !important",
      maxWidth: "none !important",
      borderBottom: "1px solid rgba(226, 232, 240, 1)",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "rgba(241, 245, 249, .5)",
    },

    "& .MuiDataGrid-cell": {
      whiteSpace: "normal",
      width: "14%",
      minWidth: "unset !important",
      maxWidth: "none !important",
      borderBottom: "none !important",
    },
    "& .MuiTablePagination-root": {},

    border: "none !important",
    height: 550,
    [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
      height: 820,
    },
  },
}));

export default useStyles;
