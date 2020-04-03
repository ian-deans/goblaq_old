import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            overflowX: "visible",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 100,
        }
   
    })
);

export const Page = props => {
    const classes = useStyles(props);

    return (
        <Container maxWidth="xl">
            {props.children}
        </Container>
    )
}