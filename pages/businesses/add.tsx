import React from "react";
import Typography from "@material-ui/core/Typography";
import { AddListingForm } from "../../src/components/businesses/Forms/AddListingForm";
import { Page } from "../Page"



const AddListing: React.SFC = () => {
  return (
    <Page>
      <Typography style={{ marginBottom: "1em" }} variant="h4">
        Add Listing
      </Typography>
      <AddListingForm />
    </Page>
  );
};


// exporting in this manner allows for the page component's name to be displayed in dev tools
export default AddListing;

