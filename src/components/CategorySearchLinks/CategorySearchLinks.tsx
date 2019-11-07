import HotelIcon from "@material-ui/icons/HotelOutlined";
import LocalBarIcon from "@material-ui/icons/LocalBarOutlined";
import RestaurantIcon from "@material-ui/icons/RestaurantOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasketOutlined";
import SportsFootballIcon from "@material-ui/icons/SportsFootballOutlined";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumberOutlined";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(
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

      border: "solid transparent 1px",
      "&:hover": {
        border: "solid #ff0000 1px",
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

export const CategorySearchLinks: React.SFC = (props) => {
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

function CategorySearchLink({ icon, name, className }) {
  return (
    <Box className={className} flexGrow="1">
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
