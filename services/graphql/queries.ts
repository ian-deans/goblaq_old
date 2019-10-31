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
  query business_categories {
    businesses {
        id
        name
    }
}
`;