import React from "react";
import Typography from "@material-ui/core/Typography";

export const MustBeLoggedInMessage = () => {
  return (
    <Typography style={{margin: "2em"}}>
      You must be logged in to view this page.
    </Typography>
  );
};