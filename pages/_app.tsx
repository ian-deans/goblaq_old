import React from "react";
import Head from "next/head";
import App from "next/app";
import { withRouter } from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "../src/components/Layout/Layout";
import { AppTheme } from "../src/components/Theme/Theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import client from "../services/graphql/apollo";
import firebase from "../services/firebase";

import { UserProvider } from "../contexts/UserContext";

import { inProduction } from "../config";

export default withRouter(
  class GoblaqApp extends App {

    props: any;

    state = {
      user: undefined,
    };

    componentDidMount() {
      this.clearServerStyles();
      firebase.auth.onAuthStateChanged(this.handleUser);
    }

    componentWillUnmount() {
      // firebase.doSignOut();
    }

    clearServerStyles = () => {
      const jssStyles = document.querySelector("#jss-server-side");
      console.log('server styles ', jssStyles)
      if (jssStyles) {
        console.log("Removing jssStyles")
        console.log(jssStyles)
        // jssStyles.parentElement.removeChild(jssStyles);
      }
    }

    handleUser = user => {
      if (user) {
        console.log("logged in user: ", user);
        this.setState({ user });
      } else {
        console.log("--> no user found <--");
        this.setState({ user: undefined });
      }
    }


    // static async getInitialProps({ Component, ctx }) {
    //   let pageProps = {};
    //   if (Component.getInitialProps) {
    //     pageProps = await Component.getInitialProps(ctx);
    //   }
    //   return { pageProps };
    // }

    render() {
      const { Component, pageProps } = this.props;
      const { user } = this.state;
      console.log("App Render -> ", user);

      return (
        <React.Fragment>
          <Head>
            <title>Goblaq</title>
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
