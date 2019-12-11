import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import { WritePost } from "~/components/forums/posts/WritePost";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSession } from "~/contexts/UserContext";

export default () => {
  const { forumID } = useRouter().query;
  const { user_id } = useSession();

  return (
    <div>
      <BackButton> &lt; Back</BackButton>
      <h1>Write Post {forumID}</h1>
      {forumID ? <WritePost forumID={forumID}/> : <LinearProgress />}
    </div>
  );
};

/*
{
  "objects": [
    {"content": "blargy blarg blarg blargity blarg", "forum_id": 2, "title": "Just another Post", "user_id": 14}
  ]
}
*/
