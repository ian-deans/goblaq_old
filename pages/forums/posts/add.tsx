import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import { WritePost } from "~/components/forums/posts/WritePost";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";
import LinearProgress from "@material-ui/core/LinearProgress";

const WritePostPage = () => {
  const { forumID } = useRouter().query;

  if (!forumID) {
    return <LinearProgress />;
  }

  return (
    <div>
      <BackButton> &lt; Back</BackButton>
      <h1>Write Post {forumID}</h1>
      <UserConditional>
        <WritePost forumID={forumID}/>
      </UserConditional>
    </div>
  );
};

export default WritePostPage;