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
import StatsCard from "./StatsCard.js";
import Title from "../UI/Title";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import PeopleIcon from "@material-ui/icons/People";
import ListAlt from "@material-ui/icons/ListAlt";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ActionValidator from "../../validators/ActionValidator";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        padding: "0",
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: "100vh",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        width: "99%",
        // minWidth:"200px",
        margin: "auto",
    },
    fixedHeight: {
        height: 340,
    },
    autoHeight: {
        height: "fit-content",
    },
    cardWrapper: {
        padding: "16px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
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

function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const autoHeightPaper = clsx(classes.paper, classes.autoHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                                <div className={classes.cardWrapper}>
                                    {ActionValidator("users.read") && (
                                        <StatsCard
                                            link="/administration/users/userManagement"
                                            title="users"
                                            number="12"
                                            img={<PeopleIcon />}
                                        />
                                    )}
                                    {ActionValidator("records.read") && (
                                        <StatsCard
                                            link="/administration/records/recordsManagement"
                                            title="records"
                                            number="7"
                                            img={<ListAlt />}
                                        />
                                    )}
                                    {ActionValidator("library.read") && (
                                        <StatsCard
                                            link="/library/libraryManagement"
                                            title="libraries"
                                            number="22"
                                            img={<LocalLibrary />}
                                        />
                                    )}
                                </div>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default Dashboard;
