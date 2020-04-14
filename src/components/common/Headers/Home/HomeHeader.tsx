import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeHeaderContainer: {
      zIndex: 100,
      position: "absolute",
      top: "10vh",

    },
    homeHeader: {
      width: "100%",
      overflowX: "visible",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }
  })
);

export const HomeHeader: React.SFC = props => {
  const classes = useStyles(props);
  return (
    <Container maxWidth="xl" className={classes.homeHeaderContainer}>
      <Box className={classes.homeHeader}>
        <Typography color="primary" variant="h3">
          Discover more
        </Typography>
        <Typography color="primary" variant="subtitle1">
          experiences within the Black Community
        </Typography>
        {props.children}
      </Box>
    </Container>
  );
};
