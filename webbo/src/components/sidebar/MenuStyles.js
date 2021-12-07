import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative",
    boxSsizing: "border-box",
    textAlign: "left",
    alignIitems: "center",
    justifyContent: "flex-start",
    textDecoration: "none",
  },
  "&.MuiListItem-root": {
    paddingTop: "2px !important",
    paddingBottom: "2px !important",
  },
  selected: {
    "&.Mui-selected": {
      color: "#609bed",
    },
    "& div": {
      color: "#609bed",
    },
  },
  nested: {
    backgroundColor: "rgba(15,23,42,1)",
    padding: "4px 0",
  },
  nestedChild: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    color: "#c3c2c8",
  },
  link: {
    color: "#c3c2c8",
    textDecoration: "none",
    "&:hover": {
      color: "rgba(255,255,255,1)",
    },
  },
  sublink: {
    textDecoration: "none",
    color: "rgba(148,163,184,1)",
    whiteSpace: "normal",
    paddingTop: "2px !important",
    paddingBottom: "2px !important",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: " #fff",
      transition: "color 0.3s ease-in-out",
    },
  },
}));

export default useStyles;
