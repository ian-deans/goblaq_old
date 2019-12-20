import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { BusinessCard, BusinessCardSkeleton, BusinessCardGrid } from "../BusinessGrid";

import { useQuery } from "@apollo/react-hooks";
import { GET_RECENT_BUSINESSES_BY_CITY } from "~/services/graphql/queries";


interface BusinessData {
  id: number;
  name: string;
  location: string;
  contact: string;
  category: string;
  averageRating: number | null;
}

interface PopularPlacesProps {
  top3?: boolean;
}

export const PopularPlaces: React.SFC<PopularPlacesProps> = props => {
  //TODO: Rip this out
  const variables = { city: "%Houston%", limit: 6};

  const { loading, error, data } = useQuery(GET_RECENT_BUSINESSES_BY_CITY, {variables});

  if (loading) {
    const skeletons = Array.from(new Array(6)).map((c, i)=> (<BusinessCardSkeleton key={i} />))
    return (
      <div>
        <Box style={{margin: "1em 0"}}>
          <Typography variant="h5">Popular Places in Your Area</Typography>
        </Box>
        <BusinessCardGrid>{skeletons}</BusinessCardGrid>
      </div>
    );
  }

  if (error) {
    console.error("error :: ", error);
    //TODO dont leave this like this
    return <span>"ERROR"</span>;
  }

  const businesses = data.businesses.map((biz, i):BusinessData => {
    const businessData: BusinessData = {
      id: biz.id,
      name: biz.name,
      category: biz.category ? biz.category.name : "",
      averageRating: biz.average_rating,
      location: biz.location,
      contact: biz.contacts[0] ? biz.contacts[0].contact_value : undefined
    };
    return businessData;
  });

  const businessCards = businesses.map((biz: BusinessData, i: number) => <BusinessCard key={i} {...biz} />);

  return (
    <div>
      <Box style={{margin: "1em 0"}}>
        <Typography variant="h5">Popular Places in Your Area</Typography>
      </Box>
      <BusinessCardGrid>{businessCards}</BusinessCardGrid>
    </div>
  );
};
