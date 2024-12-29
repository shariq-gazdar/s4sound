import { useState } from "react";
import { auth } from "./config/firebase";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import { Router } from "react-router-dom";
// https://www.googleapis.com/youtube/v3/search?part=snippet&q={}&type=video&videoCategoryId=10&key=AIzaSyDBFgCzwTkG7tOKIW-gm0PrN-y8TcJmQFc
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
