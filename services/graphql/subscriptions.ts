import gql from "graphql-tag";

export const SUBSCRIBE_TO_BUSINESS_RATING = gql`
  subscription BusinessRating($id: Int!) {
    businesses(where: { id: { _eq: $id } }) {
      average_rating
    }
  }
`;
