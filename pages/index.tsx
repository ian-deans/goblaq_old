/* Home */
import React from "react";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { SearchBar } from "~/components/businesses/Search";
import Layout from '../src/components/common/Layout';
import MainNav from '../src/components/common/MainNav';
import Footer from '../src/components/common/Footer';

const Home: React.SFC = (props: any) => {
  return (
    <Layout>
      <MainNav />
      <div className="jumbotron-fluid goblaq-main-banner">
          <div className="col-md">
              <h1 className="display-4 goblaq-main-banner-title">Discover More</h1>
              <p className="lead goblaq-main-banner-lead">experiences within the Black Community</p>
          </div>
      </div>
      <div className="row justify-content-md-center goblaq-search">
          <div className="col-md-10">
              <div className="flex-row justify-content-center goblaq-search-fields">
                  <SearchBar />
              </div>
              <div className="flex-row justify-content-center goblaq-search-categories">
                  <CategorySearchLinks {...props} />
              </div>
              <div className="flex-row justify-content-center goblaq-search-popular-places">
                  <PopularPlaces top3={true} />
              </div>
          </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;