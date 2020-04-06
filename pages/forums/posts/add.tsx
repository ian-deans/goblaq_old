import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BackButton } from "~/components/common/BackButton";
import { WritePost } from "~/components/forums/posts/WritePost";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Page } from "../../Page";


const WritePostPage = () => {
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
        </Toolbar>
      <UserConditional>
        <WritePost forumID={forumID}/>
      </UserConditional>
    </Page>
  );
};

export default WritePostPage;