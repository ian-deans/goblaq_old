import React from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../NavBar/NavBar";
import Container from "@material-ui/core/Container";
import { Footer } from "../Footer/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      backgroundColor: "#fff",
      minHeight: "100vh",
      minWidth: "320px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignContent: "stretch",
      // alignItems: "center",

    },

    navbarBox: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    pageBox: {
      minHeight: "70vh",
      display: "flex",
      justifyItems: "stretch",
      justifyContent: "stretch",

      // backgroundColor: "green",
    },
    pageContainer: {
      display: "flex",
      flexDirection: "column",

    },
    footerBox: {
      width: "100%",
      display: "flex",
      backgroundColor: "#4d4d4d",
      minHeight: "20vh",
      justifyContent: "stretch",
      alignContent: "stretch",
    },
  })
);

export const Layout = props => {
  const classes = useStyles(props);
  const path = useRouter().pathname;
  if (path === "/landing") {
    return <Box className={classes.layout}>{props.children}</Box>;
  }

  const containerWidth = "lg";

  return (
    <Box className={classes.layout}>
      <Box className={classes.navbarBox}>
        <Container maxWidth={containerWidth}>
        <NavBar />

        </Container>
      </Box>
      <Box className={classes.pageBox}>
        <Container maxWidth={containerWidth} className={classes.pageContainer}>{props.children}</Container>

      </Box>
      <Box className={classes.footerBox}>
        <Container maxWidth={containerWidth}>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};
