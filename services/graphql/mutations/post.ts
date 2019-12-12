import { gql } from "apollo-boost";

export const INSERT_POST = gql`
mutation InsertPost($objects: [posts_insert_input!]!) {
  __typename
  insert_posts(objects: $objects) {
    returning {
      created_at
      content
      id
      title
      user {
        avatar_url
        username
      }
    }
  }
}
`;

export const DEACTIVATE_POST = gql`
  mutation DeactivatePost($postID: Int!) {
    update_posts(where: {id: {_eq: $postID}}, _set: {active: false}) {
      returning {
        affected_rows
      }
    }
  }
`;