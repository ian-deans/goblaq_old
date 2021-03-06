import React, { useEffect } from "react";
import { useSession } from "~/contexts/UserContext";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_RESPONSE } from "~/services/graphql/mutations/response";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { ResponseLikeButton } from "./ResponseLikeButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { usePostContext } from "~/contexts/ForumContexts";

export const Responses: React.FC<any> = ({ responses }) => {
  const { user } = useSession();

  const userOwnedResponses = user.hasura.responses.map(({ id }) => id);
  const userLikedResponses = user.hasura.responses_likes.map(
    ({ response_id }) => response_id
  );

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
      />
    );
  });
  return (
    <Paper
      style={{
        padding: "1em",
        // margin: "0 .5em",
      }}
    >
      {responseComponents}
    </Paper>
  );
};

const Response: React.FC<any> = props => {
  // Grab refetchFn from context
  const { refetchFn } = usePostContext();

  // Initialize mutation
  const [deleteResponse, deleteMutationData] = useMutation(DELETE_RESPONSE);
  const delResponse = () => deleteResponse({ variables: { id: props.id } });

  // Setup effect to refetch data when delete function is called
  useEffect(handleRefetch, [deleteMutationData]);
  function handleRefetch() {
    const deleted = deleteMutationData.called && deleteMutationData.data;
    if (deleted) {
      refetchFn();
    }
  }

  return (
    <Paper
      component="article"
      color="primary"
      elevation={0}
      style={{
        padding: "2em",
        margin: "2em 0",
        display: "flex",
        flexDirection: "column",
        borderLeft: "solid black 2px",
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="caption">
          Posted: {moment(props.created_at).format("M/D/YYYY")}
        </Typography>
        <Typography variant="caption">
          Updated: {moment(props.updated_at).fromNow()}
        </Typography>
      </div>
      <Typography variant="body2">
        {props.likes} likes
      </Typography>
      <div style={{ padding: "1em", width: "100%" }}>{props.content}</div>
      <div>
        {props.userOwnsResponse ? (
          <DeleteIcon onClick={delResponse} />
        ) : (
          <ResponseLikeButton
            // refetchFn={props.refetchFn}
            responseID={props.id}
            // userID={props.userID}
            userLikedResponse={props.userLikedResponse}
          />
        )}
      </div>
    </Paper>
  );
};

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
