import gql from "graphql-tag";

export const GET_BUSINESS_CATEGORIES = gql`
  query business_categories {
    business_categories(order_by: { text: asc }) {
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
    businesses(where: { category: { name: { _eq: $categoryFilter } } }) {
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

export const SearchBusinessesByTag = gql`
  query SearchBusinesses($city: String!, $tag: String!) {
    businesses(where: { tags: { _like: $tag } }) {
      id
      name
      average_rating
      tags
      category {
        text
      }
      location {
        address_1
        address_2
        city
        state
        zip
      }
      contacts {
        contact_value
        contact_type
      }
      claimed
      created_at
      description
      verified
    }
  }
`;

export const SearchBusinessesCount = gql`
  query SearchBusinessesCount($city: String!, $tag: String!) {
    businesses_aggregate(
      where: {
        location: { city: { _eq: $city } }
        _and: { tags: { _like: $tag } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export function buildSearchQueryCount({ locationType }) {
  return gql`
    query SearchBusinessesCount($location: String!, $tag: String!) {
      businesses_aggregate(
        where: {
          location: { ${locationType}: { _eq: $location } }
          _and: { tags: { _like: $tag } }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  `;
}

export function buildSearchQuery({ locationType }) {
  return gql`
  query SearchBusinesses($location: String!, $tag: String!, $limit: Int $offset: Int) {
  businesses(where: {location: {${locationType}: {_eq: $location}}, _and: {tags: {_like: $tag}}}, limit: $limit, offset: $offset, order_by: {name: asc}) {
    id
    name
    average_rating
    tags
    category {
      text
    }
    location {
      address_1
      address_2
      city
      state
      zip
    }
    contacts {
      contact_value
      contact_type
    }
    claimed
    created_at
    description
    verified
  }
}
`;
}
