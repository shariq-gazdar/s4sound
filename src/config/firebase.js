import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_2C3FG9G3Sj1-HwEGd3FTZMl0HYBdYRg",
  authDomain: "s4sound.firebaseapp.com",
  projectId: "s4sound",
  storageBucket: "s4sound.firebasestorage.app",
  messagingSenderId: "1064960127799",
  appId: "1:1064960127799:web:fa920bc29d8ad3d2f4e0b2",
  measurementId: "G-EENMT1P622",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
