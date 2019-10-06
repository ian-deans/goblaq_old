import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAC24_85_k0qqUJVsoYgK1kLpjQ6gGXN5Q",
  authDomain: "goblaq-b07dc.firebaseapp.com",
  databaseURL: "https://goblaq-b07dc.firebaseio.com",
  projectId: "goblaq-b07dc",
  storageBucket: "goblaq-b07dc.appspot.com",
  messagingSenderId: "331521719667",
  appId: "1:331521719667:web:442a7b5ed3d80311a11906",
  measurementId: "G-EJZ4Q8EG8F"
};


export default !firebase.apps.length ? firebase.initializeApp( config ) : firebase.app();