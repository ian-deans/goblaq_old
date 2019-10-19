import React from "react";
import firebase from "../../services/firebase/app";
import { Button, Form } from "semantic-ui-react";

export const GoogleButton = () => {
  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => console.log(socialAuthUser));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Button color="google plus"  icon="google" content="Google"/>
    </Form>
  );
};
