import React from "react";
import { ListingHeader } from "./ListingHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS_DETAILS } from "~/services/graphql/queries";
import { UserConsumer } from "~/contexts/UserContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Reviews } from "~/components/businesses/Reviews";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "2em",
    },
    container: {},
    contentFrame: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    mainSection: {
      width: "66%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        order: 2,
      },
    },
    sideSection: {
      width: "33%",
      borderLeft: "solid black 1px",
      display: "flex",
      flexDirection: "column",
      paddingLeft: "1em",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        order: 1,
        border: "none",
      },
    },
    description: {
      margin: "2em 0",
      backgroundColor: "lightgrey",
    },
  })
);

interface Props {
  businessID: string | string[];
  theme?: Theme;
}

export const ListingDetails: React.FunctionComponent<Props> = ({
  theme,
  businessID,
}) => {
  const classes = useStyles(theme);
  const variables = { id: businessID };

  const { loading, error, data } = useQuery(GET_BUSINESS_DETAILS, {
    variables,
  });

  if (loading || !data) {
    return (
      <article className={classes.root}>
        <LinearProgress color="secondary" />
      </article>
    );
  }

  const listing = data.businesses[0];

  return (
    <article className={classes.root}>
      <ListingHeader {...listing} />

      <div className={classes.contentFrame}>
        <section className={classes.mainSection}>
          <Description className={classes.description} {...listing} />
          <UserConsumer>
            {({ user }) =>
              user && user.hasura ? (
                <React.Fragment>
                  <Reviews
                    businessID={businessID}
                    uid={user.firebase.uid}
                    displayName={user.firebase.displayName}
                  />
                  {/* <section>features</section>
                      <section>gallery</section> 
                      <section>reservation maker (phase4+)</section> */}
                </React.Fragment>
              ) : (
                <div>Sign up for free to see more information!</div>
              )
            }
          </UserConsumer>
        </section>

        <aside className={classes.sideSection}>
          <section>Business Hours</section>
          <div className="user-consumer">
            <section>location</section>
            {/* <section>video - phase3+</section> */}
            {/* <section>social media links</section> //TODO: once claimed these will be visible */} 
            {/* <section>suggestions</section> //TODO: suggestions based on location and search */}
          </div>
        </aside>
      </div>
    </article>
  );
};

function Description({ description, className }) {
  return (
    <section className={className}>
      <p>{description || "No description provided."}</p>
    </section>
  );
}
