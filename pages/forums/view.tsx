import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import { ForumDetails } from "~/components/forums/ForumDetails/ForumDetails";
import LinearProgress from "@material-ui/core/LinearProgress";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";

const addPostURL = "/forums/posts/add";

const ViewForumPage = () => {
  const { forumID } = useRouter().query;

  if (!forumID) {
    return <LinearProgress />;
  }

  return (
    <section>
      <h1>View Forum</h1>
      <div>
        <BackButton color="secondary" variant="contained">
          Back
        </BackButton>
        <Link href={`${addPostURL}?forumID=${forumID}`}>
          <button>+ Add Post</button>
        </Link>
        <UserConditional>
          <ForumDetails forumID={forumID} />
        </UserConditional>
      </div>

    </section>
  );
};

export default ViewForumPage;

