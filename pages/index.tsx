import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { ErrorBoundary } from "../components/common/ErrorBoundary/ErrorBoundary";
import { Signup } from "../components/Auth/SignUp/Signup";

export default () => (
  <div>
    <div className="backdrop">
      <div className="red-side">
        <div className="logo-container">
          <Image alt="Goblaq" size="medium" src="/static/goblaq_logo_2.png" />
        </div>
        <div className="company-description">
          <span className="description-header">
          Goblaq is a community directory service and <br />
          crowd-sourced review forum that connects individuals
          with African American businesses and business owners.
          </span>
          <span className="social-links-container">
            <a href="https://www.facebook.com/goblaqapp/">
              <Icon inverted={true} name="facebook f" size="big" />
            </a>
            <a href="https://instagram.com/goblaqapp">
              <Icon inverted={true} name="instagram" size="big" />
            </a>
            <a href="https://twitter.com/goblaqapp">
              <Icon inverted={true} name="twitter" size="big" />
            </a>
            <a href="https://www.linkedin.com/company/goblaq/">
              <Icon inverted={true} name="linkedin" size="big" />
            </a>
          </span>
        </div>
      </div>
      <div className="white-side">
        <div className="form-container">
          <ErrorBoundary>
            <Signup />
          </ErrorBoundary>
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
        min-width: 370px;
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
        margin: 0 0 2em 0;
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
        margin: 0 0 2em 0;
      }

      .description-header {
        font-size: 20px;
      }

      @media only screen and (max-width: 975px) {
        .backdrop {
          flex-direction: column;
          height: auto;
        }

        .white-side,
        .red-side,
        .form-container {
          height: auto;
          width: 100%;
          padding: 1em;
        }

        .red-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 2em 1em;
          order: 1;
          font-size: ;
        }

        .description-header {
          font-size: 16px;
          text-align: left;
          margin-left: 1em;
        }

        .white-side {
          order: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
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
