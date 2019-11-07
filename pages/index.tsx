/* Home */
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import Container from "@material-ui/core/Container";
import HotelIcon from "@material-ui/icons/HotelOutlined";
import LocalBarIcon from "@material-ui/icons/LocalBarOutlined";
import RestaurantIcon from "@material-ui/icons/RestaurantOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasketOutlined";
import SportsFootballIcon from "@material-ui/icons/SportsFootballOutlined";
import Typography from "@material-ui/core/Typography/Typography";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { PopularPlaces } from "../src/components/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/Headers/Home/HomeHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    categoryLink: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
      minWidth: "80px",
      minHeight: "2em",
      width: "100%",
      padding: "1em",
      border: "solid transparent 1px",
      "&:hover": {
        border: "solid #ff0000 1px",
        // borderColor: theme.palette.primary,
      },
    },
    categoryLinkBox: {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", //* straight up magic
    },
    linkWrapper: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default (props: any) => {
  return (
    <Container maxWidth="lg">
      <HomeHeader />
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces top3={true} />
      <PopularPlaces />
    </Container>
  );
};

function CategorySearchLinks(props) {
  const classes = useStyles(props);
  const linkData = [
    { icon: <SportsFootballIcon color="primary" />, name: "Sports" },
    { icon: <HotelIcon color="primary" />, name: "Hotels" },
    { icon: <RestaurantIcon color="primary" />, name: "Food" },
    { icon: <ShoppingBasketIcon color="primary" />, name: "Shopping" },
    {
      icon: <ConfirmationNumberIcon color="primary" />,
      name: "Art & Culture",
    },
    { icon: <LocalBarIcon color="primary" />, name: "Nightlife" },
  ];
  return (
    <div className={classes.categoryLinkBox}>
      {linkData.map((ldata, i) => (
        <CategorySearchLink
          className={classes.categoryLink}
          key={i}
          {...ldata}
        />
      ))}
    </div>
  );
}

function CategorySearchLink({ icon, name, ...props }) {
  return (
    <Box flexGrow="1" m={1}>
      {icon}
      <Typography align="center" variant="body1">
        {name}
      </Typography>
      <Typography align="center" variant="caption">
        12 Locations
      </Typography>
    </Box>
  );
}
