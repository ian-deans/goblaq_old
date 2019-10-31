import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    # cartItems: [ID!]!
  }

  type User {
    isLoggedIn: Boolean!
  }

  # extend type Launch {
  #   isInCart: Boolean!
  # }

  extend type Mutation {
    # addOrRemoveFromCart(id: ID!): [Launch]
    setOrUnsetUser(user: USER!): [User]
  }
`;

export const resolvers = {};