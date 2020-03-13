import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Rating} from "~/components/common/Rating";
import Avatar from "@material-ui/core/Avatar";

export const Review: React.SFC<any> = ({ title, description, rating, created_at, user, id }) => {
  return (
    <Paper
      style={{
        margin: "1em 0em",
        padding: "1em 2em",
      }}
    >
      <div>
        <Typography>{title}</Typography>
        <Rating size="small" value={rating} readOnly={true} />
        <Typography variant="caption">{created_at}</Typography>
      </div>
      <div>
        {description && (
          <Typography style={{padding: "1em"}} variant="body1">{description}</Typography>
        )}
      </div>
        {user && (
          <div style={{display: "flex", alignItems: "center", margin: ".5em 0"}}>
            <Avatar alt="user avatar" style={{width: 20, height: 20, marginRight: ".5em"}} src={user.avatar_url} />
            <Typography component="div" variant="body2" align="center" >{user.username}</Typography>
          </div>
        ) || "no user"}
    </Paper>
  );
}
