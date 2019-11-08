import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import PhoneTwoToneIcon from "@material-ui/icons/PhoneTwoTone";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface BusinessCardProps {
  name: string;
  location: string;
  phoneNumber?: string;
  key?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { // Card
      maxHeight: 340,
      maxWidth: 300,
    },
    header: {}, // Card Header
    media: {},
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    caption: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  name = "No Name",
  location = "No Info",
  phoneNumber = "+1-505-555-5555",
}) => {
  const classes = useStyles({});
  return (
    <Card className={classes.root}>
      <CardHeader
        title={<Typography variant="subtitle2">{name}</Typography>}
      />
      <CardMedia component="img" src="https://picsum.photos/300/200" />
      <CardContent className={classes.content}>
        <div className={classes.caption}>
          <RoomTwoToneIcon fontSize="small" />
          <Typography variant="body2" align="center">
            {location}
          </Typography>
        </div>

        <div className={classes.caption}>
          <PhoneTwoToneIcon fontSize="small" />
          <Typography variant="body2" align="center">
            {phoneNumber}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
