import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { BusinessCard } from "../BusinessCard/BusinessCard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type PopularPlacesProps = {
  top3?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: "border-box",
      MozBoxSizing: "border-box",
      WebkitBoxSizing: "border-box",
      margin: "2em 0",
    },
    header: {
      margin: "1em 0",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      justifyItems: "center",
      gridGap: "1em",
    },
  })
);

export const PopularPlaces: React.SFC<PopularPlacesProps> = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5">Popular Places in Your Area</Typography>
      </Box>
      <div className={classes.content}>
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
      </div>
    </div>
  );
};
