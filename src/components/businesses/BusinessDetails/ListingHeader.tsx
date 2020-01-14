import React from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Rating } from "~/components/common/Rating";

import { useSubscription } from "@apollo/react-hooks";
import { SUBSCRIBE_TO_BUSINESS_RATING } from "~/services/graphql/subscriptions";

// import from "@material-ui/core/";

export const ListingHeader = ({
  id,
  name,
  tags,
  claimed,
  verified,
  location,
  created_at,
  contacts,
}) => {
  const { back } = useRouter();
  const locationString = buildLocationString(location);

  return (
    <header
      className="listing-header"
      style={{
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
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{tags}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          width: "33%",
        }}
      >
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "column",
          }}
        >
          <a target="_blank" href={`https://www.google.com/maps/place/${locationString}`} >
          <Typography align="right" variant="body2">
            {locationString}
          </Typography>
          </a>
          <Typography align="right" variant="body2">
            {contacts[0] ? contacts[0].contact_value : null}
          </Typography>
          <AverageRating businessID={id} />
        </div>

        {/* <div>
          <Button size="small" variant="outlined">
            Write Review
          </Button>
          Buttons disabled until supported features are added
          <Button size="small" variant="outlined">
            Save
          </Button>
          <Button size="small" variant="outlined">
            Share
          </Button>
        </div> */}
      </div>
    </header>
  );
};

function AverageRating({ businessID }) {
  const [rating, setRating] = React.useState(0);

  const subscription = useSubscription(SUBSCRIBE_TO_BUSINESS_RATING, {
    variables: { id: businessID },
  });

  function handleSubsciption() {
    const { loading, error, data } = subscription;

    if (data) {
      const rating = data.businesses[0].average_rating;
      setRating(rating);
    }
  }

  React.useEffect(handleSubsciption, [subscription]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "1em",
      }}
    >
      <Rating align="right" readOnly={true} value={rating} />
      <Typography
        color="textSecondary"
        align="right"
        variant="h5"
        style={{
          marginLeft: "1em",
        }}
      >
        {rating}
      </Typography>
    </div>
  );
}

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
