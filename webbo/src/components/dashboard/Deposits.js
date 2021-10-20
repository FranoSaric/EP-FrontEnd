import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    studio: {
        fontWeight: "bold",
        justifyContent: "center",
        backgroundColor: "#3f51b5",
        color: "white",
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Listići
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <List>
                        <ListItemText primary="Odigrano:" />
                        <ListItemText primary="Dobitnih:" />
                        <ListItemText primary="Prosjek uplate:" />
                        <ListItemText primary="Uplaćeno kombinacija:" />
                        <ListItemText primary="Različitih korisnika:" />
                    </List>
                </Typography>
                <Typography variant="h5" component="h2">
                    Bruto profit
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <List>
                        <ListItemText primary="Uplate:" />
                        <ListItemText primary="Ulog:" />
                        <ListItemText primary="Dobitak:" />
                        <ListItemText primary="Saldo:" />
                        <ListItemText primary="Profit:" />
                    </List>
                </Typography>
            </CardContent>
            <CardActions className={classes.center}>
                <Button size="small" className={classes.studio}>
                    Studio 1-80
                </Button>
            </CardActions>
        </Card>
    );
}
