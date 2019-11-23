import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { BusinessCard, BusinessCardSkeleton, BusinessCardGrid } from "~/components/BusinessCard";

interface BusinessData {
  id: number;
  name: string;
  location: string;
  contact: string;
  category: string;
  averageRating: number | null;
}

export const Results: React.SFC<any> = ({
  theme,
  variables,
  limit,
  offset,
  query,
}) => {
  const { loading, error, data } = useQuery(query, {
    variables: { ...variables, limit, offset },
  });
  if (loading) {
    const skeletons = Array.from(new Array(limit)).map((item, i) => <BusinessCardSkeleton key={i} />);
    return <BusinessCardGrid>{skeletons}</BusinessCardGrid>;
  }

  if (error) {
    return <span>An Error Occured</span>;
  }

  const businesses = data.businesses.map(
    (biz: any, i: number): BusinessData => {
      const businessData: BusinessData = {
        id: biz.id,
        name: biz.name,
        category: biz.category ? biz.category.name : "",
        averageRating: biz.average_rating,
        location: `${biz.location.address_1}, ${biz.location.city}, ${biz.location.state}`,
        contact: biz.contacts[0] ? biz.contacts[0].contact_value : undefined,
      };
      return businessData;
    }
  );

  const businessCards = businesses.map((biz: BusinessData, i: number) => (
    <BusinessCard key={i} {...biz} />
  ));

  return <BusinessCardGrid>{businessCards}</BusinessCardGrid>; 
};
