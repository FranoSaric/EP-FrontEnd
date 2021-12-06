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
  buttonContainer: {
    margin: "24px 0 12px 0",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
}));

export default useStyles;
