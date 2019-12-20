import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST_WITH_RESPONSES } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { useSession, useRefetchUser } from "~/contexts/UserContext";
import { PostDetails } from "./PostDetails";
import { Responses, WriteResponse } from "./responses";

interface Props {
  postID: string | string[];
}

export const PostView: React.FC<Props> = ({ postID }) => {
  const { user } = useSession();
  const { refetchUser } = useRefetchUser();
  const { loading, error, data, refetch } = useQuery(GET_POST_WITH_RESPONSES, {
    ...setViewerHTTPHeader(),
    variables: { postID },
  });

  if ( !data) {
    return <LinearProgress color="secondary" />;
  }

  const refetchFn = async () => {
    await refetch();
      refetchUser();
    return;
  };

  const post = data.posts[0];

  const userPostIDs = user.hasura.posts.map(selectID);
  const userOwnsPost = userPostIDs.includes(post.id);

  const userLikedPostsIDs = user.hasura.post_likes.map(({post_id}) => post_id);
  const userLikedPost = userLikedPostsIDs.includes(post.id);
  // const userCanLike = !userOwnsPost && !userLikedPost;

  const deleteButton = userOwnsPost ? <button>Delete Post</button> : null;
  const likeButton = userOwnsPost ? null : userLikedPost ? (
    <button>Unlike</button>
  ) : (
    <button>Like</button>
  );

  return (
    <div>
      {deleteButton}
      {likeButton}
      <div>
        <PostDetails {...selectPostDetails(post)} />
      </div>
      <div>
        <Responses refetchFn={refetchFn} responses={post.responses} />
      </div>
      <div>
        <WriteResponse refetchFn={refetchFn} postID={postID} />
      </div>
    </div>
  );
};

function selectID({ id }) {
  return id;
}

function selectPostDetails({
  id,
  title,
  content,
  created_at,
  updated_at,
  post_likes_aggregate,
  user,
}): PostDetails {
  return {
    id,
    created_at,
    updated_at,
    title,
    content,
    likes: selectCount(post_likes_aggregate),
    username: user.username,
    avatarURL: user.avatar_url,
  };
}

function selectCount({ aggregate: { count } }) {
  return count;
}

interface PostDetails {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  username: string;
  avatarURL: string;
}
