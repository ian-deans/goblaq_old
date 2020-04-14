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
        </Head>
        <ApolloProvider client={client}>
          <Contexts>
            <Styles>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Styles>
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
