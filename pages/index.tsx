import React from "react";
import Head from "next/head";
import { Icon, Image } from "semantic-ui-react";
import { Signup } from "../components/Auth/SignUp/Signup";

export default () => (
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
        <div className="logo-container">
          <Image size="medium" src="/static/goblaq_logo.png" />
        </div>
        <div className="company-description">
          <span className="description-header">
            Goblaq is an online business directory and review forum for African
            Americans
          </span>
          <span className="description">
            Goblaq is an online business directory service and crowd-sourced
            review forum connecting subscribers with African American businesses
            and business owners.
          </span>
          <span className="social-links-container">
            <Icon inverted={true} name="facebook f" size="big" />
            <Icon inverted={true} name="instagram" size="big" />
            <Icon inverted={true} name="twitter" size="big" />
            <Icon inverted={true} name="linkedin" size="big" />
          </span>
        </div>
      </div>
      <div className="white-side">
        <div className="form-container">
          <Signup />
        </div>
      </div>
    </div>
    <style jsx={true}>{`
      @import url("https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap");
      @import url("https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap");

      .backdrop {
        height: 100vh;
        width: 100vw;
        background-color: red;
        display: flex;
      }
      .red-side,
      .white-side {
        width: 50%;
        height: 100vh;
      }
      .white-side {
        background-color: #fff;
        overflow-y: scroll;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-areas:
          "top"
          "form"
          "bottom";
        grid-gap: 2em;
        justify-content: stretch;
        align-content: stretch;

        padding: 0 2em;
      }
      .form-container {
        background-color: #fff;
        grid-area: form;
        justify-content: center;
        align-items: center;
      }

      .red-side {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 2fr 2fr 1fr;
        grid-template-areas:
          "logo"
          "text"
          "footer";
        grid-gap: 2em;
        justify-content: stretch;
        align-content: stretch;
        padding: 0 2em;
      }
      .logo-container {
        grid-area: logo;
        display: flex;
        align-items: flex-end;
      }

      .company-description {
        grid-area: text;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .description-header,
      .description {
        color: #fff;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        line-height: 1.5em;
        letter-spacing: 4px;
      }

      .description-header {
        font-size: 30px;
      }

      @media only screen and (max-width: 975px) {
        .backdrop {
          flex-direction: column;
          height: auto;
        }

        .white-side, .red-side {
          height: auto;
          width: 100%;
        }

        .white-side {
          order: 2;
          align-items: flex-start;
          grid-template-rows: 4fr 1fr;
          grid-template-areas:
            "form"
            "bottom";
          padding: 2em 1em;
        }

        .red-side {
          order: 1;
          padding: 2em 1em;
        }
      }

      @media only screen and (max-width: 600px) {
        .red-side {
          grid-template-rows: auto 2fr 1fr;
        }
      }
    `}</style>
    <script src="https://www.google.com/recaptcha/api.js" />
  </div>
);
