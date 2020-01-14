import React from "react";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { PostLikeButton } from "./PostLikeButton";
import { PostDeleteButton } from "./PostDeleteButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface Props {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  username: string;
  avatarURL: string;
  userOwnsPost: boolean;
  userLikedPost: boolean;
}

//# Main Component
export const PostDetails: React.FC<Props> = ({
  id,
  created_at,
  updated_at,
  title,
  content,
  likes,
  username,
  avatarURL,
  userOwnsPost,
  userLikedPost,
}) => {
  return (
    <Paper style={{ padding: "1em", marginBottom: "1em" }}>
      <header className="post-header">
        <h2>{title}</h2>
        <div
          style={{
            display: "flex",
          }}
        >
          <Avatar
            alt="user avatar"
            style={{ width: 20, height: 20, marginRight: ".5em" }}
            src={avatarURL}
          />
          <Typography> {username}</Typography>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <Typography variant="caption">Posted: {moment(created_at).format("M/D/YYYY")}</Typography>
          <Typography variant="caption">Updated: {moment(updated_at).fromNow()}</Typography>
        </div>
        <Typography variant="body2">{likes} likes</Typography>
      </header>
      <article className="post-content" style={{ margin: "1em" }}>
        <p>{content}</p>
      </article>
      <div className="toolbar">
        {userOwnsPost ? (
          <PostDeleteButton />
        ) : (
          <PostLikeButton userLikedPost={userLikedPost} />
        )}
      </div>
    </Paper>
  );
};
