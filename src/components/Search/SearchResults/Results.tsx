import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { BusinessCard, BusinessCardSkeleton } from "~/components/BusinessCard/BusinessCard";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface BusinessData {
  id: number;
  name: string;
  location: string;
  contact: string;
  category: string;
  averageRating: number | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
      gridTemplateRows: "repeat(auto-fill, max-content)",
      justifyItems: "center",
      gridGap: "1em .25em",
      margin: "2em 0em",
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(auto-fit, minMax(220px, 1fr))",
        gridGap: "1em",
      },
    },
    skeleton: {
      minWidth: "150px",
      maxWidth: ""
    },
  })
);

export const Results: React.SFC<any> = ({
  theme,
  variables,
  limit,
  offset,
  query,
}) => {
  const classes = useStyles(theme);
  const { loading, error, data } = useQuery(query, {
    variables: { ...variables, limit, offset },
  });

  
  if (loading) {
    const skeletons = Array.from(new Array(limit)).map((item, i) => <BusinessCardSkeleton key={i} />);
    return <div className={classes.root}>{skeletons}</div>;
  }

  if (error) {
    return <span>An Error Occured</span>;
  }

  const businesses = data.businesses.map(
    (biz: any, i: number): BusinessData => {
      const businessData: BusinessData = {
        id: biz.id,
        name: biz.name,
        category: biz.category ? biz.category.name : "",
        averageRating: biz.average_rating,
        location: `${biz.location.address_1}, ${biz.location.city}, ${biz.location.state}`,
        contact: biz.contacts[0] ? biz.contacts[0].contact_value : undefined,
      };
      return businessData;
    }
  );

  const businessCards = businesses.map((biz: BusinessData, i: number) => (
    <BusinessCard key={i} {...biz} />
  ));

  return <div className={classes.root}>{businessCards}</div>;
};
