import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST_WITH_RESPONSES } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { useSession } from "~/contexts/UserContext";
import { PostDetails } from "./PostDetails";
import { Responses, WriteResponse } from "./responses";
import {PostProvider} from "~/contexts/ForumContexts";

interface Props {
  postID: string | string[];
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


//# Main Component
export const PostView: React.FC<Props> = ({ postID }) => {
  const { user, refetchUser } = useSession();
  const { loading, error, data, refetch } = useQuery(GET_POST_WITH_RESPONSES, {
    ...setViewerHTTPHeader(),
    variables: { postID },
  });

  const refetchFn = async () => {
    await refetch();
    refetchUser();
    return;
  };

  if (loading || !data) {
    return <LinearProgress color="secondary" />;
  }

  const post = data.posts[0] || {};
  const userPostIDs = user.hasura.posts.map(selectID);
  const userLikedPostsIDs = user.hasura.post_likes.map(
    ({ post_id }) => post_id
  );

  const userOwnsPost = userPostIDs.includes(post.id);
  const userLikedPost = userLikedPostsIDs.includes(post.id);

  const contextValues = { refetchFn, postID };

  return (
    <div>
      <PostProvider value={contextValues}>
        <div>
          <PostDetails
            {...selectPostDetails(post)}
            userOwnsPost={userOwnsPost}
            userLikedPost={userLikedPost}
          />
        </div>
        <div>
          <Responses responses={post.responses} />
        </div>
        <div>
          <WriteResponse />
        </div>
      </PostProvider>
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

