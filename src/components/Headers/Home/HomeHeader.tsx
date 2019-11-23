import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SearchBar } from "../../Search/SearchBar/SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1rem 0rem",
    },
  })
);

export const HomeHeader: React.SFC = props => {
  const classes = useStyles(props);
  
  return (
    <Box className={classes.root}>
      <Typography variant="h3">Goblaq and Beyond</Typography>
      <Typography variant="subtitle1">
        A little message from yours truly
      </Typography>
      <SearchBar />
    </Box>
  );
};
