import React from "react";
import { BackButton } from "~/components/common/BackButton";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PostView } from "~/components/forums/posts/PostView";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";

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
