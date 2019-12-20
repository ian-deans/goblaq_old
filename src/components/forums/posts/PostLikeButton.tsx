import React, { useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

import { useMutation } from "@apollo/react-hooks";
import { LIKE_POST, UNLIKE_POST } from "~/services/graphql/mutations/post";

import { usePostContext } from "~/contexts/ForumContexts";

import { useSession } from "~/contexts/UserContext";

export const PostLikeButton = ({ userLikedPost }) => {
  // Grab data from contexts
  const { postID, refetchFn } = usePostContext();
  const {
    user: {
      hasura: { id: userID },
    },
  } = useSession();

  // Initialize mutations for later use
  const [like, likeRequest] = useMutation(LIKE_POST);
  const [unlike, unlikeRequest] = useMutation(UNLIKE_POST);

  // Set up an effect to refetch data after liking or unliking post
  useEffect(() => {
    const liked = likeRequest.called && likeRequest.data;
    const unliked = unlikeRequest.called && unlikeRequest.data;

    if (liked || unliked) {
      refetchFn();
    }
  }, [likeRequest, unlikeRequest]);

  const likePost = () =>
    like({
      variables: { objects: [{ post_id: postID, user_id: userID }] },
    });
  const unlikePost = () => unlike({ variables: { postID, userID } });

  if (userLikedPost) {
    return <ThumbUpIcon onClick={unlikePost} />;
  }

  return <ThumbUpOutlinedIcon onClick={likePost} />;
};
