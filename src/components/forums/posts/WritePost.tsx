import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { INSERT_POST } from "~/services/graphql/mutations/post";
import { useSession } from "~/contexts/UserContext";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import { PostForm } from "./PostForm";

interface Props {
  forumID: string | string[];
  theme?: any;
}

const initialState = {
  title: "",
  content: "",
  user_id: "",
  forum_id: "",
};

export const WritePost: React.FC<Props> = ({ forumID }) => {
  const { push: pushRoute } = useRouter();
  const {
    user: {
      hasura: { id: user_id },
    },
  } = useSession();
  const [savePost, mutationData] = useMutation(INSERT_POST);
  const [state, setState] = useState({
    ...initialState,
    forum_id: forumID,
    user_id,
  });
  const [metaState, setMetaState] = useState({
    saving: false,
    error: undefined,
  });

  const forumURL = `/forums/view?forumID=${forumID}`;

  useEffect(() => {
    const { loading, error, data } = mutationData;

    const newState = { ...metaState };
    newState.saving = loading;
    newState.error = error;
    setMetaState(newState);

    if (data) {
      pushRoute(forumURL);
    }
  }, [mutationData]);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    savePost({ variables: { objects: [state] } });
  };

  return (
    <Paper style={{
      padding: "2em"
    }}>
      <PostForm
        submitFn={handleSubmit}
        changeFn={handleChange}
        title={state.title}
        content={state.content}
        saving={metaState.saving}
      />
    </Paper>
  );
};
