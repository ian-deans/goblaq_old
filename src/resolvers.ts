import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    location: Object
    place: String
  }

  type Location {
    long: String
    lat: String
  }


  extend type Mutation {
    setOrClearPlace: String
  }
`;

export const resolvers = {};
