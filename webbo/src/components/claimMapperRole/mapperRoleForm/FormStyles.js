import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

  roleTitle: {
    margin: "4px 16px 24px 16px",
  },

  roleClaimWrapper: {
    padding: "8px 16px",
  },
  headingWrapper: {
    margin: "4px 16px 24px 16px",
    borderLeft: "5px solid #f1f5f9",
    padding: "4px",
    display: "flex",
    flexDirection: "column",
  },
  headingLabel: {
    fontSize: "14px",
    color: "#747E99",
    marginLeft: "16px",
    lineHeight: "20px",
  },
  headingValue: {
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "32px",
    margin: "0 0 0 16px",
  },
}));

export default useStyles;
