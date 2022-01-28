// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEdtHqH3BT6-th-wFHb7pMG9ECS3UZ5XI",
  authDomain: "svelte-boilerplate.firebaseapp.com",
  projectId: "svelte-boilerplate",
  storageBucket: "svelte-boilerplate.appspot.com",
  messagingSenderId: "882116972846",
  appId: "1:882116972846:web:891411c56811ad7ee26abf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore();
connectFirestoreEmulator(database, "localhost", 8079);
