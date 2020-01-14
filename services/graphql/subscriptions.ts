import gql from "graphql-tag";

export const SUBSCRIBE_TO_BUSINESS_RATING = gql`
  subscription SubscribeToBusinessRating($id: Int!) {
    businesses(where: { id: { _eq: $id } }) {
      average_rating
    }
  }
`;


export const SUBSCRIBE_TO_POST = gql`
  subscription GetPostsWithResponses($postID: Int!) {
    posts(where: { id: { _eq: $postID } }) {
      post_likes_aggregate {
        aggregate {
          count
        }
      }
      responses(order_by: { created_at: asc }) {
        content
        created_at
        id
        parent_id
        post_id
        updated_at
        user {
          avatar_url
          username
        }
        responses_likes_aggregate {
          aggregate {
            count
          }
        }
      }
      content
      created_at
      id
      title
      updated_at
      user {
        avatar_url
        username
      }
    }
  }
`;
