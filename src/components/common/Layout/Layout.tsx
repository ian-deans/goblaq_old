import React from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../NavBar/NavBar";
import Container from "@material-ui/core/Container";
import { Footer } from "../Footer/Footer";
import { Banner } from "../PageBanner/Banner";


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
      alignItems: "center",
      display: "flex",
      width: "100%",
    },
    pageBox: {
      display: "flex",
      backgroundColor: "#fff",
      justifyContent: "stretch",
      justifyItems: "stretch",
      marginTop: "25vh",
      minHeight: "70vh",
      zIndex: 100,
    },
    // pageContainer: {
    //   display: "flex",
    //   flexDirection: "column",
    //   zIndex: 100,
    //   width: "100%",
    //   [theme.breakpoints.down("sm")]: {
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //   },
    // },
    footerBox: {
      alignContent: "stretch",
      backgroundColor: "#4d4d4d",
      display: "flex",
      justifyContent: "stretch",
      minHeight: "20vh",
      width: "100%",
      zIndex: 100,
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
      {/* <header className={classes.navbarBox}> */}
      {/* <Container maxWidth={containerWidth}> */}
      <NavBar />
      <Banner />
      {/* </Container> */}
      {/* </header> */}
      <main className={classes.pageBox}>
        {/* <Container className={classes.pageContainer}> */}
          {props.children}
        {/* </Container> */}
      </main>
      <footer className={classes.footerBox}>
        {/* <Container maxWidth={containerWidth}> */}
          <Footer />
        {/* </Container> */}
      </footer>
    </Box>
  );
};
