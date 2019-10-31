import fetch from "isomorphic-unfetch";
import ApolloClient, { gql, InMemoryCache } from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

console.log(process.env.NODE_ENV)


const client = new ApolloClient( {
  uri: 'https://goblaq.herokuapp.com/v1/graphql',
  // connectToDevTools: true,
  fetch,
  cache,
  request: operation => {
    operation.setContext({
      headers: {
        "x-hasrua-user-id": sessionStorage.getItem("USER_FUID")
      }
    })
  },
} );

// window.__APOLLO_CLIENT__ = client;

export default client;
export { gql };