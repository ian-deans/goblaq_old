import React, { createContext } from "react";
import Head from "next/head";
import App from "next/app";
import { withRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "../components/Layout/Layout";
import { AppTheme } from "../components/Theme/Theme";
import CssBaseline from "@material-ui/core/CssBaseline";
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
      firebase.auth.onAuthStateChanged(user => {
        if (user) {
          console.log("logged in user: ", user);
          this.setState({ user });
        } else {
          console.log("--> no user found <--");
          this.setState({ user: undefined });
          router.push("/");
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
      console.log("App Render -> ", user);

      return (
        <React.Fragment>
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
              href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            /> */}
            {/* <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            /> */}
            {/* <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          /> */}
          </Head>
          <ApolloProvider client={client}>
            <UserProvider value={user}>
              <AppTheme>
                <Layout>
                  <CssBaseline />
                  <Component {...pageProps} />
                </Layout>
              </AppTheme>
            </UserProvider>
          </ApolloProvider>
        </React.Fragment>
      );
    }
  }
);
