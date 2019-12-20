import React, { useEffect } from "react";
import { useSession } from "~/contexts/UserContext";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_RESPONSE } from "~/services/graphql/mutations/response";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import {ResponseLikeButton} from "./ResponseLikeButton";
import Paper from "@material-ui/core/Paper";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Typography from "@material-ui/core/Typography";
// import moment from "moment";

export const Responses: React.FC<any> = ({ responses, refetchFn }) => {
  const { user } = useSession();

  const userOwnedResponses = user.hasura.responses.map(({ id }) => id);
  const userLikedResponses = user.hasura.responses_likes.map(
    ({ response_id }) => response_id
  );
  const userID = user.hasura.id;

  const responseComponents = responses.map((data, i) => {
    const response = selectResponseData(data);

    const userOwnsResponse = userOwnedResponses.includes(response.id);
    const userLikedResponse = userLikedResponses.includes(response.id);

    return (
      <Response
        key={i}
        {...response}
        userOwnsResponse={userOwnsResponse}
        userLikedResponse={userLikedResponse}
        userID={userID}
        refetchFn={refetchFn}
      />
    );
  });
  return <div style={{ padding: "1em" }}>{responseComponents}</div>;
};

const Response: React.FC<any> = props => {
  const [deleteResponse, deleteMutationData] = useMutation(DELETE_RESPONSE);
  const delResponse = () => deleteResponse({variables: {id: props.id}});
  useEffect(handleRefetch, [deleteMutationData]);

  function handleRefetch() {
    const deleted = deleteMutationData.called && deleteMutationData.data;

    if (deleted) {
      props.refetchFn();
    }
  }

  return (
    <Paper
      component="article"
      color="primary"
      style={{
        padding: "2em",
        margin: "1em 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex" }}>
        <Avatar
          alt="user avatar"
          style={{ width: 20, height: 20, marginRight: ".5em" }}
          src={props.avatarURL}
        />
        <Typography align="center" variant="body2">
          {props.username}
        </Typography>
      </div>
      {/* <div>created: {moment(props.created_at).format("D-MM-YY")}</div> */}
      {/* <div>edited: {moment(props.updated_at).fromNow()}</div> */}
      <div style={{ padding: "1em", width: "75%" }}>{props.content}</div>
      <div>
        {props.userOwnsResponse ? (
          <DeleteIcon onClick={delResponse} />
        ) : (
          <ResponseLikeButton
            refetchFn={props.refetchFn}
            responseID={props.id}
            userID={props.userID}
            userLikedResponse={props.userLikedResponse}
          />
        )}
      </div>
    </Paper>
  );
};

function DeleteButton({ responseID, delFn }) {
  return (
    <Button onClick={() => delFn(responseID)}>
      
    </Button>
  );
}

function selectResponseData({
  created_at,
  updated_at,
  id,
  post_id,
  content,
  responses_likes_aggregate,
  user,
}) {
  return {
    id,
    post_id,
    created_at,
    updated_at,
    content,
    likes: selectCount(responses_likes_aggregate),
    username: user.username,
    avatarURL: user.avatar_url,
  };
}

function selectCount({ aggregate: { count } }) {
  return count;
}
