import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { BackButton } from "~/components/common/BackButton";
import { ForumDetails } from "~/components/forums/ForumDetails/ForumDetails";
import LinearProgress from "@material-ui/core/LinearProgress";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Page } from "../Page";

const addPostURL = "/forums/posts/add";

const ViewForumPage = () => {
  const { forumID } = useRouter().query;

  if (!forumID) {
    return <LinearProgress />;
  }

  return (
    <Page>
        <Toolbar color="secondary">
          <Link href={`/forums/explore`}>
            <Button style={{marginRight: "1em"}} color="primary" variant="contained">Back</Button>
          </Link>
          <Link href={`${addPostURL}?forumID=${forumID}`}>
            <Button color="secondary" variant="contained">+ Add Post</Button>
          </Link>
        </Toolbar>
        <UserConditional>
          <ForumDetails forumID={forumID} />
        </UserConditional>

    </Page>
  );
};

export default ViewForumPage;
