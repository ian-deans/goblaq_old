import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { BusinessCard } from "~/components/BusinessCard/BusinessCard";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { Skeleton } from "@material-ui/lab/Skeleton";

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
    // "@global": {
    //   html: {
    //     [theme.breakpoints.up("md")]: {
    //       fontSize: 16,
    //     },
    //   },
    // },
    root: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
      justifyItems: "center",
      gridGap: "1em .5em",
      margin: "2em 0em",
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(auto-fit, minMax(190px, 1fr))",
        gridGap: "1em",
      },
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

  console.log("OFFSET ", offset);

  // const skeletons = Array.from(new Array(8)).map((item, i) => (
  //   <div>
  //     <Skeleton variant="rect" width="300" height="200" />
  //     <Skeleton />
  //     <Skeleton />
  //   </div>
  // ))

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>An Error Occured</span>;
  }

  console.log(data);

  const businesses = data.businesses.map(
    (biz, i): BusinessData => {
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
