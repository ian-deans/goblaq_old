import React, { createContext } from "react";
import Head from "next/head";
import App from "next/app";
import { withRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "../components/Layout/Layout";
import { AppTheme } from "../components/Theme/Theme";
import client from "../services/graphql/apollo";
import firebase from "../services/firebase";
// import client from "../services/graphql/apollo";

import { UserProvider } from "../contexts/UserContext";

import { inProduction } from "../config";


const UserContext = createContext(null);

export default withRouter(
  class GoblaqApp extends App {

    state = {
      user: undefined,
    };

    componentDidMount() {
      const { router } = this.props;
      console.log("GoblaqApp props --> ", this.props);

      firebase.auth.onAuthStateChanged(user => {
        if (user) {
          console.log("--> user auth state changed <--");
          console.log("logged in user: ", user);
          this.setState({user});
        } else {
          console.log("--> no user found <--");
          this.setState({user: undefined});
          router.push("/")
        }
      });

      console.log(firebase.auth.currentUser);
    }

    componentWillUnmount() {
      // firebase.doSignOut();
    }

    render() {
      const { Component, pageProps } = this.props;
      const { user } = this.state;
      console.log('App Render -> ', user );
      
      return (
        <ApolloProvider client={client}>
          <Head>
            <title>Goblaq</title>
            <link rel="icon" href="/static/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            {/* <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          /> */}
          </Head>
          <AppTheme>
            <UserProvider value={user}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </AppTheme>
        </ApolloProvider>
      );
    }
  }
);
