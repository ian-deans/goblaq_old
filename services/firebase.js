import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = ({email, password}) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = () =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup( this.googleProvider );

  doSignOut = () => this.auth.signOut();
}

const app = new Firebase();

export default app;