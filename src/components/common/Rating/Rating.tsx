import React from "react";
import MUIRating from "@material-ui/lab/Rating";

export const Rating = (props) => {

  return <MUIRating precision={0.5} max={5} {...props} />;
}