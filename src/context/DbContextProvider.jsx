import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DbContext from "./DbContext";

const DbContextProvider = ({ children }) => {
  const [dbData, setDbData] = useState(null);
  const [dbPresent, setDbPresent] = useState(false);
  const [d, setD] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const fetchUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(docs);
          setD(docs);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
      if (user) {
        try {
          const userDoc = doc(db, "users", user.email.split("@")[0]);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setDbData(docSnap.data());
            setDbPresent(true);
          } else {
            console.warn("User document not found in Firestore.");
            setDbData(null);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setDbData(null); // Reset on logout
        setDbPresent(false);
      }
    });

    return () => unsubscribe(); // ✅ Cleanup auth listener
  }, []); // ✅ Runs once when `auth` state changes

  return (
    <DbContext.Provider value={{ dbData, setDbData, dbPresent, d }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbContextProvider;
