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

import firebase from "../../../../services/firebase";
import { UserConsumer, useSession } from "~/contexts/UserContext";
import Typography from "@material-ui/core/Typography";
// import navbarLinks from "../../config";
import { FacebookButton, GoogleButton } from "~/components/common/Auth/AuthButtons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appbar: {
      flexGrow: 1,
      minHeight: "80px",
      boxShadow: "none",
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
    <AppBar position="static" className={classes.appbar}>
      <Toolbar component="nav" className={classes.toolbar}>
        <Link href="/">
          <img
            className={classes.link}
            src="/images/navbar_logo_transparent.png"
            alt="goblaq logo"
          />
        </Link>

        <UserConsumer>
          {({ user }) =>
            user ? (
              <React.Fragment>
                <Link href="/listings/add">
                  <Typography className={classes.link} variant="subtitle1">
                    Add Listing
                  </Typography>
                </Link>
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
                      src={user.photoURL}
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
                      {user.displayName}
                    </MenuItem>
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
    // </header>
  );
};
