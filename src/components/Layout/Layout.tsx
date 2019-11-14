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
      
    },

    navbarBox: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    footerBox: {
      width: "100%",
      display: "flex",
      backgroundColor: "#4d4d4d",
      minHeight: "300px",
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
      <Container maxWidth={containerWidth}>{props.children}</Container>
      <Box className={classes.footerBox}>
        <Container maxWidth={containerWidth}>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};
