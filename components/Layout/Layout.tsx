import React from "react";
import Head from "next/head";
// import { Container } from "semantic-ui-react";

export const Layout = props => {
  return (
    <React.Fragment>
      <Head>
        <title>Goblaq</title>
        <meta
          name="Description"
          content="A community directory service and crowd-sourced review forum that connects individuals with African American businesses and business owners."
        />
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
