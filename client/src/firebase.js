// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "final-sp2.firebaseapp.com",
  projectId: "final-sp2",
  storageBucket: "final-sp2.firebasestorage.app",
  messagingSenderId: "387547984387",
  appId: "1:387547984387:web:6afcc6800439de7be8d436"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);