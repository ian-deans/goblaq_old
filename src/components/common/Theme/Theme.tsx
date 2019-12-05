import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  /*
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "#fff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#d50000",
    },

    secondary: {
      light: "#ff0000",
      main: "#d50000",
      dark: "9b0000",
    },

    text: {
      primary: "#000",
      secondary: "#ff0000",
    },

    background: {
      paper: "#fff",
      default: "#fff",
    },
  },


    "primary1Color": "#f44336",
        "primary2Color": "#b71c1c",
        "accent1Color": "#d50000",
        "pickerHeaderColor": "#f44336"
  */
  breakpoints: {
    //? Customizing breakpoint keys isn't yet supported, but it is a feature that is under discussion.
    //? https://stackoverflow.com/questions/49739635/adding-breakpoint-to-custom-theme-in-material-ui-next-reactjs
    // keys: ["xs", "mobile", "mobileL", "tablet", "desktop", "desktopL"],
    values: { xs: 0, sm: 425, md: 600, lg: 760, xl: 1000 },
  },
  palette: {
    // "primary1Color": "#f44336",
    // "primary2Color": "#b71c1c",
    // "accent1Color": "#d50000",
    // "pickerHeaderColor": "#f44336",
    // "accent3Color": "#ef5350",
    // "accent2Color": "#e53935"
    common: { black: "#000", white: "#fff" },
    type: "light",
    background: { paper: "#fff", default: "#B71C1C" },
    primary: {
      main: "#fff",
      light: "#ff5131",
      dark: "#9b0000",
      contrastText: "#B71C1C",
    },
    secondary: {
      main: "#B71C1C",
      light: "#ffffff",
      dark: "#c7c7c7",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "#B71C1C",
      secondary: "#212121",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    // htmlFontSize: 16,
    // fontSize: 13,
    fontFamily: "Roboto",
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
      fontSize: "2.3em",
      fontWeight: 900,
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
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "1.1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: ".8rem",
      color: "secondary", //? Not sure if this is doing anything
      fontWeight: 400,
    },
    button: {
      fontSize: ".6rem",
      fontWeight: 400,
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
