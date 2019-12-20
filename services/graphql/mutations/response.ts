import { gql } from "apollo-boost";

export const INSERT_RESPONSE = gql`
  mutation InsertResponse($objects: [responses_insert_input!]!) {
    insert_responses(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_RESPONSE = gql`
  mutation UpdateResponse($objects: reviews_set_input!, $id: Int!) {
    update_resposne(where: {id: {_eq: $id}}, _set: $objects) {
      returning {
        affected_rows
      }
    }
  }
`;

export const DELETE_RESPONSE = gql`
  mutation DeleteResponse($id: Int!) {
    delete_responses(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`;

export const LIKE_RESPONSE = gql`
  mutation InsertResponseLike($objects: [responses_likes_insert_input!]!) {
    insert_responses_likes(objects: $objects) {
      affected_rows
    }
  }
`;

export const UNLIKE_RESPONSE = gql`
mutation UnlikeResponse($userID: Int!, $responseID: Int!) {
  delete_responses_likes(where: {user_id: {_eq: $userID}, _and: {response_id: {_eq: $responseID}}}) {
    returning {
      id
    }
  }
}
`;