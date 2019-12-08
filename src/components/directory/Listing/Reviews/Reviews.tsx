import React from "react";
import { WriteReview } from "./WriteReview";
import { ReviewList } from "./ReviewList";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GET_REVIEWS } from "~/services/graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      padding: "1em",
      display: "flex",
      flexDirection: "column",
    },
  })
);



interface Props {
  businessID: string | string[];
  uid: string | string[];
  displayName: string | string[];
}



export const Reviews: React.FC<Props> = ({ businessID, uid, displayName }) => {
  const classes = useStyles({});
  const { loading, data } = useQuery(GET_REVIEWS, {
    ...setViewerHTTPHeader(),
    pollInterval: 300000,
    variables: { businessID },
  });

  if (loading) {
    return <LinearProgress />;
  }

  const { reviews } = data;

  // const user = users[0];
  // const userReview = reviews.find(r => r.user_id === user.id);

  return (
    <div className={classes.root}>
      <div>
        <ReviewList reviews={reviews} />
      </div>
      <WriteReview
        businessID={businessID}
      />
    </div>
  );
};


function setViewerHTTPHeader() {
  return {context: { headers: { "x-hasura-role": "viewer" } }};
}