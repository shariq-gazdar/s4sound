import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set persistence explicitly
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistence set to local.");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error.message);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <Homepage setUser={setUser} />
      ) : (
        <div>
          <SignUp setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
