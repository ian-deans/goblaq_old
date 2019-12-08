import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import gql from "graphql-tag";
import firebase from "~/services/firebase";
import { graphqlURL } from "../../config";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  type appState {
    test: String!
  }

`;

const cache = new InMemoryCache();

const request = async operation => {

  const headers = operation.getContext().headers;
    const token = await sessionStorage.getItem("userToken");
    console.info("[Apollo Request] Checking for user token...");
    if ( token !== null ) {
      console.info( "[Apollo Request] User token found. Setting graphql authorization headers...");
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
          ...headers
        },
      });
      console.info("[Apollo Request] ...done.");
    } else {
      console.info("[Apollo Request] No user logged in.");
    }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.error("[Apollo Request] Send errors to logging service here");
        console.error(graphQLErrors);
        // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        console.info("[Network Error]: signing user out");
        firebase.doSignOut();
      }
    }),
    requestLink,
    new HttpLink({
      uri: graphqlURL,
      fetch,
    }),
  ]),
  cache,
  typeDefs,
  ssrMode: true,
});

export default client;
