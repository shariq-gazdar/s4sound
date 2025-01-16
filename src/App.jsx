import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
import Favorites from "./components/Favorites";
import DbContextProvider from "./context/dbContextProvider";
import IdContextProvider from "./context/IdContextProvider";

function App() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
      setUser(currentUser); // Update user state
    });

    return () => unsubscribe();
  }, []);

  // Navigate based on authentication state when `user` changes
  useEffect(() => {
    if (user === null) {
      navigate("/signup");
    }
    // else if (user && count == 1) {
    //   navigate("/");
    // }
  }, [user, navigate]);

  return (
    <DbContextProvider>
      <div className="bg-neutral-900">
        <Routes>
          {user ? (
            <>
              {/* Authenticated routes */}
              <Route
                path="/"
                element={<Homepage setUser={setUser} setCount={setCount} />}
              />
              <Route path="/favorites" element={<Favorites />} />
            </>
          ) : (
            <>
              {/* Unauthenticated route */}
              <Route
                path="/signup"
                element={<SignUp setUser={setUser} setCount={setCount} />}
              />
            </>
          )}
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </DbContextProvider>
  );
}

export default App;
