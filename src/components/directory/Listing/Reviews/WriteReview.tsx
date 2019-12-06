import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { POST_REVIEW, UPDATE_REVIEW } from "~/services/graphql/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "250px",
      padding: "1em 2em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    textField: {
      width: "100%",
    },
  })
);

interface State {
  title: string | null;
  rating: number;
  description: string;
  id?: number | undefined;
  user_id?: number | undefined;
}

interface Props {
  businessID: string | string[];
  userID: string | string[];
  displayName?: string | string[];
  theme?: Theme;
  initialState: State | undefined;
}

const defaultState: State = {
  id: undefined,
  user_id: undefined,
  title: "",
  description: "",
  rating: 0,
};

export const WriteReview: React.FunctionComponent<Props> = ({
  businessID,
  userID,
  theme,
  initialState,
}) => {
  // get css classes
  const classes = useStyles(theme);

  // initialize mutations
  const [postReview, postData] = useMutation(POST_REVIEW);
  const [updateReview, updateData] = useMutation(UPDATE_REVIEW);

  // set state
  const [rating, setRating] = React.useState(
    (initialState && initialState.rating) || 0
  );
  const [description, setDescription] = React.useState(
    (initialState && initialState.description) || ""
  );
  const [title, setTitle] = React.useState(
    (initialState && initialState.title) || ""
  );

  const handleSubmit = () => {
    const data = { rating, title, description };

    if (initialState && initialState.id) {
      // update review
      const variables = {
        objects: data,
        id: initialState.id,
      };
      console.log(variables);
      updateReview({ variables });
    } else {
      // post review
      const variables = {
        objects: [
          {
            ...data,
            user_id: userID,
            business_id: businessID,
          },
        ],
      };
      console.log(variables);
      postReview({ variables });
    }
  };

  return (
    <Paper component="article" className={classes.root}>
      <header
        style={{
          marginBottom: "2em",
        }}
      >
        <Typography variant="subtitle2">
          {initialState && initialState.id
            ? "Edit Your Review"
            : "Write A Review"}
        </Typography>
      </header>
      <TextField
        name="title"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="Give your review a headline"
      />
      <div
        style={{
          margin: "1em 0em",
        }}
      >
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          max={10}
        />
      </div>
      <Paper>
        <TextField
          name="description"
          onChange={event => setDescription(event.target.value)}
          className={classes.textField}
          variant="outlined"
          multiline={true}
          rows={5}
          value={description}
          placeholder="Write a summary of your experience"
        />
      </Paper>
      <div
        style={{
          margin: "1em 0em",
        }}
      >
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
      </div>
    </Paper>
  );
};

/*

should take initialState as a prop; if not provided it uses its default state

only needs the uid to obtain the user from hasura



*/
