import React from "react";
import useStyles from "./ErrorMessageStyles";
import { useHistory } from "react-router";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const PageNotFound = (props) => {
    let history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                    <p className={classes.status}>{props.statusNumber}</p>
                    <p className={classes.error}>{t(props.errorTitle)}</p>
                    <h3 className={classes.text}>
                        {t(props.errorText)}
                    </h3>
                    <Button
                        onClick={() => history.push("/dashboard")}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <Typography className={classes.buttonText}>{t("goHome")}</Typography>
                    </Button>
            </Paper>
        </Container>
    );
};

export default PageNotFound;
