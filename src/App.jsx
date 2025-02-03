import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Favorites from "./components/Favorites";
import DbContextProvider from "./context/DbContextProvider";
import MediaContextProvider from "./context/MediaContextProvider";
import PlaylistContextProvider from "./context/PlaylistContextProvider";
import YtMediaConsumer from "./components/YtMediaConsumer";
import Library from "./components/Library";
import Login from "./components/Login";
import Playlist from "./components/Playlist";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set persistence explicitly
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      if (
        !user &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login"
      ) {
        navigate("/signup");
      }
    }
  }, [user, isAuthChecked, location, navigate]);

  return (
    <DbContextProvider>
      <MediaContextProvider>
        <PlaylistContextProvider>
          <div className="bg-neutral-900">
            <Routes>
              {user ? (
                <>
                  {/* Authenticated routes */}
                  <Route path="/" element={<Homepage setUser={setUser} />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/library" element={<Library />} />
                  <Route
                    path="/playlist/:playlistName"
                    element={<Playlist />}
                  />
                </>
              ) : (
                <>
                  {/* Unauthenticated routes */}
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route
                    path="/signup"
                    element={<SignUp setUser={setUser} />}
                  />
                </>
              )}
              <Route path="*" element={<Homepage />} />
            </Routes>
            <YtMediaConsumer />
          </div>
        </PlaylistContextProvider>
      </MediaContextProvider>
    </DbContextProvider>
  );
}

export default App;
