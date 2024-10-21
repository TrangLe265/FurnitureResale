// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHADNCqJUult3eBzmTWJ-UsEsy2hWYCnA",
  authDomain: "marketplace-9ed64.firebaseapp.com",
  projectId: "marketplace-9ed64",
  storageBucket: "marketplace-9ed64.appspot.com",
  messagingSenderId: "965288640600",
  appId: "1:965288640600:web:9051c4062523c307c60a2d",
  measurementId: "G-WQGRTJC543"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);