/* Home */
import React from "react";
import Head from "next/head";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";

const About: React.SFC = (props: any) => {
    return (
        <Page>
            <Head>
                <title>Goblaq - About Us</title>
            </Head>
            <h2>About</h2>
            <Typography variant="body1">
                Goblaq is an online engagement platform that empowers the  African Americans community to build,
                launch and grow an online community.
            </Typography>

            <Typography variant="body1">
                Our goal is to connect black-owned local businesses with millions of users looking for their products.
            </Typography>

            <Typography variant="body1">
                Goblaq customized solutions designed to optimize business impact by putting the  retailer’s brand first with a
                flexible pricing options.
            </Typography>

            <div>
                <Typography variant="h5">
                    Our Staff
                </Typography>
            </div>
        </Page>
    );
};

export default About;
