import React from "react";
import { UserConsumer } from "~/contexts/UserContext";
import { MustBeLoggedInMessage } from "~/components/common/Messages/MustBeLoggedIn";

interface Props {
  // component: React.ReactElement;
  component: any;
}

export const UserConditional = ({ children }) => {
  return (
    <UserConsumer>
      {({ user }) =>
        user && user.hasura ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <MustBeLoggedInMessage />
        )
      }
    </UserConsumer>
  );
};
