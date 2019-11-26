import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SearchBar } from "../../Search/SearchBar/SearchBar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // position: "relative",
      // margin: "1rem 0rem",top: "5vh",
      // left: 0,
      // height: "20vh",
      width: "100%",
      overflowX: "visible",
      minHeight: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      zIndex: 50,
      
    },
    // background: {
    //   position: "absolute",
    //   height: "20vh",
    //   minHeight: "300px",
    //   width: "100vw",
    //   left: "0",
    //   backgroundRepeat: "no-repeat",
    //   backgroundImage: "url(https://dummyimage.com/900x300/c2c0c2/ffffff.png)",
    //   backgroundPosition: "fill",
    //   backgroundSize: "cover",
    //   zIndex: -51,
    // },
  })
);

export const HomeHeader: React.SFC = props => {
  const classes = useStyles(props);

  return (

    <Box className={classes.root}>
      {/* <BannerImage className={classes.background}/> */}
      <Typography color="secondary" variant="h3">Goblaq and Beyond</Typography>
      <Typography variant="subtitle1">
        A little message from yours truly
      </Typography>
      <SearchBar />
    </Box>
  );
};
function BannerImage({ className }) {
  return <div className={className}/>;
}
