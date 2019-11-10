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

  type User {
    username: String
    email: String
  }

  type appState {
    user: User
    place: String
    isDarkModeEnabled: Boolean
  }

  extend type Mutation {
    setUser
  }
`;

// export const resolvers = {
//   Mutation: {
//     setUser
//   }
// };

const getAppState = gql`
  query {
    state @client {
      appState {
        user
      }
    }
  }
`;

export const resolvers = (getState: any, writeState: any) => {
  return {
    Mutation: {
      updateAppState(_, appState) {
        // get current / initial state from cache
        const state = getState(getAppState);

        const newState = {
          ...state,
          appState: Object.assign({}, state.appState, appState),
        };

        writeState(newState);
        return newState;
      },
    },
  };
};
