import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Load the .env firebase file from the global folder

const firebaseConfig = {
  apiKey: "AIzaSyDNJwpmHi-05KSaW5l2FlQmShjroIeLRF4",
  authDomain: "ultimate-dares.firebaseapp.com",
  databaseURL: "https://ultimate-dares-default-rtdb.firebaseio.com",
  projectId: "ultimate-dares",
  storageBucket: "ultimate-dares.appspot.com",
  messagingSenderId: "538463798937",
  appId: "1:538463798937:web:0944e35c9b1d55a8665a08"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp( firebaseConfig ) : getApp()

export const database = getDatabase(app);
