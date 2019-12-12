import React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

export const Responses: React.FC<any> = ({responses}) => {
  console.log("RESPONSES  ", responses);
  
  const responseComponents = responses.map((data, i) => <Response key={i} {...selectResponseData(data)} />);
  return (
    <Paper style={{padding: "1em"}}>
      {responseComponents}
    </Paper>
  );
};


const Response: React.FC<any> = (props) => {
  return (
    <article style={{border: "solid green 1px", margin: "1em 0"}}>
      <div style={{display: "flex"}}>
        <Avatar alt="user avatar" style={{width: 20, height: 20, marginRight: ".5em"}} src={props.avatarURL} />
        <Typography>{props.username}</Typography>
      </div>
      <div>created: {moment(props.created_at).format("D-MM-YY")}</div>
      <div>edited: {moment(props.updated_at).fromNow()}</div>
      <div style={{padding: "1em"}}>
        {props.content}
      </div>
    </article>
  );
};

function selectResponseData({created_at, updated_at, id, post_id, content, responses_likes_aggregate, user}) {
  return {
    id,
    post_id,
    created_at,
    updated_at,
    content,
    likes: selectCount(responses_likes_aggregate),
    username: user.username,
    avatarURL: user.avatar_url,
  }
}


function selectCount({ aggregate: { count } }) {
  return count;
}
