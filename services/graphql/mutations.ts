import { gql } from "apollo-boost";

export const ADD_EARLY_SIGNUP = gql`
  mutation insert_early_signups($objects: [early_signups_insert_input!]!) {
    insert_early_signups(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_BUSINESS = gql`
  mutation MyMutation($objects: [businesses_insert_input!]!) {
    insert_businesses(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const POST_REVIEW = gql`
  mutation MyMutation($objects: [reviews_insert_input!]!) {
    insert_reviews(objects: $objects) {
      affected_rows
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($objects: reviews_set_input!, $id: Int!) {
    update_reviews(where: { id: { _eq: $id } }, _set: $objects) {
      returning {
        rating
        description
        id
        title
        updated_at
        created_at
        user_id
      }
    }
  }
`;
