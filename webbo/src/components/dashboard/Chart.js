import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

export default function Chart() {
    const theme = useTheme();

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Filter
                </Typography>
            </CardContent>
        </Card>
    );
}
