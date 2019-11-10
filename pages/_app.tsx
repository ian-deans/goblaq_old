import React from "react";
import App from "next/app";
import client from "../services/graphql/apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import firebase from "../services/firebase";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppTheme } from "../src/components/Theme/Theme";
import { Layout } from "../src/components/Layout/Layout";
import { inProduction } from "../config";
import { UserProvider } from "../contexts/UserContext";
import { withRouter } from "next/router";

const protectedPages = ["/profile", "/forum"];

export default withRouter(
  class GoblaqApp extends App {
    props: any;

    state = {
      user: undefined,
    };

    componentDidMount() {
      // this.clearServerStyles();
      firebase.auth.onAuthStateChanged(this.handleUser);
      const msgFn = msg => console.log("Router event stuff :: ", msg);
      this.props.router.events.on("routeChangeStart", msgFn);
    }

    componentWillUnmount() {
      // firebase.doSignOut();
    }

    clearServerStyles = () => {
      const jssStyles = document.querySelector("#jss-server-side");
      console.log("server styles ", jssStyles);
      if (jssStyles) {
        console.log("Removing jssStyles");
        console.log(jssStyles);
        jssStyles.parentElement.removeChild(jssStyles);
      }
    };

    handleUser = user => {
      if (user) {
        console.log("user attempting to login: ", user.toJSON());
        user
          .getIdToken(true)
          .then(token => sessionStorage.setItem("userToken", token));
        this.setState({ user });
        // client.writeData({data:{ user: user }});
      } else {
        console.log("--> no user found <--");
        sessionStorage.removeItem("userToken")
        this.setState({ user: undefined });
        this.props.router.push("/");
      }
    };

    render() {
      const { Component, pageProps } = this.props;
      const { user } = this.state;
      console.log("App Render -> ", user && user.toJSON());

      return (
        <div>
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
        </div>
      );
    }
  }
);
