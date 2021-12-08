import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "99%",
    maxWidth: "500px",
    minWidth: "300px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  signin: {
    marginTop: theme.spacing(4),
    fontFamily: "Arial, sans-serif",
  },
  captcha: {
    margin: "16px 0",
  },
  logo: {
    height: "100px",
    width: "200px",
  },
}));
export default useStyles;
