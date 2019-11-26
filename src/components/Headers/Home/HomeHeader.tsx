import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SearchBar } from "../../Search/SearchBar/SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      // margin: "1rem 0rem",top: "5vh",
      // left: 0,
      height: "40vh",
      width: "100%",
    },
  })
);

export const HomeHeader: React.SFC = props => {
  const classes = useStyles(props);

  return (
    <Box className={classes.root}>
      <BannerImage />
      <Typography variant="h3">Goblaq and Beyond</Typography>
      <Typography variant="subtitle1">
        A little message from yours truly
      </Typography>
      <SearchBar />
    </Box>
  );
};
function BannerImage(props) {
  return (
    <div
      style={{
        position: "absolute",
        minHeight: "100%",
        width: "100%",
        left: 0,
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(https://placeimg.com/800/350/tech/sepia)",
        backgroundPosition: "fill",
        backgroundSize: "cover",
      }}
    />
  );
}
