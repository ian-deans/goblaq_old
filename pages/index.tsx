/* Home */
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { CategorySearchLinks } from "../src/components/CategorySearchLinks/CategorySearchLinks";
import { PopularPlaces } from "../src/components/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/Headers/Home/HomeHeader";

export default (props: any) => {
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

