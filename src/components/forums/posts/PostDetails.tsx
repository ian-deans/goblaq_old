import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_POST_WITH_RESPONSES } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import { BackButton } from "~/components/common/BackButton";

export default () => {
  const { postID } = useRouter().query;
  const [getPost, queryData] = useLazyQuery(GET_POST_WITH_RESPONSES);

  const [state, setState] = useState({ post: undefined });

  // Fetch post data once the id available
  React.useEffect(() => {
    if (postID) {
      getPost({ variables: { postID } });
    }
  }, [postID]);

  // Once the data arrives, save it in state
  React.useEffect(() => {
    const { data } = queryData;
    if (data && data.posts) {
      setState({ post: data.posts[0] });
    }
  }, [queryData]);

  if (!state.post) {
    return <LinearProgress />;
  }

  const {
    avatar_url,
    username,
    title,
    content,
    created_at,
    updated_at,
    likesCount,
    responses
  } = selectPostData(state.post);

  return (
    <div>
      <BackButton> &lt; Back</BackButton>
      <header className="post-header" style={{border: "solid red 1px"}}>
        <h2>{title}</h2>
        <div>
          <img width="20" height="20" src={avatar_url} />
          <span> {username}</span>{" "}
          <span> || {moment(created_at).format("D/MM/YYYY")}</span>
          <span> || {moment(created_at).fromNow()}</span>
        </div>
        <div>
          : {likesCount} likes
        </div>
      </header>
      <article className="post-content">
        <p>{content}</p>
      </article>
      <section className="response-list" style={{border: "solid green 1px"}}>
        <h5>Responses</h5>
        <div></div>
      </section>
      <section className="write-response" style={{border: "solid blue 1px"}}>
        <div>Write a Response</div>
      </section>
    </div>
  );
};

function selectPostData({
  user: { avatar_url, username },
  post_likes_aggregate,
  ...rest
}): any {
  const postData = {
    avatar_url,
    username,
    likesCount: selectCount(post_likes_aggregate),
    ...rest,
  };

  return postData;
}

function selectCount({ aggregate: { count } }) {
  return count;
}
