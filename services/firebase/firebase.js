import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import { config } from "~/config/firebaseConfig";



class Firebase {
  constructor() {
    // prevent spinning up extra app instances
    !firebase.apps.length 
      ? firebase.initializeApp( config ) 
      : firebase.app()
    
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
    if ( process.browser ) {
      this.analytics = firebase.analytics();
    }

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  }

  doCreateUserWithEmailAndPassword = ({email, password}) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = () =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup( this.googleProvider );

  doSignInWithFacebook = () => this.auth.signInWithPopup( this.facebookProvider );

  doSignOut = () => this.auth.signOut();
}

export const app = new Firebase();
export const analytics = app.analytics;

// export default app;