/* Home */
import React from "react";
import { Page } from "../src/components/common/Page";

const Terms: React.SFC = (props: any) => {
    return (
        <Page>
            <h2>Terms and Conditions</h2>
        </Page>
        <h2>About</h2>
            <Typography variant="body1">
               Last Updated on November 27, 2012. These terms and conditions are effective immediately for those registering accounts 
            after that date and will become effective December 27, 2012 for those with pre-existing accounts.These terms and conditions 
            (the “Terms”) govern your access to and use of Buy Black Texas’s websites and mobile applications that link to or reference 
            these Terms (“Site”). By accessing or using the Site, you are agreeing to these Terms and concluding a legally binding 
            contract with Buy Black Texas Inc., a Delaware corporation headquartered in San Francisco, California (“Buy Black Texas”). 
            Do not access or use the Site if you are unwilling or unable to be bound by the Terms.
            </Typography>
    );
};

export default Terms;


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
