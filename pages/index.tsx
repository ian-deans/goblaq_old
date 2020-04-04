/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/common/Headers/Home/HomeHeader";
import { SearchBar } from "~/components/businesses/Search";
import Paper from "@material-ui/core/Paper";
import { Page } from "./Page";

const Home: React.SFC = (props: any) => {
  return (
    <Page>
      <HomeHeader>
        <SearchBar />
      </HomeHeader>
      <CategorySearchLinks {...props} />
      <hr />
      <PopularPlaces top3={true} />
    </Page>
  );
};

export default Home;