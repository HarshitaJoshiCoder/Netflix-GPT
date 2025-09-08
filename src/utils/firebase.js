// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYGaA8DxKFoA8an2ut6iZqTkv9Xf6Hp4w",
  authDomain: "netflixgpt-7c7c5.firebaseapp.com",
  projectId: "netflixgpt-7c7c5",
  storageBucket: "netflixgpt-7c7c5.firebasestorage.app",
  messagingSenderId: "821580804702",
  appId: "1:821580804702:web:eeb2057f8f4682b323facf",
  measurementId: "G-8Q9SSE3N72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();