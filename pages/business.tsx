/* Home */
import React from "react";
import Head from "next/head";

import Layout from '../src/components/common/Layout';
import MainNav from '../src/components/common/MainNav';
import Footer from '../src/components/common/Footer';

const Business: React.SFC = (props: any) => {
    return (
        <Layout>
            <Head>
                <title>Goblaq - Add a Business</title>
            </Head>
            <MainNav />
            <div className="jumbotron-fluid goblaq-main-banner">
                <div className="col-md">
                    <h1 className="display-4 goblaq-main-banner-title">Discover More</h1>
                    <p className="lead goblaq-main-banner-lead">experiences within the Black Community</p>
                </div>
            </div>
            <div className="row justify-content-md-center goblaq-main-content">
                <h2>Add a Business</h2>
            </div>
            <Footer />
        </Layout>
    );
};

export default Business;