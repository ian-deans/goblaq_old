/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/common/Headers/Home/HomeHeader";

const Home: React.SFC = (props: any) => {
  return (
    <div>
      <HomeHeader />
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces top3={true} />
    </div>
  );
};

export default Home;