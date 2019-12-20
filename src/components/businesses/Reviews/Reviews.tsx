import React from "react";
import { WriteReview } from "./WriteReview";
import { ReviewList } from "./ReviewList";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GET_REVIEWS } from "~/services/graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";

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
  uid?: string | string[];
  displayName?: string | string[];
}



export const Reviews: React.FC<Props> = ({ businessID }) => {
  const classes = useStyles({});
  const { loading, data, refetch } = useQuery(GET_REVIEWS, {
    ...setViewerHTTPHeader(),
    pollInterval: 5000,
    // fetchPolicy: "no-cache",
    variables: { businessID },
  });

  if (loading || !data) {
    return <LinearProgress />;
  }

  const refetchReviews = () => refetch();

  const { reviews } = data;
  return (
    <div className={classes.root}>
      <div>
        <ReviewList reviews={reviews} />
      </div>
      <WriteReview
        businessID={businessID}
        refetchFn={refetchReviews}
      />
    </div>
  );
};


