import React from "react";
import Link from "next/link";

import { ForumData } from "./ForumList";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface LinkProps extends ForumData {
  key?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: ".5em",
      padding: ".5em",
      "-moz-box-shadow":    "inset 0 0 4px #000000",
      "-webkit-box-shadow": "inset 0 0 4px #000000",
      boxShadow: "inset 0 0 4px #000000",
      backgroundColor: theme.palette.background.default,
      ["&:hover"]: {
        backgroundColor: theme.palette.background.paper,
        cursor: "pointer",
      }
    },
  })
);

export const ForumLink: React.FC<LinkProps> = props => {
  const classes = useStyles(props);
  return (
    <Link href={`/forums/view?forumID=${props.id}`}>
      <Paper className={classes.paper} elevation={0}>
        <Typography color="secondary" variant="subtitle2">
          {props.name}
        </Typography>
        <Typography variant="body1">{props.description}</Typography>
        <Typography variant="body1">{props.created_at}</Typography>
      </Paper>
    </Link>
  );
};
