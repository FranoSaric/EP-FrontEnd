import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

function CopyrightComp() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Frano
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Copyright() {
    return (
        <Box mt={8}>
            <CopyrightComp />
        </Box>
    );
}

export default Copyright;
