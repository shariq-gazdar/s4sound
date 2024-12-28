import { useState } from "react";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import { Router } from "react-router-dom";

function App() {
  console.log(auth.currentUser);
  const [user, setUser] = useState(false);
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
