/* Home */
import React from "react";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";

const About: React.SFC = (props: any) => {
    return (
        <Page>
            <h2>About</h2>
            <Typography variant="body1">
                Goblaq was built for the digital age of consumers/retailers. 
                Our transformative point-of-sale technologies give our users 
                the tools to sell more and to engage more deeply with consumers, 
                continually building value over the lifetime of their relationship.
            </Typography>
            <Typography variant="body1">
                Goblaq customized solutions designed to optimize business impact
                by putting the retailer’s brand first with a flexible pricing options.
            </Typography>
            <Typography variant="body1">
                We handle all the heavy lifting, allowing you to focus on 
                growing your business through partnerships with bloggers, 
                influencers, ambassadors, and promoters.
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