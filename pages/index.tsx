/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/common/Headers/Home/HomeHeader";
import { SearchBar } from "~/components/businesses/Search";
import Paper from "@material-ui/core/Paper";


const Home: React.SFC = (props: any) => {
  return (
    <React.Fragment>
      <HomeHeader />
      <SearchBar />
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces top3={true} />
    </React.Fragment>
  );
};

export default Home;