import fetch from "isomorphic-unfetch";
import ApolloClient, { gql, InMemoryCache } from "apollo-boost";

console.log("ENV: ",process.env.NODE_ENV)

const cache = new InMemoryCache();

const client = new ApolloClient( {
  uri: 'https://goblaq.herokuapp.com/v1/graphql',
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


export default client;
export { gql };