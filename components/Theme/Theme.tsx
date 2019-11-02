import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#d50000",
    },

    secondary: {
      light: "#ff5131",
      main: "#d50000",
      dark: "9b0000",
    },

    text: {
      primary: "#d50000",
      secondary: "#fff",
    },

    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
  typography: {
    htmlFontSize: 16,
  },
});

export const AppTheme = props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
