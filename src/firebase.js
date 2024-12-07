// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi_dJh9Nz5_j8VJhtHfaJPtmY5s9fsSHs",
  authDomain: "studious-e678d.firebaseapp.com",
  projectId: "studious-e678d",
  storageBucket: "studious-e678d.appspot.com",
  messagingSenderId: "709891272756",
  appId: "1:709891272756:web:be84186469ef61da555a61",
  measurementId: "G-SNVEP82WWQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);