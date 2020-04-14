import React from "react";
import firebase from "~/services/firebase";
import Button from "@material-ui/core/Button";

interface Props {
  disabled?: boolean;
}

export const GoogleButton: React.SFC<Props> = ({disabled}) => {
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