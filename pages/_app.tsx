import React from "react";
import App from "next/app";
import client from "../services/graphql/apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
// import firebase from "../services/firebase";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppTheme } from "../src/components/Theme/Theme";
import { Layout } from "../src/components/Layout/Layout";
import { UserContext } from "../src/contexts/UserContext";
import { withRouter } from "next/router";
import { inProduction } from "../config";

// const protectedPages = ["/profile", "/forum"];

export default 
// withRouter(
  class GoblaqApp extends App {
    props: any;

    componentDidMount() {
      // this.clearServerStyles();
      const msgFn = msg => console.log("Router event stuff :: ", msg);
      // this.props.router.events.on("routeChangeStart", msgFn);
    }

    componentWillUnmount() {
      // firebase.doSignOut();
    }

    // clearServerStyles = () => {
    //   const jssStyles = document.querySelector("#jss-server-side");
    //   if (jssStyles) {
    //     console.log("Removing jssStyles");
    //     console.log(jssStyles);
    //     jssStyles.parentElement.removeChild(jssStyles);
    //   }
    // }

    handleRouteChangeStart = (event) => {
      console.log("[Router Event] Route Change Started");
      console.log(event);
    }


    render() {
      const { Component, pageProps } = this.props;
      return (
        <div>
          <Head>
            <title>Goblaq</title>
          </Head>
          <ApolloProvider client={client}>
            <UserContext>
              <AppTheme>
                <Layout>
                  <CssBaseline />
                  <Component {...pageProps} />
                </Layout>
              </AppTheme>
            </UserContext>
          </ApolloProvider>
        </div>
      );
    }
  }
// );
