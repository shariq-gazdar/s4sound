import { useState } from "react";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      {auth.currentUser ? (
        <Homepage />
      ) : (
        <div>
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App;
