import fetch from "node-fetch";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient( {
  uri: 'https://48p1r2roz4.sse.codesandbox.io', fetch: fetch,
} );

export default client;
export { gql };

