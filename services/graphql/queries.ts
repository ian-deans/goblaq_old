import gql from "graphql-tag";

export const GET_BUSINESS_CATEGORIES = gql`
  query business_categories {
    business_categories {
      id
      name
      text
    }
  }
`;

export const GET_BUSINESSES = gql`
  {
    businesses {
      id
      average_rating
      description
      location {
        address_1
        city
        id
        state
        zip
      }
      name
    }
  }
`;

export const GET_USER = gql`
  {
    users {
      id
      first_name
      last_name
      username
      email_address
    }
  }
`;

export const SEARCH_BY_CATEGORY = gql`
  query searchByCategory($categoryFilter: String!) {
    businesses(where: { category: { name: { _eq: $categoryFilter } } }) {
      description
      id
      average_rating
      name
    }
  }
`;
