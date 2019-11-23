import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { BusinessCard, BusinessCardGrid } from "../BusinessCard";

import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESSES } from "~/services/graphql/queries";


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

  const { loading, error, data } = useQuery(GET_BUSINESSES);

  if (loading) {
    console.log("loading ::", loading);
    return <span>"Loading..."</span>; //TODO or this, this is not good
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
      location: `${biz.location.address_1}, ${biz.location.city}, ${biz.location.state}`,
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
