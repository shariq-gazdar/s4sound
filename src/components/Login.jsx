import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import googleImage from "../assets/google.png";

function Login({ setUser, setCount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message before new attempt

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(true);
      setCount(1);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(""); // Clear error message before new attempt
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setUser(true);
      setCount(1);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
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
