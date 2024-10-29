// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHADNCqJUult3eBzmTWJ-UsEsy2hWYCnA",
  authDomain: "marketplace-9ed64.firebaseapp.com",
  databaseURL: "https://marketplace-9ed64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "marketplace-9ed64",
  storageBucket: "marketplace-9ed64.appspot.com",
  messagingSenderId: "965288640600",
  appId: "1:965288640600:web:9051c4062523c307c60a2d",
  measurementId: "G-WQGRTJC543"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };

