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

// import { geocodingClient } from "../services/mapbox/mapbox";

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
          <UserContext>
            <LocationContext>
              <AppTheme>
                <Layout>
                  <CssBaseline />
                  <Component {...pageProps} />
                </Layout>
              </AppTheme>
            </LocationContext>
          </UserContext>
        </ApolloProvider>
      </div>
    );
    
  }
}
