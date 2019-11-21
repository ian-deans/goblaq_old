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
    # businesses(where: { verified: { _eq: true } }) {
    businesses(limit: 10) {
      id
      name
      average_rating
      verified
      category {
        id
        name
      }
      location {
        id
        address_1
        address_2
        city
        state
        zip
      }
      contacts(where: { contact_type: { _eq: office } }) {
        contact_value
      }
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

export const GET_BUSINESSES_BY_CATEGORY = gql`
  query getBusinessesByCategory($categoryFilter: String!) {
    businesses(
      where: {
        # approved: { _eq: true }
        category: { name: { _eq: $categoryFilter } }
      }
    ) {
      category {
        id
        name
      }
      id
      name
      location {
        id
        address_1
        address_2
        city
        state
        zip
      }
      contacts(where: { contact_type: { _eq: office } }) {
        contact_value
      }
      average_rating
    }
  }
`;
