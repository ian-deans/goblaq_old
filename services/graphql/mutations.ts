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
