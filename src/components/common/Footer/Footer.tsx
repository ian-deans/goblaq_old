import React from "react";
import Link from "next/link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: "65%",
      color: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        minHeight: "100%",
      },
    },
    flex: {
      display: "flex",
    },
    article: {
      paddingTop: "2em",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      width: "100%",
      marginBottom: "1em",
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
    linkcolumn: {
      marginRight: "1em",
    },
    link: {
      marginTop: "1em",
      ["&:hover"]: {
        cursor: "pointer",
      }
    },
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
      <article className={classes.article}>
        <section className={classes.content}>
          <img width="100" src="/images/goblaq_logo_2.png" alt="Goblaq Logo" />
          <Typography variant="body2">Goblaq... and beyond </Typography>
          <Typography variant="body2">
            Discover unique experiences within the black community.{" "}
          </Typography>
        </section>
        <div className={classes.subfooter}>
          <Typography variant="body2">Made in Texas. </Typography>
        </div>
      </article>
      <article className={classes.article}>
        <section
          style={{
            display: "flex",
            width: "100%",
            minHeight: "35px",
            justifyContent: "flex-end",
          }}
        >
          <section className={classes.content}>
            <nav className={classes.linkbox}>
              <div className={classes.linkcolumn}>
                <Link href="/">
                  <div className={classes.link}>Home</div>
                </Link>
                <Link href="/forums/explore">
                  <div className={classes.link}>Forums</div>
                </Link>
                <div className={classes.link}>Explore</div>
                {/* <div className={classes.link}>LINK</div> */}
              </div>
            </nav>
          </section>
          <section className={classes.content}>
            <nav className={classes.linkbox}>
              <div className={classes.linkcolumn}>
                <div className={classes.link}>Affiliates</div>
                <div className={classes.link}>Pricing</div>
                <div className={classes.link}>About Us</div>
                {/* <div className={classes.link}>LINK</div> */}
              </div>
            </nav>
          </section>
        </section>
        <div className={classes.subfooter}>
          <Typography variant="body2">
            Terms of Service | Privacy Policy | 2019 Goblaq
          </Typography>
        </div>
      </article>
    </div>
  );
};
