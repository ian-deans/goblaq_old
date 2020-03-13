import { gql } from "apollo-boost";

export const INSERT_REVIEW = gql`
mutation InsertReview($objects: [reviews_insert_input!]!) {
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
