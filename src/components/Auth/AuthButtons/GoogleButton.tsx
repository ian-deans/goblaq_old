import React from "react";
import firebase from "~/services/firebase";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { Button, Form } from "semantic-ui-react";

export const GoogleButton = ({disabled}) => {
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signIn();
  };
  return (
    <Button disabled={disabled} onClick={handleSubmit} variant="contained" color="primary">
      Google
    </Button>
  );
};


function signIn() {
  firebase
  .doSignInWithGoogle()
  .then(socialAuthUser => console.log(socialAuthUser));
}