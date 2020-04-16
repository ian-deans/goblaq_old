/* Home */
import React from "react";
import Head from "next/head";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Covid19: React.SFC = (props: any) => {
    return (
        <Page>
            <Head>
                <title>Goblaq - COVID-19</title>
            </Head>
            <Typography variant="h3">COVID-19</Typography>

            <Typography variant="body1">
                Goblaq is doing all we can to support our small and local black owned businesses, who live and work in the local communities we serve.
            </Typography>
            
            <Typography variant="body1">
                Because of our commitment to keep small business open during and after the covid19, we are offering a $4.99/year to all the black owned business during this covid-19 pandemic."
            </Typography>

            <Button>GET STARTED</Button>
        </Page >
    );
};

export default Covid19;
