import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";

import { onError } from "apollo-link-error";
import gql from "graphql-tag";
import firebase from "~/services/firebase";
import { graphqlURL } from "../../config";

import ws from "ws";

const WS_PATH = "wss://goblaq.herokuapp.com/v1/graphql";

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
  // console.info("[Apollo Request] Checking for user token...");
  if (token !== null) {
    console.info(
      // "[Apollo Request] User token found. Setting graphql authorization headers..."
    );
    operation.setContext({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    });
    // console.info("[Apollo Request] ...done.");
  } else {
    // console.info("[Apollo Request] No user logged in.");
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

const httpLink = new HttpLink({
  uri: graphqlURL,
  fetch,
});

// Make sure the wsLink is only created on the browser. The server doesn't have a native implemention for websockets
const wsLink = process.browser
  ? new WebSocketLink(new SubscriptionClient(WS_PATH, { reconnect: true }))
  : new WebSocketLink(new SubscriptionClient(WS_PATH, { reconnect: true }, ws));

interface Definintion {
  kind: string;
  operation?: string;
}

// Let Apollo figure out if the request is over ws or http
const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return (
      kind === "OperationDefinition" &&
      operation === "subscription" &&
      process.browser
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.error("[Apollo Request] Send errors to logging service here");
        console.error(graphQLErrors);
        // console.info("[Apollo Request] Refresh Token Here");
        //TODO: refresh jwt here
        // if(process.browser) {
        //   window.location.reload();
        // }
        //TODO: sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        console.info("[Network Error]: signing user out");
        console.error(networkError);
        firebase.doSignOut();
      }
    }),
    requestLink,

    terminatingLink,
  ]),
  cache,
  typeDefs,
  ssrMode: true,
});

export default client;
