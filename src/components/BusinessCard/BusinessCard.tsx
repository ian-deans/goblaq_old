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
      maxHeight: 320,
      maxWidth: 300,
    },
    header: {}, // Card Header
    media: {},
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
      // zIndex: "1000",
    },
  })
);

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  name = "No Name",
  location = "Information Unavailable",
  contact = "Information Unavailable",
  averageRating = ""
}) => {
  const classes = useStyles({});
  return (
    <Card className={classes.root}>
      {/* <CardHeader
        title={<Typography variant="subtitle2">{name}</Typography>}
      /> */}
      <CardMedia component="img" src="https://picsum.photos/300/200" />
      <CardContent className={classes.content}>
        <Typography variant="subtitle2">{name}</Typography>
        <div>
          <div className={classes.caption}>
            <RoomTwoToneIcon fontSize="small" />
            <Typography
              variant="body2"
              align="left"
              className={classes.captionContent}
            >
              {location}
            </Typography>
          </div>

          <div className={classes.caption}>
            <PhoneTwoToneIcon fontSize="small" />
            <Typography
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
