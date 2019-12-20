import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { GET_FORUM_BY_ID } from "~/services/graphql/queries";
// // import { DEACTIVATE_POST } from "~/services/graphql/mutations";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import moment from "moment";

interface Props {
  forumID: string | string[];
  theme?: any;
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

//# Main Component
export const ForumDetails: React.FC<Props> = ({ forumID }) => {
  const forumQuery = useQuery(GET_FORUM_BY_ID, {
    ...setViewerHTTPHeader(),
    pollInterval: 300000,
    variables: { forumID },
  });

  if (forumQuery.loading || !forumQuery.data) {
    return <LinearProgress />;
  }

  const forum = forumQuery.data.forums[0];

  return (
    <section>
      {forumID}
      <div>{forum.name || "NAME"}</div>
      <div>{forum.description || "DESC"}</div>
      <div>
        {forum.posts
          .map((p: any) => selectPostData(p))
          .map((p: PostData, i: number) => (
            <PostLink {...p} key={i} />
          ))}
      </div>
    </section>
  );
};


function PostLink(props) {
  return (
    <Link href={`/forums/posts/view?postID=${props.id}`}>
      <Paper style={{ margin: ".5em 0", padding: "1em" }}>
        {/* <div>{moment(props.created_at).fromNow()}</div> */}
        <div>
          <img
            src={props.avatar_url}
            alt="author avatar"
            width="15"
            height="15"
          />
          <Typography variant="caption">{props.username}</Typography>
        </div>
        <Typography style={{ margin: ".5em 0 .5em 1em" }} variant="h4">
          {props.title}
        </Typography>
        <Typography variant="body2">Likes: {props.likesCount}</Typography>
        <Typography variant="body2">
          Responses: {props.responsesCount}
        </Typography>
        {/* //TODO condition check and render delete button or null  */}
      </Paper>
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

