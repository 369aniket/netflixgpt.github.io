// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaSABk_vxQsKZsNwfRop9i0UOoHJSYstI",
  authDomain: "netflixgpt-7ea85.firebaseapp.com",
  projectId: "netflixgpt-7ea85",
  storageBucket: "netflixgpt-7ea85.firebasestorage.app",
  messagingSenderId: "37185017376",
  appId: "1:37185017376:web:69cd17c4e4adeade1d4e45",
  measurementId: "G-CHPJ139P23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();