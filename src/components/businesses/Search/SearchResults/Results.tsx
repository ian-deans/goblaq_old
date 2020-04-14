import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  BusinessCard,
  BusinessCardSkeleton,
  BusinessCardGrid,
} from "~/components/businesses/BusinessGrid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


interface BusinessData {
  id: number;
  name: string;
  location: string;
  contact: string;
  category: string;
  averageRating: number | null;
}

interface Props {
  query: any;
  variables: any;
  theme?: any;
  limit?: number;
  offset?: number;
}

export const Results: React.SFC<Props> = ({
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
    const skeletons = generateSkeletons(limit);
    return <BusinessCardGrid>{skeletons}</BusinessCardGrid>;
  }

  if (error) {
    return <span>An Error Occured</span>;
  }

  const businessCards = data.businesses
    .map(formatBusinessData)
    .map(generateBusinessCard);

  if (!businessCards.length) {
    return <NoResults />;
  }

  return (
    <BusinessCardGrid>
      {businessCards}
    </BusinessCardGrid>
  );
};

function NoResults() {
  return (
    <Container>
      <Typography variant="subtitle2" align="center">
        No results matching that search criteria found, please try again.
      </Typography>
    </Container>
  );
}

function formatBusinessData(biz: any, i: number): BusinessData {
  const businessData: BusinessData = {
    id: biz.id,
    name: biz.name,
    category: biz.category ? biz.category.name : "",
    averageRating: biz.average_rating,
    location: biz.location,
    contact: biz.contacts[0] ? biz.contacts[0].contact_value : undefined,
  };
  return businessData;
}

function generateBusinessCard(biz: BusinessData, i: number) {
  return <BusinessCard key={i} {...biz} />;
}

function generateSkeletons(limit) {
  return Array.from(new Array(limit)).map(generateBusinessCardSkeleton);
}

function generateBusinessCardSkeleton(item:any, i:number) {
  return <BusinessCardSkeleton key={i} />;
}