import React from "react";
import { ListingHeader } from "./ListingHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS_DETAILS } from "~/services/graphql/queries";
import { UserConsumer } from "~/contexts/UserContext";
import LinearProgress from "@material-ui/core/LinearProgress";
// import { Reviews } from "~/components/businesses/Reviews";

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
        </section>
        <aside className={classes.sideSection}>
          <section>Business Hours</section>
        <UsersOnly>
          <span>More Features To Come!</span>
          <div className="user-consumer">
            <section>Location</section>
            {/* <section>video - phase3+</section> */}
            {/* <section>social media links</section> //TODO: once claimed these will be visible */}
            {/* <section>suggestions</section> //TODO: suggestions based on location and search */}
          </div>
        </UsersOnly>
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

function UsersOnly({ children }) {
  return (
    <UserConsumer>
      {({ user }) =>
        user && user.hasura ? (
          <div>
            { children }
          </div>
        ) : (
          <div>Sign up for free to see more information!</div>
        )
      }
    </UserConsumer>
  );
}
