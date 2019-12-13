import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import { PostView } from "~/components/forums/posts/PostView";
import LinearProgress from "@material-ui/core/LinearProgress";
import { UserConsumer } from "~/contexts/UserContext";
import { MustBeLoggedInMessage } from "~/components/common/Messages/MustBeLoggedIn";
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
