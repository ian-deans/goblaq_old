import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import PhoneTwoToneIcon from "@material-ui/icons/PhoneTwoTone";

interface BusinessCardProps {
  name: string;
  location: string;
  phoneNumber?: string;
  key?: string;
}

export const BusinessCard: React.SFC<BusinessCardProps> = ({
  name,
  location,
  phoneNumber,
}) => {
  return (
    <Card>
      <CardHeader
        // avatar={}
        disableTypography={true}
        title={<Typography variant="subtitle2">Business Name</Typography>}
        style={{ backgroundColor: "transparent" }}
      />
      <CardMedia component="img" src="http://placekitten.com/300/200" />
      <CardContent>
        <Container>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
            >
              <RoomTwoToneIcon fontSize="small" />
              <Typography variant="body2" align="center">
                {location}
              </Typography>
            </Box>

            <Box
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
            >
              <PhoneTwoToneIcon fontSize="small" />
              <Typography
                variant="body2"
                align="center"
              >
                +1 909 600 1251
              </Typography>
            </Box>
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};
