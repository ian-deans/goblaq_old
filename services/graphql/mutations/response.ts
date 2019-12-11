import { gql } from "apollo-boost";

export const INSERT_RESPONSE = gql`
  mutation InsertResponse($objects: [responses_insert_input!]!) {
    insert_responses(objects: $objects) {
      returning {
        affected_rows
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
        affected_rows
      }
    }
  }
`;