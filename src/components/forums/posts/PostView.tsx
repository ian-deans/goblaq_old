import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST_WITH_RESPONSES } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";

import {PostDetails} from "./PostDetails";
import {Responses, WriteResponse} from "./responses"

interface Props {
  postID: string | string[];
}

export const PostView: React.FC<Props> = ({postID}) => {
  const {loading, error, data} = useQuery(GET_POST_WITH_RESPONSES, {
    ...setViewerHTTPHeader(),
    variables: {postID}
  });

  if (loading || !data) {
    return <LinearProgress />;
  }

  const post = data.posts[0];

  return (
    <div>
      <div>
        <PostDetails {...selectPostDetails(post)}  />
      </div>
      <div>
        <Responses responses={post.responses} />
      </div>
      <div>
        <WriteResponse postID={postID} />
      </div>
    </div>
  );
};

function selectPostDetails({id, title, content, created_at, updated_at, post_likes_aggregate, user }): PostDetails {
  return {
    id,
    created_at,
    updated_at,
    title,
    content,
    likes: selectCount(post_likes_aggregate),
    username: user.username,
    avatarURL: user.avatar_url,
  }
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