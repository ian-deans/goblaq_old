import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import PhoneTwoToneIcon from "@material-ui/icons/PhoneTwoTone";
import Skeleton from "@material-ui/lab/Skeleton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


interface BusinessCardProps {
  id: number;
  name: string;
  location: string;
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
      maxWidth: "180px",
      minWidth: "150px",
      height: "220px",
      position: "relative",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "250px",
        minWidth: "220px",
        height: "280px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "300px",
        minwidth: "250px",
        height: "330px",
      },
    },
    header: {}, // Card Header
    title: {
      lineHeight: "1.25em",
      minHeight: "25%",
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
    titleContainer: {
      minHeight: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

    },
    media: {},
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
      [theme.breakpoints.down("md")]: {
        fontSize: "10px",
      }
    },
    avgRating: {
      position: "absolute",
      bottom: ".5em",
      right: "1em",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px",
      },
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
    }
  })
);

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  name = "No Name",
  location = "Information Unavailable",
  contact = "Information Unavailable",
  averageRating = "",
  theme
}) => {
  const classes = useStyles(theme)
  return (
    <Card className={classes.root}>
      <CardMedia component="img" src="https://fakeimg.pl/300x200/" />
      <CardContent className={classes.content}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="subtitle1">
            {name}
          </Typography>
        </div>
        <div>
          <div className={classes.caption}>
            <RoomTwoToneIcon fontSize="small" />
            <Typography
              variant="body2"
              align="left"
              color="textSecondary"
              className={classes.captionContent}
            >
              {location}
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
        </div>
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
    <div className={classes.skeleton} >
      <Skeleton height="60%" />
      <div className={classes.skeletonContent}>
        <Skeleton height="20%" />
        <Skeleton height="20%" />

      </div>

    </div>
  )
}