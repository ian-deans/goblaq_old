import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../../services/firebase";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_USER } from "~/services/graphql/queries";

const userContext = createContext({
  user: undefined,
  userObj: undefined,
  refetchUser: undefined,
});

export const useSession = () => {
  const { user } = useContext(userContext);
  return { user };
};

export const useRefetchUser = () => {
  const { refetchUser } = useContext(userContext);
  return { refetchUser };
};

const useAuth = () => {
  const [fetchUserFromHasura, fetchData] = useLazyQuery(GET_USER, {
    fetchPolicy: "no-cache",
  });

  // Initiate state for holding user data from firebase and hasura
  const [state, setState] = useState(() => {
    // use whatever user might already be logged in
    const { currentUser } = firebase.auth;
    return {
      initializing: !currentUser,
      user: {
        firebase: currentUser ? currentUser.toJSON() : currentUser,
        hasura: undefined,
      },
      userObj: currentUser,
      refetchUser: fetchData ? fetchData.refetch : undefined,
    };
  });

  // auth state change handler
  function onChange(user) {
    const USER_TOKEN = "userToken";
    if (user) {
      // a user has logged in
      user.getIdToken(true).then(token => {
        console.info("[AUTH] user found, setting JWT.");
        sessionStorage.setItem(USER_TOKEN, token); // JWT token

        const newState = { ...state };
        newState.user.firebase = user.toJSON();
        newState.userObj = user;
        newState.initializing = true;
        setState(newState);

        fetchUserFromHasura();
      });
    } else {
      // the user logged out
      console.info("[AUTH] user not found, removing JWT.");
      sessionStorage.removeItem(USER_TOKEN);

      // clear user data from state
      setState({
        initializing: false,
        user: { firebase: undefined, hasura: undefined },
        userObj: undefined,
        refetchUser: undefined,
      });
    }
  }

  function handleHasuraQuery(): void {
    const { called, loading, error, data, refetch } = fetchData;

    if (!called) {
      return;
    }

    const newState = { ...state };

    if (loading) {
      newState.initializing = true;
    } else {
      newState.initializing = false;
    }

    if (error) {
      console.error("Error while requesting user data from Hasura.");
      console.error(error);
    }

    if (data) {
      newState.user.hasura = data.users[0];
    }

    newState.refetchUser = refetch;

    setState(newState);
  }

  // watch state.user.firebase. on change handle hasura side effects
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    handleHasuraQuery();
  }, [fetchData]);

  return state;
};

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;

export const UserContext = ({ children }) => {
  const { initializing, user, userObj, refetchUser } = useAuth();

  // in the scenario where we want to refrain from rendering
  // children unless the user is loaded we could do something
  // like this:
  if (initializing) {
    console.info("[User] intializing...");
  }

  return (
    <UserProvider
      value={
        initializing
          ? { user: undefined, userObj: undefined, refetchUser: undefined }
          : { user, userObj, refetchUser }
      }
    >
      {children}
    </UserProvider>
  );
};
