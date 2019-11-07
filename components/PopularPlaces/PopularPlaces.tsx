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
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gridGap: "1em",
      // minWidth: "250px",
    },
  })
);

export const PopularPlaces: React.SFC<PopularPlacesProps> = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Box my={2}>
        <Typography variant="h5">Popular Places in Your Area</Typography>
      </Box>
      <Box className={classes.root} my={2}>
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
        <BusinessCard name="Biz" location="123 Main St, Pleasantville, CA" />
      </Box>
    </React.Fragment>
  );
};
