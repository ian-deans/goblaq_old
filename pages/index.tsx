/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/CategorySearchLinks/CategorySearchLinks";
import { PopularPlaces } from "../src/components/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/Headers/Home/HomeHeader";

import { useQuery } from "@apollo/react-hooks";
// import { GET_BUSINESSES } from "../services/graphql/queries";

export default (props: any) => {
  // const { loading, error, data } = useQuery(GET_BUSINESSES);

  // if (loading) {
  //   console.log("loading ::", loading);
  //   return "Loading...";
  // }

  // if (error) {
  //   console.error("error :: ", error);
  //   //TODO dont leave this like this
  //   return "ERROR";
  // }

  // console.log("business data from hasura --> ", data);

  return (
    <div>
      <HomeHeader />
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces key="a1" top3={true} />
      {/* <hr /> */}
      {/* <PopularPlaces key="a2" top3={false} /> */}
    </div>
  );
};

