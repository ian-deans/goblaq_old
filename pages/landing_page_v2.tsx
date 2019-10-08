import React from "react";
import Head from "next/head";
import { Signup } from "../components/Auth/SignUp/Signup";

const Home = () => (
  <div>
    <Head>
      <title>Goblaq</title>
      <link rel="icon" href="/static/favicon.ico" />
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />
    </Head>

    <div className="backdrop">
      <div className="red-side">
        GoBlaq Logo
        mission statement and stuff
      </div>
      <div className="white-side">
        <Signup />
      </div>
    </div>
    <style jsx={true}>{`
      .backdrop {
        height: 100vh;
        width: 100vw;
        background-color: red;
        display: flex;
        justify-content: space-evenly;
        align-content: stretch;
      }
      .red-side, .white-side {
        width: 50%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .white-side {
        background-color: #fff;
        overflow-y: scroll;
      }
      .form-container {
        background-color: #fff;
        padding-top: 10em;
      }
    `}</style>
    <script src="https://www.google.com/recaptcha/api.js" />
  </div>
);

export default Home;
