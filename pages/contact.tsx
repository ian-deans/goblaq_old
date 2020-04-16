/* Home */
import React from "react";
import { Page } from "../src/components/common/Page";

const Contact: React.SFC = (props: any) => {
    const style = { border: "none" }
    return (
        <Page>
            <h2>Contact</h2>
            <iframe style={style} width="100%" height="500px" src="https://goblaq.freshdesk.com/widgets/feedback_widget/new?"></iframe>
        </Page>
    );
};

export default Contact;
