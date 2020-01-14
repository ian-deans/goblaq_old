import React from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { BusinessDetails } from "~/components/businesses/BusinessDetails/BusinessDetails";
import { UserConditional } from "~/components/common/UserConditional/UserConditional";
import { Reviews } from "~/components/businesses/Reviews";
import { BackButton } from "~/components/common/BackButton";
import Toolbar from "@material-ui/core/Toolbar";

const ViewListing = () => {
  const { businessID } = useRouter().query;
  if (!businessID) {
    //TODO: add a custom loading skeleton
    return <LinearProgress />;
  }

  return (
    <React.Fragment>
      {/* <div
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
      </div> */}
      <div
        className="details-container"
        style={{
          // marginTop: "15vh",
          padding: "0 1em",
        }}
      >
        <Toolbar color="secondary">
          <BackButton color="primary" variant="contained">
            &lt; Back
          </BackButton>
        </Toolbar>
        <BusinessDetails businessID={businessID} />
        <UserConditional>
          <Reviews businessID={businessID} />
        </UserConditional>
      </div>
    </React.Fragment>
  );
};

export default ViewListing;
