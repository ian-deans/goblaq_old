import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { BusinessCard } from "../BusinessCard/BusinessCard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const businessesData = [
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
  {name: "El Bizo", location: "124 Main St, Pleasntville, CA", phoneNumber: "555 515 1928"},
];

interface BusinessData {
  name: string;
  location: string;
  phoneNumber: string;
};

interface PopularPlacesProps {
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
      gridGap: "2em",
    },
  })
);

export const PopularPlaces: React.SFC<PopularPlacesProps> = props => {
  const classes = useStyles(props);
  const businessCards = businessesData.map((biz: BusinessData, i: number) => <BusinessCard key={i} {...biz} />)
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5">Popular Places in Your Area</Typography>
      </Box>
      <div className={classes.content}>
        {businessCards}
      </div>
    </div>
  );
};
