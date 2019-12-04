import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import gql from "graphql-tag";
import firebase from "~/services/firebase";
import { graphqlURL } from "../../config";

// import { withClientState } from "apollo-link-state";
// import { resolvers, typeDefs } from "./resolvers";
// import firebase from "../firebase";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  type appState {
    test: String!
  }

`;

const cache = new InMemoryCache({
  // cacheRedirects: {
  //   Query: {
  //     movie: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: "Movie", id }),
  //   },
  // },
})
// .restore(window.__APOLLO_STATE__);

const request = async operation => {

    const token = await sessionStorage.getItem("userToken");
    console.log("[Apollo Request] Checking for user token...");
    if ( token !== null ) {
      console.log( "[Apollo Request] User token found. Setting graphql authorization headers...");
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      console.log("[Apollo Request] ...done.");
      // console.groupEnd();
    } else {
      console.log("[Apollo Request] No user logged in.");
      // console.groupEnd();
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
        console.log("[Network Error]: signing user out");
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

// const headers = () => {
//   const headers = {};
//   if (process.browser) {
//     headers["Authorization"] = "Bearer " + sessionStorage.getItem("userToken");
//   }

//   return headers;
// };

// interface IState {
//   user: any;
//   place: string;
//   isDarkModeEnabled: boolean;
// }

// interface IRoot {
//   state: any;
// }

// Helper function to get data from the cache
// const getState = (query: any): IState => {
//   return cache.readQuery<IRoot>({ query }).state;
// };

// Helper function to write data back to the cache
// const writeState = (state: IState) => {
//   return cache.writeData({ data: { state } });
// };

// initial apollo local state
// const initState = () => {
//   const state = {
//     appState: defaultAppState,
//     __typename: "State",
//   };

//   writeState(state);
// };

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       }
//       if (networkError) {
//         console.log(`[Network error]: ${networkError}`);
//       }
//     }),
//     new HttpLink({
//       uri: "https://goblaq.herokuapp.com/v1/graphql",
//       credentials: "same-origin",
//     }),
//   ]),
//   cache,
//   fetch,
//   headers: headers(),
//   clientState: {
//     defaults: {},
//     resolvers: resolvers(getState, writeState),
//     typeDefs,
//   },
// });

// export default client;
