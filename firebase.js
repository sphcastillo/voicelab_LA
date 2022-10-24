import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCtM37O204eM9_kJxj2b_sTZ-e6jEOl0bk",
    authDomain: "voicelab-la.firebaseapp.com",
    projectId: "voicelab-la",
    storageBucket: "voicelab-la.appspot.com",
    messagingSenderId: "157093903098",
    appId: "1:157093903098:web:223e6c3819bf0b8e2a2743"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };