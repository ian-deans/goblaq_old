/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/directory/CategorySearchLinks";
import { PopularPlaces } from "../src/components/directory/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/directory/Headers/Home/HomeHeader";

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