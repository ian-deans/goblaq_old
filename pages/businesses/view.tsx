import React from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ListingDetails } from "~/components/businesses/BusinessDetails/BusinessDetails";

const ViewListing = () => {
  const { businessID } = useRouter().query;
  if (!businessID) {
    return <LinearProgress />;
  }

  console.log("BUSINESS ID\n", businessID)

  return (
    <React.Fragment>
      <div
        className="heading-carousel"
        style={{
          position: "absolute",
          left: 0,
          height: "15vh",
          backgroundColor: "black",
          color: "white",
          width: "100%",
        }}
      >
        gallery carousel or banner image
      </div>
      <div className="details-container" style={{ marginTop: "15vh", padding: "0 1em" }}>
        <ListingDetails businessID={businessID} />
      </div>
    </React.Fragment>
  );
};

export default ViewListing;
