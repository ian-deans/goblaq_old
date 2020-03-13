import React from "react";
import Typography from "@material-ui/core/Typography";
import { AddListingForm } from "../../src/components/businesses/Forms/AddListingForm";


const AddListing: React.SFC = () => {
  return (
    <div>
      <Typography style={{ marginBottom: "1em" }} variant="h4">
        Add Listing
      </Typography>
      <AddListingForm />
    </div>
  );
};


// exporting in this manner allows for the page component's name to be displayed in dev tools
export default AddListing;

