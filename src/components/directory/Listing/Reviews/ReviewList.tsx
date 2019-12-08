import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Review } from "./Review";
const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  reviews: [any];
  theme?: Theme;
}

export const ReviewList: React.FC<Props> = ({ theme, reviews }) => {
  if (!reviews) {
    return <div>No Reviews</div>; //TODO: do something prettier
  }

  return (
    <div style={{}}>
      <header>
        <Typography variant="subtitle1">Reviews</Typography>
      </header>
      {reviews.map((r, i) => (
        <Review {...r} key={i} max={10} />
      ))}
    </div>
  );
};
