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
import Avatar from "@material-ui/core/Avatar";

import {HeaderBackground} from "~/components/common/Headers/Home/HeaderBackground";

import firebase from "../../../../services/firebase";
import { UserConsumer, useSession } from "~/contexts/UserContext";
import Typography from "@material-ui/core/Typography";
// import navbarLinks from "../../config";
import { FacebookButton, GoogleButton } from "~/components/common/Auth/AuthButtons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appbar: {
      position: "absolute",
      top: "0",
      left: "0",
      flexGrow: 1,
      // minHeight: "25vh",
      boxShadow: "none",
      backgroundColor: "transparent",
      // zIndex: "10",
      borderBottom: "solid white 1px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 .5em",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    avatar: {
      width: "30px",
      height: "30px",
    },
  })
);

interface NavBarProps {
  Theme?: any;
}

export const NavBar: React.FunctionComponent<NavBarProps> = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //* wtf is this?
  const blarg = useSession();

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
    // <header className={classes.root}>
    // <HeaderBackground>
    <AppBar position="static" className={classes.appbar}>
      <Toolbar component="nav" className={classes.toolbar}>
        <Link href="/">
          <img
            className={classes.link}
            src="/images/navbar_logo_transparent.png"
            alt="goblaq logo"
          />
        </Link>
        <div>
          <Link href="/forums/explore">Forums</Link>
          </div>

        <UserConsumer>
          {({ user }) =>
            user && user.firebase ? (
              <React.Fragment>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar
                      variant="rounded"
                      className={classes.avatar}
                      src={user.firebase.photoURL}
                    />
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
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleClose}>
                      {user.firebase.displayName}
                    </MenuItem>
                    <Link href="/businesses/add">
                      <MenuItem onClick={handleClose}>Add Listing</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </React.Fragment>
            ) : (
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
                  <MenuItem>
                    <Typography>Login</Typography>
                  </MenuItem>
                  {/* //TODO These items also need to close the menu when clicked */}
                  <MenuItem onClick={handleClose}>
                    {/* <Link href="/login">Login</Link> */}
                    <FacebookButton />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <GoogleButton />
                  </MenuItem>
                </Menu>
              </div>
            )
          }
        </UserConsumer>
      </Toolbar>
    </AppBar>
    // </HeaderBackground>
    // </header>
  );
};
