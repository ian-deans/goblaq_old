import React from "react";
// import Head from "next/head";
import Container from "@material-ui/core/Container";
// import { Icon, Image } from "semantic-ui-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ErrorBoundary } from "../src/components/common/ErrorBoundary/ErrorBoundary";
import { Signup } from "../src/components/Auth/SignUp/Signup";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
    },
    redSide: {
      backgroundColor: "red",
      // maxWidth: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    whiteSide: {
      // maxWidth: "50%",
    },
    description: {
      // maxWidth: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default props => {
  const classes = useStyles(props);
  return (
    <Grid>
      <Grid container={true} item={true} xs={12}>
        <Container className={classes.redSide}>
          {/* <div className="logo-container"> */}
            <img width="350" src="/static/goblaq_logo_2.png" />
          {/* </div> */}
          <Typography 
            className={classes.description}
            variant="body1"
          >
            <Box component="p" color="white" textAlign="center" alignSelf="center">
              Goblaq is an online business directory service and crowd-sourced
              review forum connecting subscribers with African American
              businesses and business owners.
            </Box>
          </Typography>
          <Box component="span" className="social-links-container">
            <a href="https://www.facebook.com/goblaqapp/">
              <Icon color="primary" className="fa fa-facebook-f" />
              <Icon className="fa fa-plus-cirlce"/>
            </a>
            <a href="https://instagram.com/goblaqapp">
              <Icon className="fa fa-instagram" />
            </a>
            <a href="https://twitter.com/goblaqapp">
              <Icon className="fa twitter" />
            </a>
            <a href="linkedin.com/company/goblaq">
              <Icon className="fa linkedin" />
            </a>
          </Box>
        </Container>
      </Grid>

      <Grid container={true} item={true}>
        <Container className={classes.whiteSide}>
          <div className="form-container">
            <ErrorBoundary>
              <Signup />
            </ErrorBoundary>
          </div>
        </Container>
      </Grid>
    </Grid>

    // <script src="https://www.google.com/recaptcha/api.js" />
    // </Box>
  );
};

/*
 <style jsx={true}>{`
      @import url("https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap");
      @import url("https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap");

      .backdrop {
        height: 100vh;
        width: 100vw;
        background-color: red;
        display: flex;
      }
      .red-side,
      .white-side {
        width: 50%;
        height: 100vh;
      }
      .white-side {
        background-color: #fff;
        overflow-y: scroll;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-areas:
          "top"
          "form"
          "bottom";
        grid-gap: 2em;
        justify-content: stretch;
        align-content: stretch;

        padding: 0 2em;
      }
      .form-container {
        background-color: #fff;
        grid-area: form;
        justify-content: center;
        align-items: center;
      }

      .red-side {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 2fr 2fr 1fr;
        grid-template-areas:
          "logo"
          "text"
          "footer";
        grid-gap: 2em;
        justify-content: stretch;
        align-content: stretch;
        padding: 0 2em;
      }

      .logo-container {
        grid-area: logo;
        display: flex;
        align-items: flex-end;
        margin: 0 0 2em 0;
      }

      .company-description {
        grid-area: text;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .description-header,
      .description {
        color: #fff;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        line-height: 1.5em;
        letter-spacing: 4px;
        margin: 0 0 2em 0;
      }

      .description-header {
        font-size: 20px;
      }

      @media only screen and (max-width: 975px) {
        .backdrop {
          flex-direction: column;
          height: auto;
        }

        .white-side,
        .red-side {
          height: auto;
          width: 100%;
        }

        .red-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 2em 1em;
          order: 1;
        }

        .white-side {
          order: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 2em 1em;

          // align-items: flex-start;
          // grid-template-rows: 6fr 1fr;
          // grid-template-areas:
          //   "form"
          //   "bottom";
          padding: 2em 1em;
        }
      }

      @media only screen and (max-width: 600px) {
        .red-side {
          grid-template-rows: auto 2fr 1fr;
        }
      }
    `}</style>
    */
