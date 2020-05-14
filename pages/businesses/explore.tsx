import React from "react";
import Head from "next/head";

import {
  SearchBar,
  SearchResults,
} from "../../src/components/businesses/Search";
import Layout from '../../src/components/common/Layout';
import MainNav from '../../src/components/common/MainNav';
import Footer from '../../src/components/common/Footer';

export default props => {
  return (
    <Layout>
      <Head>
          <title>Goblaq - Explore</title>
      </Head>            
      <MainNav />
      <div className="jumbotron-fluid goblaq-main-banner" />
      <div className="row justify-content-md-center goblaq-main-content">
        <SearchBar />
        <SearchResults />
      </div>
      <Footer />
    </Layout>
  );
};
