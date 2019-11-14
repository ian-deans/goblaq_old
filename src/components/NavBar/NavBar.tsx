import React from "react";
// import { useRouter } from "next/router";
// import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import firebase from "../../../services/firebase";
import { UserConsumer } from "../../contexts/UserContext";
import { Typography } from "@material-ui/core";
// import navbarLinks from "../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "80px",
    },
    appbar: {
      boxShadow: "none",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const NavBar = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    firebase.doSignOut();
    handleClose();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.appbar}>
        <Toolbar component="nav" className={classes.toolbar}>
          <Link href="/">
            <img src="/images/navbar_logo_transparent.png" alt="goblaq logo" />
          </Link>
          {/* <div> */}
            <UserConsumer>
              {({user}) =>
                user ? (
                  // <Query query={GET_USER}>
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted={true}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                  // </Query>
                ) : (
                  <Link href="/login">
                    <Typography variant="subtitle1">
                      SignIn
                    </Typography>
                  </Link>
                )
              }
            </UserConsumer>
          {/* </div> */}
        </Toolbar>
      </AppBar>
    </header>
  );
};
