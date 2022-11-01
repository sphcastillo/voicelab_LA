
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
  apiKey: "AIzaSyD61nC6omOiMWIeyPSIUwyJ3Q3HePmjH2I",
  authDomain: "voicelab-la-3a29d.firebaseapp.com",
  projectId: "voicelab-la-3a29d",
  storageBucket: "voicelab-la-3a29d.appspot.com",
  messagingSenderId: "746927898780",
  appId: "1:746927898780:web:a365890f8e0b9004e4ed59",
  measurementId: "G-3ETR90J9CR"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};