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

export const GET_BUSINESS = gql`
  query selectBasicDetails($id: Int!) {
    businesses(where: { id: { _eq: $id } }) {
      name
      average_rating
      claimed
      created_at
      description
      tags
      verified
      contacts(where: { contact_type: { _eq: office } }) {
        contact_value
      }
      location {
        address_1
        address_2
        city
        state
        zip
      }
    }
  }
`;

//? where is this used?
export const GET_BUSINESSES = gql`
  query {
    businesses {
      id
      name
      average_rating
      location {
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

export const GET_RECENT_BUSINESSES_BY_CITY = gql`
  query selectRecentlyAddedByCity($city: String!, $limit: Int!) {
    businesses(
      where: { location: { city: { _like: $city } } }
      limit: $limit
      order_by: { created_at: asc }
    ) {
      average_rating
      id
      name
      tags
      contacts(where: { contact_type: { _eq: office } }) {
        contact_value
      }
      location {
        address_1
        address_2
        city
        state
        zip
      }
    }
  }
`;



export const GET_USER = gql`
  query {
    users {
      id
      first_name
      last_name
      username
      email_address
    }
  }
`;

// export const GET_BUSINESS_BY_ID = gql`
//   query getBusinessByID($businessID: Int!) {
//     businesses(where: { id: { _eq: $businessID } }) {
//       id
//       name
//       owner_id
//       average_rating
//       description
//       tags
//       claimed
//       verified
//       location {
//         address_1
//         address_2
//         city
//         state
//         zip
//       }
//       category {
//         text
//       }
//       contacts {
//         contact_value
//         contact_type
//       }
//       hours {
//         day
//         closes
//         opens
//       }
//     }
//   }
// `;

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

// export const SearchBusinessesCount = gql`
//   query SearchBusinessesCount($city: String!, $tag: String!) {
//     businesses_aggregate(
//       where: {
//         location: { city: { _eq: $city } }
//         _and: { tags: { _like: $tag } }
//       }
//     ) {
//       aggregate {
//         count
//       }
//     }
//   }
// `;

// export function buildSearchQueryCount({ locationType }) {
//   return gql`
//     query SearchBusinessesCount($location: String!, $tag: String!) {
//       businesses_aggregate(
//         where: {
//           location: { ${locationType}: { _eq: $location } }
//           _and: { tags: { _like: $tag } }
//         }
//       ) {
//         aggregate {
//           count
//         }
//       }
//     }
//   `;
// }

// export function buildSearchQuery({ locationType }) {
//   return gql`
//   query SearchBusinesses($location: String!, $tag: String!, $limit: Int $offset: Int) {
//   businesses(where: {location: {${locationType}: {_eq: $location}}, _and: {tags: {_like: $tag}}}, limit: $limit, offset: $offset, order_by: {name: asc}) {
//     id
//     name
//     average_rating
//     tags
//     category {
//       text
//     }
//     location {
//       address_1
//       address_2
//       city
//       state
//       zip
//     }
//     contacts {
//       contact_value
//       contact_type
//     }
//     claimed
//     created_at
//     description
//     verified
//   }
// }
// `;
// }

export const SEARCH_BUSINESSES_COUNT = gql`
  query SearchBusinessesCount($term: String!, $area: String!) {
    businesses_aggregate(
      where: {
        _or: [{ tags: { _ilike: $term } }, { name: { _ilike: $term } }]
        _and: {
          _or: [
            { location: { city: { _ilike: $area } } }
            { location: { state: { _ilike: $area } } }
          ]
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const SEARCH_BUSINESSES = gql`
  query SearchBusinesses($term: String!, $area: String!, $limit: Int, $offset: Int) {
    businesses(
      limit: $limit,
      offset: $offset,
      where: {
        _or: [{ tags: { _ilike: $term } }, { name: { _ilike: $term } }]
        _and: {
          _or: [
            { location: { city: { _ilike: $area } } }
            { location: { state: { _ilike: $area } } }
          ]
        }
      }
    ) {
      id
      name
      description
      tags
      average_rating
      claimed
      created_at
      verified
      updated_at
      location {
        address_1
        address_2
        city
        state
        zip
      }
      contacts {
        contact_type
        contact_value
      }
    }
  }
`;
