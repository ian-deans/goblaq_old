import React from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../NavBar/NavBar";
import Container from "@material-ui/core/Container";
import { Footer } from "../Footer/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      html: {
        fontSize: 10,
        // [theme.breakpoints.up("sm")]:{
        //   fontSize: 12,
        // },
        [theme.breakpoints.up("md")]: {
          fontSize: 12,
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: 14,
        },
      },
      body: {
        backgroundColor: "#fff",
      }
    },
    layout: {
      backgroundColor: "#fff",
      minHeight: "100vh",
      minWidth: "320px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignContent: "stretch",
      // padding: "0 .5em",
      [theme.breakpoints.down("md")]: {
        fontSize: "11px",
      },
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
      backgroundColor: theme.palette.background.default,
    },
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
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

  const containerWidth = "xl";

  return (
    <Box className={classes.layout}>
      <header className={classes.navbarBox}>
        <Container maxWidth={containerWidth}>
          <NavBar />
        </Container>
      </header>
      <main className={classes.pageBox}>
        <Container maxWidth={containerWidth} className={classes.pageContainer}>
          {props.children}
        </Container>
      </main>
      <footer className={classes.footerBox}>
        <Container maxWidth={containerWidth}>
          <Footer />
        </Container>
      </footer>
    </Box>
  );
};
