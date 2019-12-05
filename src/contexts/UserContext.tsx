import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../../services/firebase";
// import apollo from "~/services/graphql/apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_USER } from "~/services/graphql/queries";
import { useApolloClient } from "@apollo/react-hooks";

const userContext = createContext({ user: undefined });

export const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};

// hook for... well, using auth
export const useAuth = () => {
  const client = useApolloClient();
  const [loadUser, { called, loading, data }] = useLazyQuery(GET_USER);
  const [state, setState] = useState(() => {
    const user = firebase.auth.currentUser;
    if (user) {
      loadUser({variables: { uid: user.uid}});
    }
    return {
      initializing: !user,
      user: user ? user.toJSON() : user,
    };
  });

  function onChange(user) {
    if (user) {
      // console.log("user attempting to login: ", user.toJSON());
      user.getIdToken(true).then(token => {
        sessionStorage.setItem("userToken", token); // JWT token
        //! Get user from hasura
        loadUser({variables: { uid: user.uid}});
        setState({ initializing: false, user: user.toJSON() });
        // client.writeData({ data: { firebaseUser: user.toJSON() } });
      });
    } else {
      console.log("--> no user found <--");
      sessionStorage.removeItem("userToken");
      setState({ initializing: false, user: undefined });
    }
  }

  useEffect(() => {
    // listen for auth state changes ( user logs in or out )
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange);

    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;

export const UserContext = ({ children }) => {
  const { initializing, user } = useAuth();

  console.log("User Init : ", initializing);

  // in the scenario where we want to refrain from rendering
  // children unless the user is loaded we could do something
  // like this:
  // if ( initializing ) {
  //   return <CircularProgress />
  // }

  return <UserProvider value={{ user }}>{children}</UserProvider>;
};
