/* Home */
import React from "react";
import Head from "next/head";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { HomeHeader } from "../src/components/common/Headers/Home/HomeHeader";
import { SearchBar } from "~/components/businesses/Search";
import Paper from "@material-ui/core/Paper";
import { Container }  from '@material-ui/core';
import { Page } from "../src/components/common/Page";

const Home: React.SFC = (props: any) => {
  return (
    <Page>
      <Head>
        <title>Goblaq - Discover More</title>
      </Head>
      <Container maxWidth="xl">
        <HomeHeader>
          <SearchBar />
        </HomeHeader>
        <CategorySearchLinks {...props} />
        <hr />
        <PopularPlaces top3={true} />
      </Container>
    </Page>
  );
};

export default Home;