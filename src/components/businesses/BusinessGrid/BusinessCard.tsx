import React from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import PhoneTwoToneIcon from "@material-ui/icons/PhoneTwoTone";
import Skeleton from "@material-ui/lab/Skeleton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const businessDetailsURL = "/businesses/view";

interface BusinessCardProps {
  id: number;
  name: string;
  location: any;
  averageRating?: number;
  category?: string;
  contact?: string;
  key?: any;
  theme?: Theme;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // Card
      maxWidth: "150px",
      minWidth: "150px",
      height: "200px",
      position: "relative",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "200px",
        minWidth: "200px",
        height: "250px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "250px",
        minwidth: "250px",
        height: "300px",
      },
    },
    header: {}, // Card Header
    title: {
      lineHeight: "1.25em",
      minHeight: "25%",
      [theme.breakpoints.down("md")]: {
      },
    },
    titleContainer: {
      minHeight: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    media: {
      ["&:hover"]: {
        cursor: "pointer",
      },
    },
    content: {
      justifyContent: "space-between",
      padding: "0em 0em 0em 1em",
    },
    caption: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    captionContent: {
      marginLeft: "1em",
    },
    avgRating: {
      position: "absolute",
      bottom: ".5em",
      right: "1em",
    },
    skeleton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      maxWidth: "180px",
      minWidth: "150px",
      height: "220px",
      position: "relative",
      margin: 0,
      padding: 0,
      [theme.breakpoints.up("lg")]: {
        maxWidth: "250px",
        minWidth: "220px",
        height: "280px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "300px",
        minwidth: "260px",
        height: "330px",
      },
    },
    skeletonContent: {
      height: "40%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
  })
);

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  id,
  name = "No Name",
  location,
  contact = "Information Unavailable",
  averageRating = "",
  theme,
}) => {
  const classes = useStyles(theme);
  const locationString = buildLocationString(location);
  return (
    <Card component="article" className={classes.root}>
      <Link href={`${businessDetailsURL}?businessID=${id}`}>
        <CardMedia alt="Gallery Image" className={classes.media} component="img" src="https://fakeimg.pl/300x200/" />
      </Link>

      <CardContent className={classes.content}>
        <header className={classes.titleContainer}>
          <Typography className={classes.title} variant="subtitle2">
            {name}
          </Typography>
        </header>
        <section>
          <div className={classes.caption}>
            <RoomTwoToneIcon fontSize="small" />
            <Typography
              variant="body2"
              align="left"
              color="textSecondary"
              className={classes.captionContent}
            >
              {locationString}
            </Typography>
          </div>

          <div className={classes.caption}>
            <PhoneTwoToneIcon fontSize="small" />
            <Typography
              color="textSecondary"
              variant="body2"
              align="left"
              className={classes.captionContent}
            >
              {contact}
            </Typography>
          </div>
        </section>
        <Typography variant="body2" className={classes.avgRating}>
          Rating: {averageRating}/10
        </Typography>
      </CardContent>
    </Card>
  );
};

export const BusinessCardSkeleton = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.skeleton}>
      <Skeleton variant="rect" width="100%" height="60%" />
      <div className={classes.skeletonContent}>
        <Skeleton height="20%" />
        <Skeleton height="20%" />
      </div>
    </div>
  );
};

function buildLocationString({ address_1, address_2, city, state, zip }) {
  const tokens = [];

  if (address_1) {
    tokens.push(address_1);
  }
  if (address_2) {
    tokens.push(address_2);
  }
  if (city) {
    tokens.push(city);
  }
  if (state) {
    tokens.push(state);
  }
  if (zip) {
    tokens.push(zip);
  }

  return tokens.join(", ");
}