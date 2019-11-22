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
  */
  palette: {
    common: { black: "#000", white: "#fff" },
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
    htmlFontSize: 14,
    fontFamily: "Roboto",
    caption: {
      fontSize: ".5rem",
      letterSpacing: ".02em",
      fontStyle: "italic",
    },
    body2: {
      fontSize: ".75rem",
      color: "secondary", //? Not sure if this is doing anything
      fontWeight: 700,
    },
  },
});

export const AppTheme = props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
