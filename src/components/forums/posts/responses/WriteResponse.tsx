import React, { useState, useEffect } from "react";
import {useRouter} from "next/router"
import { useSession } from "~/contexts/UserContext";
import { TextField, Button, Paper } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { INSERT_RESPONSE } from "~/services/graphql/mutations/response";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";

const returnURL = "/forums/posts/view?postID=";

interface Props {
  postID: string | string[];
  theme?: any;
}


export const WriteResponse: React.FC<Props> = ({ postID }) => {
  const {push: pushRoute} = useRouter();
  const { user: {hasura: {id: user_id}} } = useSession();
  const [content, setContent] = useState("");
  const [saveResponse, mutationData] = useMutation(INSERT_RESPONSE);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { loading, error, data, called } = mutationData;

    if (loading) {
      setSaving(true);
    } else if (!loading && called ) {
      setSaving(false);
      setContent("");
      pushRoute(`${returnURL}${postID}`);
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
