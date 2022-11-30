// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAXpUl7nqCKVdPVzAd47OuQrWxjoQcoOI",
  authDomain: "crud-firebase-2595f.firebaseapp.com",
  projectId: "crud-firebase-2595f",
  storageBucket: "crud-firebase-2595f.appspot.com",
  messagingSenderId: "449193105593",
  appId: "1:449193105593:web:481253b9a6dee2b4e0e368",
  measurementId: "G-XB8ZK67MVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}