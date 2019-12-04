import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  reviews: [any];
  theme?: Theme;
}

export const ReviewList: React.FC<Props> = ({ theme, reviews }) => {
  if (!reviews) {
    return <div>No Reviews</div>;
  }

  return (
    <div style={{}}>
      <header>
        <Typography variant="subtitle1">Review</Typography>
      </header>
      {reviews.map((r, i) => (
        <Review {...r} key={i} max={10} />
      ))}
    </div>
  );
};

function Review({ title, description, rating, created_at, user, id }) {
  console.log(user)
  return (
    <Paper
      style={{
        margin: "1em 0em",
        padding: "1em 2em",
      }}
    >
      <div>
        <Typography>{title}</Typography>
        <Rating size="small" value={rating} max={10} readOnly={true} />
      </div>
      <div>{description}</div>
      <div>
        {user && user.avatar_url || "no avatar image"}
        {user && user.username || "no username"}
      </div>
    </Paper>
  );
}
