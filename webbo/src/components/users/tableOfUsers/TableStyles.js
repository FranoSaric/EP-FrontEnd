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
    },
    //ovi ja da se title row scale-aq sa slideron
    "& .MuiDataGrid-columnHeaderWrapper": {
      minWidth: "1000px !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-columnHeader": {
      minWidth: "unset !important",
      maxWidth: "none !important",
      width: "11% !important",
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
      minWidth: "1000px !important",
      maxWidth: "none !important",
      width: "100% !important",
      display: "flex !important",
    },
    "& .MuiDataGrid-renderingZone": {
      minWidth: "1000px !important",
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
      borderBottom: "1px solid rgba(0,0,0, 0.12)",
    },
    "& .Mui-odd": {
      background: "rgba(109, 123, 145, 0.08)",
    },
    "& .MuiDataGrid-cell": {
      whiteSpace: "normal",
      width: "11%",
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

    // minwidth: '950px !important',
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
