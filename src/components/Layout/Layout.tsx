import React from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../NavBar/NavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      backgroundColor: "#fff",
    },

    navbarContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  })
);

export const Layout = props => {
  const classes = useStyles(props);
  const path = useRouter().pathname;
  if (path === "/landing") {
    return <Box className={classes.layout}>{props.children}</Box>;
  }
  return (
    <Box className={classes.layout}>
      <Box className={classes.navbarContainer}>
        <NavBar />
      </Box>
      {props.children}
    </Box>
  );
};
