import { useState, useEffect, useContext } from "react";
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
import DbContextProvider from "./context/DbContextProvider";
import MediaContextProvider from "./context/MediaContextProvider";
import MediaContext from "./context/MediaContext";
import YtMediaConsumer from "./components/YtMediaConsumer";
import Library from "./components/Library";
import Login from "./components/Login";
function App() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Set persistence explicitly
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
    });

    return () => unsubscribe();
  }, []);

  // Navigate based on authentication state when `user` changes
  useEffect(() => {
    if (user === null) {
      navigate("/signup");
    } else if (user && count == 1) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <DbContextProvider>
      <MediaContextProvider>
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
                <Route path="/library" element={<Library />} />
                <Route path="/login" element={<Login />} />
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
          <YtMediaConsumer />
        </div>
      </MediaContextProvider>
    </DbContextProvider>
  );
}

export default App;
