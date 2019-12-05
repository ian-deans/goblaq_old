import React from "react";
import firebase from "~/services/firebase";
import Button from "@material-ui/core/Button";

export const FacebookButton = ({disabled}) => {
  const handleSubmit = (event:  React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signIn();
  };
  return (
    <Button disabled={disabled} onClick={handleSubmit} variant="contained" style={{backgroundColor: "#3b5998", color: "#f7f7f7"}}>
      Facebook
    </Button>
  )
};

function signIn() {
  firebase
    .doSignInWithFacebook()
    .then(() => firebase.analytics.logEvent("login", firebase.auth.currentUser));
}