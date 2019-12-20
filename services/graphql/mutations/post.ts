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
    update_posts(where: { id: { _eq: $postID } }, _set: { active: false }) {
      returning {
        id
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation InsertPostLike($objects: [post_likes_insert_input!]!) {
    insert_post_likes(objects: $objects) {
      affected_rows
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation DeletePostLike($userID: Int!, $postID: Int!) {
    delete_post_likes(
      where: {
        user_id: { _eq: $userID }
        _and: { post_id: { _eq: $postID } }
      }
    ) {
      returning {
        id
      }
    }
  }
`;
