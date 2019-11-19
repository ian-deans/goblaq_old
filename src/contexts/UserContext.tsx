import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../../services/firebase";

const userContext = createContext({user: undefined});


export const useSession = () => {
  const {user} = useContext(userContext);
  return user;
};

// hook for... well, using auth
export const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth.currentUser;

    // if (user) {
    //   return user.getIdToken(true)
    //     .then(token => {
    //       sessionStorage.setItem("userToken", token);
    //       return { initializing: !user, user };
    //     });
    // }

    return {
      initializing: !user,
      user,
    };
  });

  function onChange(user) {
    if (user) {
      console.log("user attempting to login: ", user.toJSON());
      user
        .getIdToken(true)
        .then(token => {
          sessionStorage.setItem("userToken", token); // JWT token
          setState({initializing: false, user});
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
// export const UserContext = createContext({});

export const UserContext = ({children}) => {
  const { initializing, user } = useAuth();

  console.log("User Init : ", initializing)

  // in the scenario where we want to refrain from rendering
  // children unless the user is loaded we could do something
  // like this:
  // if ( initializing ) {
  //   return <CircularProgress />
  // }

  return (
    <UserProvider value={{user}}>
    {children}
  </UserProvider>
)
}