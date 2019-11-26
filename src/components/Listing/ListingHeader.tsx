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
  location: { address1, address2, city, state, zip },
  description,
  created_at,
  contacts,
}) => {
  const locTokens = [];
  if (address1) {
    locTokens.push(address1);
  }
  if (address2) {
    locTokens.push(address2);
  }
  if (city) {
    locTokens.push(city);
  }
  if (state) {
    locTokens.push(state);
  }

  const locString = locTokens.join(", ");
  const {back} = useRouter();



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
          }}
        >
          <Typography variant="body2">
            <span style={{ marginRight: "1em" }}>{locString}</span>
          </Typography>
        <Typography variant="body2">{ contacts[0] ? contacts[0].contact_value : null}</Typography>
        </div>
        <Typography variant="h5">{average_rating}</Typography>
        <div>
          <Button size="small" variant="outlined">
            Write Review
          </Button>
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

