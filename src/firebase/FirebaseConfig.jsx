// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS0sR7bJGpL_z8LioWOgnzi4B5S4c9Ap4",
  authDomain: "react-firebase-f13c6.firebaseapp.com",
  projectId: "react-firebase-f13c6",
  storageBucket: "react-firebase-f13c6.appspot.com",
  messagingSenderId: "653742506011",
  appId: "1:653742506011:web:a2b3298e00a09a7bd5f8be",
  measurementId: "G-R5L9HCL9BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {app,fireDb,auth,storage}