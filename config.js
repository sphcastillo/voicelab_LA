
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtM37O204eM9_kJxj2b_sTZ-e6jEOl0bk",
  authDomain: "voicelab-la.firebaseapp.com",
  projectId: "voicelab-la",
  storageBucket: "voicelab-la.appspot.com",
  messagingSenderId: "157093903098",
  appId: "1:157093903098:web:223e6c3819bf0b8e2a2743"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};