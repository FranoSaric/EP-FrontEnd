import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: "12px",
    height: "2rem",
    width: "fit-content",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
}));

export default useStyles;
