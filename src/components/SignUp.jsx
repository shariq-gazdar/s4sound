import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleImage from "../assets/google.png";
import { googleAuthProvider, auth } from "../config/firebase";

function SignUp({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async () => {
    setErrorMessage(""); // Clear error message before new attempt
    if (!name || !email || !password || !confirmPass) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPass) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(true);
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const signInWithGoogle = async () => {
    setErrorMessage(""); // Clear error message before new attempt
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setUser(true);
    } catch (error) {
      setErrorMessage(
        error.message || "Google sign-in failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-neutral-900 flex justify-center items-center flex-col h-screen gap-y-5">
      <h1 className="text-white text-2xl font-extrabold">Sign Up</h1>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <input
        type="text"
        placeholder="Name"
        className="p-3 rounded-lg w-72"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        className="p-3 rounded-lg w-72"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />

      <div className="flex flex-col gap-y-3 w-72">
        <button className="bg-white p-3 rounded-lg font-bold" onClick={signUp}>
          Sign Up
        </button>
        <button
          className="bg-blue-500 p-3 rounded-lg font-bold flex items-center justify-center"
          onClick={signInWithGoogle}
        >
          Sign In with Google
          <img src={googleImage} alt="Google" className="w-6 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default SignUp;
