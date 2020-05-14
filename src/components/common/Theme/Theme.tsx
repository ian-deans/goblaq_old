import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
const theme = createMuiTheme({

  breakpoints: {
    //? Customizing breakpoint keys isn't yet supported, but it is a feature that is under discussion.
    //? https://stackoverflow.com/questions/49739635/adding-breakpoint-to-custom-theme-in-material-ui-next-reactjs
    // keys: ["xs", "mobile", "mobileL", "tablet", "desktop", "desktopL"],
    values: { xs: 0, sm: 425, md: 600, lg: 760, xl: 1000 },
  },
  palette: {

    common: { black: "#000", white: "#fff" },
    type: "light",
    background: { paper: "#fff", default: "#f2f2f2" },
    primary: {
      main: "#fff",
      light: "#000",
      dark: "#fff",
      contrastText: "#e60000",
    },
    secondary: {
      main: "#e60000",
      light: "#ffffff",
      dark: "#fff",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      // primary: "#e60000",
      primary: "#000",
      secondary: "#000",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    // htmlFontSize: 16,
    // fontSize: 13,
    fontFamily: "Graphik, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.9em",
      fontWeight: 900,
    },
    h2: {
      fontSize: "2.6em",
      fontWeight: 900,
    },
    h3: {
      fontSize: "4em",
      fontWeight: 800,
    },
    h4: {
      fontSize: "2.1em",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.8em",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.6em",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "3rem",
      fontWeight: 500,
      lineHeight: 1,
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1rem",
      color: "secondary", //? Not sure if this is doing anything
      fontWeight: 400,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: ".6rem",
      letterSpacing: ".02em",
      fontStyle: "italic",
      fontWeight: 300,
    },
    overline: {},
  },
  shape: {
    borderRadius: 4,
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    mobileStepper: 1000,
    modal: 1300,
    snackbar: 1400,
    speedDial: 1050,
    tooltip: 1500,
  },
});

export const AppTheme = props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
