import React from "react";
import { WriteReview } from "./WriteReview";
import { ReviewList } from "./ReviewList";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GET_REVIEWS_AND_USER } from "~/services/graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";




const useStyles = makeStyles((theme:any)=> createStyles({
  root: {
    // borderStyle: "solid",
    // borderSize: "1px",
    // borderColor: theme.palette.grey,
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: theme.palette.secondary.main,
  },
}));

interface Props {
  businessID: string | string[];
  uid: string | string[];
  displayName: string | string[];
}


export const Reviews: React.FC<Props> = ({businessID, uid, displayName}) => {
  const classes = useStyles({});
  const { loading, data } = useQuery(GET_REVIEWS_AND_USER, {variables: { businessID }, pollInterval: 300000});

  if ( loading ) {
    return <LinearProgress />;
  }

  const { reviews, users } = data;

  const user = users[0];
  const userReview = reviews.find(r => r.user_id === user.id);

  return (
    <div className={classes.root}>
      <div>
        <ReviewList reviews={reviews}/>
      </div>
      <WriteReview businessID={businessID} userID={user.id} initialState={userReview} />
    </div>
  );
};

/*

obtains data from hasura ( reviews, user )

passes necessary data as props to child components

1. get reviews
2. get user
3. extract user's review from reviews ( review.find( r => r.user_id === user.id )) )
4. pass array of reviews to ReviewList
5. pass businessID, userID, userName to WriteReview

*/