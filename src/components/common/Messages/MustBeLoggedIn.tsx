import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { FacebookButton } from "~/components/common/Auth/AuthButtons/FacebookButton";
import { GoogleButton } from "~/components/common/Auth/AuthButtons/GoogleButton";

export const MustBeLoggedInMessage = () => {
  return (
    <Container>
      <Typography style={{ margin: "2em 0" }}>
        You must be logged in to view this content. Click a button below to begin!
    </Typography>
      <FacebookButton />
      <GoogleButton />
    </Container>
  );
};