import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DbContext from "./DbContext";

const DbContextProvider = ({ children }) => {
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            if (doc.id === user.email.split("@")[0]) {
              setDbData(doc.data());
            }
          });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      } else {
        // Clear dbData if user logs out
        setDbData({});
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <DbContext.Provider value={{ dbData, setDbData }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbContextProvider;
