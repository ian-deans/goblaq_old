import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: "url('/images/backgrounds/header-img.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // backgroundAttachment: "fixed",
      backgroundPosition: "0px -200px",
      width: "100%",
      position: "absolute",
      left: "0"
    }
  })
);

export const HeaderBackground: React.SFC = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div>{props.children}</div>
    </div>
  );
};
