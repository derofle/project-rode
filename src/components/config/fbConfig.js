import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBYy6UscG8K_fsmGFlu1XvpbOQky52D9JQ",
    authDomain: "project-rode.firebaseapp.com",
    databaseURL: "https://project-rode.firebaseio.com",
    projectId: "project-rode",
    storageBucket: "project-rode.appspot.com",
    messagingSenderId: "143890343432"
  };

firebase.initializeApp(config);
export const db = firebase.firestore();
