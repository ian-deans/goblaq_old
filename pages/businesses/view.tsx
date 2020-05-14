import React from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { BusinessDetails } from "~/components/businesses/BusinessDetails/BusinessDetails";
import { UserConditional } from "~/components/common/UserConditional/UserConditional";
import { Reviews } from "~/components/businesses/Reviews";
import { BackButton } from "~/components/common/BackButton";
import Toolbar from "@material-ui/core/Toolbar";
import { Page } from "../../src/components/common/Page";
import Layout from '../../src/components/common/Layout';
import MainNav from '../../src/components/common/MainNav';
import Footer from '../../src/components/common/Footer';

const ViewListing = () => {
  const { businessID } = useRouter().query;
  if (!businessID) {
    //TODO: add a custom loading skeleton
    return <LinearProgress />;
  }

  return (
    <Layout>
      <Head>
          <title>Goblaq - Explore</title>
      </Head>            
      <MainNav />
      <div className="jumbotron-fluid goblaq-main-banner" />
      <div className="row justify-content-md-center goblaq-main-content">
        <div
          className="details-container"
          style={{
            padding: "0 1em",
          }}
        >
          <Toolbar color="secondary">
            <BackButton color="primary" variant="contained">
              &lt; Back
            </BackButton>
          </Toolbar>
          <BusinessDetails businessID={businessID} />
          <UserConditional>
            <Reviews businessID={businessID} />
          </UserConditional>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ViewListing;
