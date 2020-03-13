import React from "react";
import { ForumData } from "./ForumList";
import { ForumLink } from "./ForumLink";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface SectionProps {
  forums: any;
  name: any;
}

const useStyles = makeStyles((theme:Theme)=> createStyles({
  paper: {
    padding: "1em",
    marginBottom: "1em",
    // backgroundColor: theme.palette.background.paper
  },
  typography: {},
}));

export const ForumSection: React.FC<SectionProps> = props => {
  const links = props.forums.map(
    (forum: ForumData, i: number): React.ReactElement => (
      <ForumLink key={i} {...forum} />
    )
  );

  const classes = useStyles(props);

  return (
    <Paper
      className={classes.paper}
      elevation={3}
    >
      <Typography
        variant="subtitle1"
        style={{
          margin: "0 0 .5em 0",
        }}
      >
        {props.name}
      </Typography>
      {links}
    </Paper>
  );
};
