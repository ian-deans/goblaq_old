import React from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ListingDetails} from "~/components/Listing/ListingDetails";

const ViewListing = () => {
  const { businessID } = useRouter().query;
  if (!businessID) {
    return <LinearProgress />;
  }

  return (
    <div>
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
      <ListingDetails businessID={businessID} />
    </div>
  );
};

export default ViewListing;
