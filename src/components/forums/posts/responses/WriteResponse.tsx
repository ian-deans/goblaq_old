import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { INSERT_RESPONSE } from "~/services/graphql/mutations/response";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/react-hooks";
import { useSession } from "~/contexts/UserContext";

import { usePostContext } from "~/contexts/ForumContexts";


export const WriteResponse: React.FC = () => {
  const { postID, refetchFn } = usePostContext();
  const {
    user: {
      hasura: { id: user_id },
    },
  }: any = useSession();

  const [content, setContent] = useState("");
  const [saveResponse, mutationData] = useMutation(INSERT_RESPONSE);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { loading, error, data, called } = mutationData;

    if (loading) {
      setSaving(true);
    } else if (!loading && called) {
      setSaving(false);
      setContent("");
      refetchFn();
    }
  }, [mutationData]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setContent(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    const responseData = { content, post_id: postID, user_id };
    saveResponse({ variables: { objects: [responseData] } });
  };

  return (
    <Paper style={{ padding: "1em", marginTop: "1em" }}>
      <article>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            placeholder="Write a comment..."
            variant="outlined"
            onChange={handleChange}
            value={content}
            multiline={true}
            rows={6}
          />
          {saving ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              type="submit"
            >
              Submit
            </Button>
          )}
        </form>
      </article>
    </Paper>
  );
};
