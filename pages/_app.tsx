import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "../components/Layout/Layout";
import client from "../services/graphql/apollo";
import firebase from "../services/firebase/app";

export default class GoblaqApp extends App {
  componentDidMount() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        console.log("--> user auth state changed <--");
        console.log("logged in user: ", user);
      } else {
        console.log("--> no user found <--");
      }
    });
  }
  
  componentWillUnmount() {
    // firebase.doSignOut();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}
