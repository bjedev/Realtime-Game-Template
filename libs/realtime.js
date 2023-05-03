import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Load the .env firebase file from the global folder

const firebaseConfig = {
  apiKey: "AIzaSyBn8nH3yD7tHrUd6baYjvFGme5TvVWulJE",
  authDomain: "bamkit-app.firebaseapp.com",
  projectId: "bamkit-app",
  storageBucket: "bamkit-app.appspot.com",
  messagingSenderId: "995320409870",
  appId: "1:995320409870:web:ddea3f2a45d1daa24a715f",
  measurementId: "G-JVBW9S39YK"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp( firebaseConfig ) : getApp()

export const database = getDatabase(app);
