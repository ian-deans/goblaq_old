import React from "react";
import App from "next/app";
import client from "../services/graphql/apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppTheme } from "../src/components/common/Theme/Theme";
import { Layout } from "../src/components/common/Layout/Layout";
import { UserContext } from "../src/contexts/UserContext";
import { LocationContext } from "../src/contexts/LocationContext";
import { SearchQueryContext } from "../src/contexts/SearchQueryContext";
import { ErrorBoundary } from "../src/components/common/ErrorBoundary/ErrorBoundary";

import '../stylesheets/main.scss';

export default // withRouter(
class GoblaqApp extends App {
  props: any;

  componentDidMount() {
    // const msgFn = msg => console.log("Router event stuff :: ", msg);
  }

  componentWillUnmount() {
    // firebase.doSignOut();
  }

  // handleRouteChangeStart = event => {
  //   console.log("[Router Event] Route Change Started");
  //   console.log(event);
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>Goblaq</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"></link>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
        </Head>
        <ApolloProvider client={client}>
          <Contexts>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
          </Contexts>
        </ApolloProvider>
      </div>
    );
  }
}

function Contexts({ children }) {
  return (
    <UserContext>
      <LocationContext>
        <SearchQueryContext>{children}</SearchQueryContext>
      </LocationContext>
    </UserContext>
  );
}

function Styles({ children }) {
  return (
    <AppTheme>
      <Layout>
        <CssBaseline />
        {children}
      </Layout>
    </AppTheme>
  );
}
