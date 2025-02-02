import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, collection, onSnapshot } from "firebase/firestore"; // Changed imports
import { onAuthStateChanged } from "firebase/auth";
import DbContext from "./DbContext";

const DbContextProvider = ({ children }) => {
  const [dbData, setDbData] = useState(null);
  const [dbPresent, setDbPresent] = useState(false);
  const [d, setD] = useState([]);

  useEffect(() => {
    let userUnsubscribe = null;
    let usersUnsubscribe = null;

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      // Real-time listener for users collection
      try {
        usersUnsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setD(docs);
        });
      } catch (error) {
        console.error("Error listening to users collection:", error);
      }

      if (user) {
        try {
          const userDoc = doc(db, "users", user.email.split("@")[0]);

          // Real-time listener for user document
          userUnsubscribe = onSnapshot(userDoc, (docSnap) => {
            if (docSnap.exists()) {
              setDbData(docSnap.data());
              setDbPresent(true);
            } else {
              console.warn("User document not found in Firestore.");
              setDbData(null);
              setDbPresent(false);
            }
          });
        } catch (err) {
          console.error("Error setting up user listener:", err);
        }
      } else {
        setDbData(null);
        setDbPresent(false);
      }
    });

    // Cleanup function
    return () => {
      authUnsubscribe();
      userUnsubscribe?.();
      usersUnsubscribe?.();
    };
  }, [db]);

  return (
    <DbContext.Provider value={{ dbData, setDbData, dbPresent, d }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbContextProvider;
