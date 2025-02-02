import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider, db } from "../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import googleImage from "../assets/google.png";

function Login({ setUser, setCount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setCount(1);
      navigate("/");

      // Add user to Firestore if not already added
      const userNameFromEmail = user.email.split("@")[0];
      await addUser(userNameFromEmail, user);
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      setUser(user);
      setCount(1);
      navigate("/");

      // Add user to Firestore if not already added
      const userNameFromEmail = user.email.split("@")[0];
      await addUser(userNameFromEmail, user);
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
    }
  };

  const checkUser = async (userEmail) => {
    const userDoc = await getDoc(doc(db, "users", userEmail.split("@")[0]));
    return userDoc.exists();
  };

  const addUser = async (userNameFromEmail, user) => {
    const userExists = await checkUser(user.email);

    if (userExists) {
      console.warn("User already exists in Firestore.");
      return;
    }

    const userToAdd = {
      name: user.displayName || "Anonymous User",
      email: user.email,
      favorites: [],
    };

    try {
      await setDoc(doc(db, "users", userNameFromEmail), userToAdd);
      console.log("User added/updated successfully.");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  return (
    <div className="bg-neutral-900 flex justify-center items-center flex-col h-screen gap-y-5">
      <h1 className="text-white text-2xl font-extrabold">Login</h1>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-lg w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-lg w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex flex-col gap-y-3 w-72">
        <button
          className="bg-white p-3 rounded-lg font-bold"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-blue-500 p-3 rounded-lg font-bold flex items-center justify-center"
          onClick={handleGoogleLogin}
        >
          Sign In with Google
          <img src={googleImage} alt="Google" className="w-6 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Login;
