import fetch from "isomorphic-unfetch";
import ApolloClient, { gql, InMemoryCache } from "apollo-boost";
import { resolvers, typeDefs } from "../../src/resolvers"



const client = new ApolloClient( {
  cache: new InMemoryCache(),
  uri: 'https://goblaq.herokuapp.com/v1/graphql', fetch: fetch,
  headers: {
    // authorization: sessionStorage.getItem("userToken")
  },
  clientState: {
    defaults: {},
    resolvers,
    typeDefs,
  },
});

export default client;
// export { gql };