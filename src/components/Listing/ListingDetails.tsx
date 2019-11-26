import React from "react";
import Container from "@material-ui/core/Container";
import { ListingHeader } from "./ListingHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import {GET_BUSINESS} from "~/services/graphql/queries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {},
    contentFrame: {
      display: "flex",
      justifyContent: "space-between",
    },
    mainSection: {
      width: "66%",
    },
    sideSection: {
      width: "33%",
      borderLeft: "solid black 1px",
      display: "flex",
      flexDirection: "column",
      paddingLeft: "1em",
      // alignItems: "center",
    },
  })
);

interface Props {
  businessID: string | string[];
  theme?: Theme;
};

export const ListingDetails: React.FunctionComponent<Props> = ({theme, businessID}) => {
  const classes = useStyles(theme);
  const variables = {id: businessID};

  const {loading, error, data} = useQuery(GET_BUSINESS, {variables});

  if (loading) {
    return <div>LOADING</div>;
  }

  console.log("DATA :: ", data);

  const listing = data.businesses[0];

  return (
    <article className={classes.root}>
      <Container className={classes.container}>
        <ListingHeader {...listing} />
        
        <div className={classes.contentFrame}>
          
          <section className={classes.mainSection}>
            <section>Description</section>
            if user:
            <div style={{ marginLeft: "2em" }}>
              <section>features</section>
              <section>gallery</section>
              <section>reservation maker (phase4+)</section>
              <section>Reviews</section>
            </div>
          </section>

          <aside className={classes.sideSection}>
            side content
            <section>Business Hours</section>
            <div className="user-consumer">
              <section>location</section>
              <section>video - phase3+</section>
              <section>social media links</section>
              <section>suggestions</section>
            </div>
          </aside>

        </div>
      </Container>
    </article>
  );
};
