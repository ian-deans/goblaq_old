import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { Rating } from "~/components/common/Rating";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  INSERT_REVIEW,
  UPDATE_REVIEW,
} from "~/services/graphql/mutations/review";
import { useSession } from "~/contexts/UserContext";
import { GET_USER_REVIEWS } from "~/services/graphql/queries";
import { ErrorBoundary } from "~/components/common/ErrorBoundary/ErrorBoundary";

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
      color: theme.palette.text.secondary,
    },
  })
);

interface Props {
  businessID: string | string[];
  refetchFn: any;
  theme?: Theme;
}

export const WriteReview: React.FunctionComponent<Props> = ({
  businessID,
  refetchFn,
  theme,
}) => {
  // get css classes
  const classes = useStyles(theme);

  // get user if from UserContext
  const {
    user: {
      hasura: { id: userID },
    },
  } = useSession();

  // initialize state
  const [title, setTitle] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");
  const [reviewID, setReviewID] = React.useState<number | null>(undefined);
  const [error, setError] = React.useState<any | null>(undefined);

  // initialize mutations to be used later
  const [postReview, postData] = useMutation(INSERT_REVIEW);
  const [updateReview, updateData] = useMutation(UPDATE_REVIEW);

  // submit query to get reviews owned by the user
  const queryData = useQuery(GET_USER_REVIEWS, {
    variables: { businessID },
  });

  // Attach listeners to graphql requests
  React.useEffect(handleQueryData, [queryData]);
  React.useEffect(handlePostData, [postData]);

  function handleQueryData() {
    const { loading, error, data } = queryData;
    if (error) {
      setError("An Error Occurred.");
      console.error(error);
      return;
    }
    if (data) {
      // did it this way for when admins are logged in; swap with better admin interface
      const review = data.reviews.find(review => review.user_id === userID);
      if (review) {
        setTitle(review.title);
        setRating(review.rating);
        setDescription(review.description);
        setReviewID(review.id);
      }
    }
  }

  function handlePostData() {
    const { called, loading, error, data } = postData;
    if (!called) {
      return;
    }

    if (!loading && !error) {
      refetchFn();
    }
  }

  // if (!userID) {
  //   //TODO handle user error
  //   return <p>No User Found</p>;
  // }

  if (queryData.loading) {
    return <LinearProgress />;
  }

  const handleSubmit = () => {
    setError(null);
    const data = { rating, title, description };

    if (rating < 0.5) {
      console.info("No rating given.");
      setError("You must provide a rating score");
      return;
    }
    if (reviewID) {
      // update review
      const variables = {
        objects: data,
        id: reviewID,
      };
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
      postReview({ variables });
      // useEffect watches mutation data and handles refetching
    }
  };

  return (
    <Paper component="article" className={classes.root}>
      <ErrorBoundary>
        <header
          style={{
            marginBottom: "2em",
          }}
        >
          <Typography variant="subtitle2">
            {reviewID ? "Edit Your Review" : "Write A Review"}
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
          <span style={{ marginLeft: "1em" }}>{error}</span>
        </div>
      </ErrorBoundary>
    </Paper>
  );
};

/*

should take initialState as a prop; if not provided it uses its default state

only needs the uid to obtain the user from hasura



*/
