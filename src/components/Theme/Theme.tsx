import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const downBreakpoint = "@media (max-width: 425px)";

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
  */
  breakpoints: {
    //? Customizing breakpoint keys isn't yet supported
    //? But it is a feature that is under discussion
    //? https://stackoverflow.com/questions/49739635/adding-breakpoint-to-custom-theme-in-material-ui-next-reactjs
    // keys: ["xs", "mobile", "mobileL", "tablet", "desktop", "desktopL"], 
    values: {xs: 0, sm: 425, md: 600, lg: 760, xl: 1000},
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    type: "light",
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "#7986cb",
      main: "rgba(217, 0, 27, 1)",
      dark: "rgba(116, 0, 0, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "#ff4081",
      main: "rgba(255, 255, 255, 1)",
      dark: "rgba(153, 1, 1, 1)",
      contrastText: "rgba(217, 0, 27, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(217, 0, 27, 1)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {
      // fontSize: ".75rem",
      color: "secondary", //? Not sure if this is doing anything
      fontWeight: 700,
    },
    button: {},
    caption: {
      // fontSize: ".5rem",
      letterSpacing: ".02em",
      fontStyle: "italic",
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
