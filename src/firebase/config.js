import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDTnqsUwRUNBDWf3DwJfzc9u2lROo1oAMg",
  authDomain: "react-firebase-app-b316e.firebaseapp.com",
  projectId: "react-firebase-app-b316e",
  storageBucket: "react-firebase-app-b316e.firebasestorage.app",
  messagingSenderId: "141117513148",
  appId: "1:141117513148:web:ca2b7e29ef71e80458dfb9",
  measurementId: "G-4JQ95JPQ96"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);
export const storage = getStorage(FirebaseApp);
export const database = getDatabase(FirebaseApp)