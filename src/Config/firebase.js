import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

console.log("mp",process.env.REACT_APP_FIREBASE_API_KEY)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // AIzaSyDZqJ8zHAuAqA8888KfJ8Q82ubbuqNLcD8
    authDomain: "mpmodulo3.firebaseapp.com",
    projectId: "mpmodulo3",
    storageBucket: "mpmodulo3.appspot.com",
    messagingSenderId: "893685101076",
    appId: "1:893685101076:web:cdf410ebe2a122f4e26d01"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase;