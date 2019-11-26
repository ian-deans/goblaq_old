import React from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// import from "@material-ui/core/";

export const ListingHeader = ({
  average_rating,
  name,
  tags,
  claimed,
  verified,
  location,
  created_at,
  contacts,
}) => {

  const {back} = useRouter();
  const locationString = buildLocationString(location);

  return (
    <header
      className="listing-header"
      style={{
        marginTop: "15vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        height: "10em",
        minHeight: "100px",
        borderBottom: "solid black 1px",
      }}
    >
      <div
        style={{
          width: "66%",
        }}
      >
        <Typography onClick={() => back()} variant="body2"> &lt; Back</Typography>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{tags}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "33%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography align="right" variant="body2">
            {locationString}
          </Typography>
        <Typography align="right" variant="body2">{ contacts[0] ? contacts[0].contact_value : null}</Typography>
        </div>
        <Typography variant="h5">{average_rating}</Typography>
        <div>
          <Button size="small" variant="outlined">
            Write Review
          </Button>
          {/* Buttons disabled until supported features are added */}
          {/* <Button size="small" variant="outlined">
            Save
          </Button>
          <Button size="small" variant="outlined">
            Share
          </Button> */}
        </div>
      </div>
    </header>
  );
};

function buildLocationString({ address_1, address_2, city, state, zip }) {
  const tokens = [];

  if (address_1) {
    tokens.push(address_1);
  }
  if (address_2) {
    tokens.push(address_2);
  }
  if (city) {
    tokens.push(city);
  }
  if (state) {
    tokens.push(state);
  }
  if (zip) {
    tokens.push(zip);
  }

  return tokens.join(", ");
}