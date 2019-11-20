import React from "react";
import { GoogleButton } from "../src/components/Auth/AuthButtons/GoogleButton";
import { FacebookButton } from "../src/components/Auth/AuthButtons/FacebookButton";
import { UserConsumer } from "../src/contexts/UserContext";

export default props => {
  const inProduction = process.env.NODE_ENV === "production";

  return (
    <div>
      <UserConsumer>
        {({ user }) =>
          user ? (
            <span>You are signed in.</span>
          ) : (
            <React.Fragment>
              <GoogleButton disabled={false} />
              <FacebookButton disabled={false} />
            </React.Fragment>
          )
        }
      </UserConsumer>
    </div>
  );
};
