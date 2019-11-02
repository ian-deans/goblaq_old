import React from "react";
// import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {NavBar} from "../NavBar/NavBar";



const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
  },

  toolbox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
});



export const Layout = props => {
  const classes = useStyles(props);
  return (
    <div className="app-layout">
      <Box className="navbar-container">
        <NavBar />
      </Box>
      {props.children}
    </div>
  );
};
