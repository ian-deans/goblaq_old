import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import PhoneTwoToneIcon from "@material-ui/icons/PhoneTwoTone";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface BusinessCardProps {
  id: number;
  name: string;
  location: string;
  averageRating?: number;
  category?: string;
  contact?: string;
  key?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // Card
      width: "100%",
      maxWidth: "190px",
      minWidth: "140px",
      position: "relative",
      [theme.breakpoints.up("md")]: {
        maxWidth: "230px",
        minWidth: "190px",
      },
    },
    header: {}, // Card Header
    title: {
      lineHeight: "1.25em",
      minHeight: "25%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    media: {},
    content: {
      display: "flex",
      flexDirection: "column",
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      }
    },
    avgRating: {
      position: "absolute",
      bottom: ".5em",
      right: "1em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  })
);

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  name = "No Name",
  location = "Information Unavailable",
  contact = "Information Unavailable",
  averageRating = "",
}) => {
  const classes = useStyles({});
  return (
    <Card className={classes.root}>
      <CardMedia component="img" src="https://fakeimg.pl/300x200/" />
      <CardContent className={classes.content}>
        <div>
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
