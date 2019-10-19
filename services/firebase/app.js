import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
  messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// prevent spinning up extra app instances
// export default !firebase.apps.length ? firebase.initializeApp( config ) : firebase.app();


class Firebase {
  constructor() {
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