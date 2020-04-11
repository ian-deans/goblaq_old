import React from "react";
import Link from "next/link";
import HotelIcon from "@material-ui/icons/HotelOutlined";
import LocalBarIcon from "@material-ui/icons/LocalBarOutlined";
import RestaurantIcon from "@material-ui/icons/RestaurantOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasketOutlined";
import SportsFootballIcon from "@material-ui/icons/SportsFootballOutlined";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";


//^ VARIABLES
const exploreURL = "/businesses/explore";
const searchLocation = "houston";

//^ STYLE
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    categoryLink: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "stretch",
      justifyContent: "center",
      // justifyItems: "stretch",
      minHeight: "100px",
      width: "100%",

      //border: "solid transparent 1px",
      //"&:hover": {
      //  border: "solid #ff0000 1px",
      //},
    },
    categoryLinkBox: {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "repeat(6, 1fr)", //* straight up magic
      gridTemplateRows: "repeat(auto-fit, minmax(60px, 1fr))", //* straight up magic
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(3, 1fr)", //* straight up magic

      }
    },
    linkWrapper: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export const CategorySearchLinks: React.SFC = props => {
  const classes = useStyles(props);
  const linkData = [
     {
      icon: <RestaurantIcon color="secondary" />,
      name: "Food",
      href: `${exploreURL}?search_desc=food&search_loc=${searchLocation}`,
    },
    {
      icon: <ShoppingBasketIcon color="secondary" />,
      name: "Shopping",
      href: `${exploreURL}?search_desc=shopping&search_loc=${searchLocation}`,
    },
    {
      icon: <ConfirmationNumberIcon color="secondary" />,
      name: "Art & Entertainment",
      href: `${exploreURL}?search_desc=artsandentertainment&search_loc=${searchLocation}`,
    },
    {
      icon: <LocalBarIcon color="secondary" />,
      name: "Nightlife",
      href: `${exploreURL}?search_desc=bars&search_loc=${searchLocation}`,
    },
    {
      icon: <SportsFootballIcon color="secondary" />,
      name: "Sports",
      href: `${exploreURL}?search_desc=sports&search_loc=${searchLocation}`,
    },
    {
      icon: <HotelIcon color="secondary" />,
      name: "Hotels",
      href: `${exploreURL}?search_desc=hotelsandtravel&search_loc=${searchLocation}`,
    },
    
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
};

function CategorySearchLink({ href, icon, name, className }) {
  return (
    <Link href={href}>
    <Box className={className} flexGrow="1">
      {icon}
      <Typography align="center" variant="body1" color="textPrimary">
        {name}
      </Typography>
      {/* <Typography align="center" variant="caption">
        12 Locations
      </Typography> */}
    </Box>
    </Link>
  );
}
