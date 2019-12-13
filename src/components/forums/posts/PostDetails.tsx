import React, { useEffect, useState } from "react";
// import moment from "moment";
import Paper from "@material-ui/core/Paper";

interface Props {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  username: string;
  avatarURL: string;
}

export const PostDetails: React.FC<Props> = ({
  id,
  created_at,
  updated_at,
  title,
  content,
  likes,
  username,
  avatarURL,
}) => {
  return (
    <Paper style={{ padding: "1em", marginBottom: "1em" }}>
      <header className="post-header">
        <h2>{title}</h2>
        <div>
          <img width="20" height="20" src={avatarURL} />
          <span> {username}</span>
          {/* <span> || {moment(created_at).format("D/MM/YYYY")}</span> */}
          {/* <span> || last updated: {moment(updated_at).fromNow()}</span> */}
        </div>
        <div>: {likes} likes</div>
      </header>
      <article
        className="post-content"
        style={{ border: "solid red 1px", margin: "1em" }}
      >
        <p>{content}</p>
      </article>
    </Paper>
  );
};
