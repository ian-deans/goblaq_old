import React from "react";
import Head from "next/head";
import { Container } from "semantic-ui-react";

export const Layout = props => {
  return (
    <React.Fragment>
      <Head>
        <title>Goblaq</title>
        {/* <link rel="icon" href="/static/favicon.ico" type="image/x-icon" /> */}
        <link rel="icon" href="/static/favicon_png.png" type="image/png" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      {props.children}
    </React.Fragment>
  );
};
