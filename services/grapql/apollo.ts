import fetch from "node-fetch";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient( {
  uri: 'https://goblaq.herokuapp.com/v1/graphql', fetch: fetch,
} );

export default client;
export { gql };