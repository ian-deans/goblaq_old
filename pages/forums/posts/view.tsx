import React from "react";
import { BackButton } from "~/components/common/BackButton";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PostView } from "~/components/forums/posts/PostView";
import { UserConditional } from "~/components/common/UserConditional/UserConditional";
import Toolbar from "@material-ui/core/Toolbar";
// import Link from "@material-ui/core/Link";
// import Button from "@material-ui/core/Button";
import { Page } from "../../../src/components/common/Page";


export default () => {
  const { postID } = useRouter().query;

  if (!postID) {
    return <LinearProgress />;
  }

  return (
    <Page>
      <Toolbar color="secondary">
        <BackButton color="primary" variant="contained">
          &lt; Back
        </BackButton>
      </Toolbar>
      <UserConditional>
        <PostView postID={postID} />
      </UserConditional>
    </Page>
  );
};
