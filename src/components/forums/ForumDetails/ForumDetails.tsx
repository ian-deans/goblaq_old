import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { GET_FORUM_BY_ID } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { useSession } from "~/contexts/UserContext";

interface Props {
  forumID: string | string[];
  theme?: any;
}

export const ForumDetails: React.FC<Props> = ({ forumID }) => {
  const { user_id } = useSession();
  const { loading, error, data } = useQuery(GET_FORUM_BY_ID, {
    ...setViewerHTTPHeader(),
    pollInterval: 300000,
    variables: { forumID },
  });

  if (loading || !data) {
    return <LinearProgress />;
  }

  const forum = data.forums[0];

  console.log("FORUM  ", forum);

  return (
    <section>
      {forumID}
      <div>{forum.name || "NAME"}</div>
      <div>{forum.description || "DESC"}</div>
      <div>{forum.posts.map((p: any) => selectPostData(p)).map(PostLink)}</div>
    </section>
  );
};

function PostLink(p: PostData, i: number) {
  return (
    <Link key={i} href={`/forums/posts/view?postID=${p.id}`}>
      <div style={{ border: "solid red 1px", padding: "1em" }}>
        <div>{p.title}</div>
        <div>{moment(p.created_at).fromNow()}</div>
        <div>
          <img src={p.avatar_url} alt="author avatar" width="20" height="20" />
          {p.username}
        </div>
        <div>Likes: {p.likesCount}</div>
        <div>Responses: {p.responsesCount}</div>
        <button>delete</button>
      </div>
    </Link>
  );
}

function selectPostData({
  id,
  title,
  created_at,
  post_likes_aggregate,
  responses_aggregate,
  user: { username, avatar_url },
}): PostData {
  console.log("AVA ", avatar_url);
  return {
    id,
    title,
    created_at,
    username,
    avatar_url,
    likesCount: selectCount(post_likes_aggregate),
    responsesCount: selectCount(responses_aggregate),
  };
}

function selectCount({ aggregate: { count } }) {
  return count;
}

interface PostData {
  id: number;
  created_at: string;
  title: string;
  username: string;
  avatar_url: string;
  likesCount: number;
  responsesCount: number;
}
