/* Home */
import React from "react";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";

const Terms: React.SFC = (props: any) => {
    return (
        <Page>
            <h2>Terms and Conditions</h2>
            <Typography variant="body1">
            Last Updated on March 13, 2020. These Terms of Service (which, together with the Business Terms below, a
                re the “Terms”) are effective immediately for users accessing or using the Service without an Account or those 
                registering Accounts on or after March 13, 2020, and will become effective January 31, 2020 for users with 
                pre-existing Accounts. To review the previous terms, please click here.
            </Typography>
        </Page>
    );
};

export default Terms; 
