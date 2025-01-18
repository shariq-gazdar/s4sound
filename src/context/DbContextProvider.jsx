import React, { useState, useEffect, useMemo } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DbContext from "./DbContext";

const DbContextProvider = ({ children }) => {
  const [dbData, setDbData] = useState(null);
  const [dbPresent, setDbPresent] = useState(false);

  useMemo(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch the specific user's document using their email prefix
          const userDoc = doc(db, "users", user.email.split("@")[0]);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            setDbData(docSnap.data());
            setDbPresent(true); // Set to true if the document exists in Firestore
          } else {
            console.warn("User document not found in Firestore.");
            setDbData(null); // Set to null if the document doesn't exist
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        // Clear dbData if user logs out
        setDbData(null);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [dbData]);

  return (
    <DbContext.Provider value={{ dbData, setDbData, dbPresent }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbContextProvider;
