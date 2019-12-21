import React, { useEffect } from "react";
import { DEACTIVATE_POST } from "~/services/graphql/mutations/post";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { useMutation } from "@apollo/react-hooks";
import { usePostContext } from "~/contexts/ForumContexts";

// We don't actually delete the post. We instead set it to inactive
// eventually running a cron job and deleting posts that have beeen
// inactive for a TBD amount of time.

export const PostDeleteButton: React.SFC = () => {
  const { postID, refetchFn } = usePostContext();
  const [deactivatePost, deleteData] = useMutation(DEACTIVATE_POST);
  console.log("ID ", postID)

  const deletePost = () => deactivatePost({ variables: { postID } });

  useEffect(() => {
    const { called, data, error } = deleteData;
    if (!called) {
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    if (!error && data) {
      refetchFn();
    }
  }, [deleteData]);

  return <DeleteIcon onClick={deletePost} />;
};
