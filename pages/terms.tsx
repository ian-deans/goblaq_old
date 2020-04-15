/* Home */
import React from "react";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";

const Terms: React.SFC = (props: any) => {
    return (
        <Page>
            <h2>Terms and Conditions</h2>
            <Typography variant="body1">
            Last Updated on March 13, 2020. These Terms of Service (which, together with the
Business Terms below, are the “Terms”) are effective immediately for users accessing or
using the Service without an Account or those registering Accounts on or after March 13,
2020, and will become effective March 13, 2020 for users with pre-existing Accounts. To
review the previous terms, please click here.
            </Typography>
  
             <Typography variant="body1">
            PLEASE NOTE: THESE TERMS INCLUDE DISPUTE RESOLUTION PROVISIONS (SEE
SECTION 13) THAT, WITH LIMITED EXCEPTIONS, REQUIRE THAT (1) CLAIMS YOU
BRING AGAINST GOBLAQ BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION,
AND (2) YOU WAIVE YOUR RIGHT TO BRING OR PARTICIPATE IN ANY CLASS,
GROUP, OR REPRESENTATIVE ACTION OR PROCEEDING.
            </Typography>
        </Page>
    );
};

export default Terms; 
