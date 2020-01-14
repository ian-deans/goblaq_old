import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { GET_FORUM_BY_ID } from "~/services/graphql/queries";
// // import { DEACTIVATE_POST } from "~/services/graphql/mutations";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postLink: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.background.default,
      margin: ".5em 0",
      padding: "1em",
      ["&:hover"]: {
        cursor: "pointer",
        backgroundColor: theme.palette.background.default,
        ["> div > h6"]: {
          color: "red"
        }
      },
    },
  })
);

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
    <Paper component="section" style={{paddingTop: "1em"}}>
      <Container style={{padding: "1em 0 1em 2em"}}>
        <Typography variant="h5">{forum.name || "NAME"}</Typography>
        <Typography variant="body1">{forum.description || "DESC"}</Typography>
      </Container>
      <div>
        {forum.posts
          .map((p: any) => selectPostData(p))
          .map((p: PostData, i: number) => (
            <PostLink {...p} key={i} />
          ))}
      </div>
    </Paper>
  );
};

function PostLink(props) {
  const classes = useStyles(props);
  return (
    <Link href={`/forums/posts/view?postID=${props.id}`}>
      <Paper className={classes.postLink} elevation={0}>
        {/* <div>{moment(props.created_at).fromNow()}</div> */}
        <div style={{ display: "flex" }}>
          <div style={{width: "100px", minWidth: "100px"}}>
            <Avatar
              style={{ width: "30px", height: "30px" }}
              variant="rounded"
              src={props.avatar_url}
            />
            <Typography variant="caption">{props.username}</Typography>
          </div>
          <Typography style={{ margin: ".5em 0 .5em 1em" }} variant="h6">
            {props.title}
          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography style={{ marginRight: "2em" }} variant="body2">
            Likes: {props.likesCount}
          </Typography>
          <Typography variant="body2">
            Responses: {props.responsesCount}
          </Typography>
        </div>
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
