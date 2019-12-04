import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 150px))",
      justifyContent: "space-around",
      alignItems: "center",
      gridGap: "1em",
      margin: "2em 0em",
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "repeat(auto-fit, minMax(200px, 200px))",
        // gridGap: "1em",
      },
      [theme.breakpoints.up("xl")]: {
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 250px))",
      },
    },
  })
);

interface Props {
  children: any;
  theme?: Theme;
}

export const BusinessCardGrid: React.SFC<Props> = ({children, theme}) => {
  const classes = useStyles(theme);
return <div className={classes.root}>{children}</div>;
};