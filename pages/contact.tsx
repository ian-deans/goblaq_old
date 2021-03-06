/* Home */
import React from "react";
import Head from "next/head";

import Layout from '../src/components/common/Layout';
import MainNav from '../src/components/common/MainNav';
import Footer from '../src/components/common/Footer';

const Contact: React.SFC = (props: any) => {
    const style = { border: "none" }
    return (
        <Layout>
            <Head>
                <title>Goblaq - Contact</title>
            </Head>            
            <MainNav />
            <div className="jumbotron-fluid goblaq-main-banner">
                <div className="col-md">
                    <h1 className="display-4 goblaq-main-banner-title">Discover More</h1>
                    <p className="lead goblaq-main-banner-lead">experiences within the Black Community</p>
                </div>
            </div>
            <div className="row justify-content-md-center goblaq-main-content">
                <h2>Contact</h2>
                <iframe style={style} width="100%" height="500px" src="https://goblaq.freshdesk.com/widgets/feedback_widget/new?"></iframe>
            </div>
            <Footer />
        </Layout>
    );
};

export default Contact;
