import React, {useEffect} from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

import { useMutation } from "@apollo/react-hooks";
import {
  LIKE_RESPONSE,
  UNLIKE_RESPONSE,
} from "~/services/graphql/mutations/response";

export const ResponseLikeButton = ({refetchFn, responseID, userID, userLikedResponse}) => {
  const [like, likeRequest] = useMutation(LIKE_RESPONSE);
  const [unlike, unlikeRequest] = useMutation(UNLIKE_RESPONSE);

  useEffect(() => {
    const liked = likeRequest.called && likeRequest.data;
    const unliked = unlikeRequest.called && unlikeRequest.data;

    if (liked || unliked) {
      refetchFn();
    }
  },[likeRequest, unlikeRequest]);

  const likeResponse = () => like({variables: {objects: [{response_id: responseID, user_id: userID}]}});
  const unlikeResponse = () => unlike({variables: {responseID, userID}});

  if (userLikedResponse) {
    return <ThumbUpIcon onClick={unlikeResponse} />;
  }

  return <ThumbUpOutlinedIcon onClick={likeResponse} />;
};