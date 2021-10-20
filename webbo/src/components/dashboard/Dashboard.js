import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Copyright from "./Copyright";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    card: {
        padding: theme.spacing(5),
    },
}));

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
        },
    ],
};

function Dashboard(props) {
    const classes = props.classes;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <React.Fragment>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Chart />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
                        xl={2}
                        className={classes.card}
                    >
                        <Deposits />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
                        xl={2}
                        className={classes.card}
                    >
                        <Deposits />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
                        xl={2}
                        className={classes.card}
                    >
                        <Deposits />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
                        xl={2}
                        className={classes.card}
                    >
                        <Deposits />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
                        xl={2}
                        className={classes.card}
                    >
                        <Deposits />
                    </Grid>

                    {/* Recent Orders */}

                    <Grid item xs={12}>
                        <Orders />
                    </Grid>
                </Grid>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
