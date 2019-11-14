import React from "react";
// import Container from "@material-ui/core/Container";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const downBreakpoint = "@media (max-width: 425px)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: "100%",
      display: "flex",
      justifyContent: "space-between",

      // alignContent: "stretch",

      minHeight: "65%",
      color: theme.palette.common.white,
      [downBreakpoint]: {
        flexDirection: "column",
        minHeight: "100%",
      }
    },
    flex: {
      display: "flex",
    },
    section: {
      // backgroundColor: "blue",
      paddingTop: "2em",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      width: "100%",
      ["&:first-child"]: {
        marginRight: "1em",
        alignItems: "flex-start",
      },
    },
    content: {
      height: "75%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    message: {},
    linkbox: {},
    linkcolumn: {},
    link: {},
    subfooter: {
      display: "flex",
      alignItems: "flex-end",
      height: "25%",
    },
  })
);

export const Footer: React.SFC = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.content}>
          <img width="100" src="/images/goblaq_logo_2.png" alt="Goblaq Logo" />
          <Typography variant="body2">Goblaq... and beyond </Typography>
          <Typography variant="body2">
            Discover unique experiences within the black community.{" "}
          </Typography>
        </div>
        <div className={classes.subfooter}>
          <Typography variant="body2">Made in Texas. </Typography>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.content}>
          <div className={classes.linkbox}>
            <div className={classes.linkcolumn}>
              <div className={classes.link}></div>
            </div>
          </div>
        </div>
        <div className={classes.subfooter}>
          <Typography variant="body2">
            Terms of Service | Privacy Policy | 2019 Goblaq
          </Typography>
        </div>
      </div>
    </div>
  );
};
