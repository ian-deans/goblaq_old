import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";
import { PostView } from "~/components/forums/posts/PostView";
import LinearProgress from "@material-ui/core/LinearProgress";

export default () => {
  const { postID } = useRouter().query;

  if (!postID) {
    return <LinearProgress />;
  }

  return (
    <div>
      <BackButton> &lt; Back</BackButton>
      <UserConditional>
        <PostView postID={postID} />
      </UserConditional>
    </div>
  );
};
