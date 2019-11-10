/* Home */
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { CategorySearchLinks } from "../src/components/CategorySearchLinks/CategorySearchLinks";
import { PopularPlaces } from "../src/components/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/Headers/Home/HomeHeader";

import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag";



export default (props: any) => {
  const { loading, error, data } = useQuery(GET_USER);

  if(process.browser) { 
    React.useEffect(() => {
      console.log("loading ", loading)
      console.log("error ", error)
      console.log("data ", data)
    }, [loading, error, data])
  }



  return (
    <Container maxWidth="lg">
      <HomeHeader />
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces key="a1" top3={true} />
      <hr />
      <PopularPlaces key="a2" top3={false} />
    </Container>
  );
};

const GET_USER = gql`
  {
    users {
      id
      first_name
    }
  }
`;