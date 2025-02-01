import React, { useState, useEffect, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDocs } from "firebase/firestore";
import googleImage from "../assets/google.png";
import { googleAuthProvider, auth, db } from "../config/firebase";
import { Link } from "react-router-dom";
import dbContext from "../context/DbContext";

function SignUp({ setUser, setCount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [exist, setExist] = useState(false);
  const { dbPresent, d } = useContext(dbContext);
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
      setCount(1);
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const signInWithGoogle = async () => {
    setErrorMessage(""); // Clear error message before new attempt
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      // Set user state after successful sign-in
      setUser(true);
      setCount(1);

      // Set userName based on email or displayName
      const userNameFromEmail = user.email.split("@")[0];
      setUserName(userNameFromEmail);

      // If userName is not set through state, attempt to use displayName
      if (!name && user.displayName) {
        setName(user.displayName);
      }

      // Add the user to Firestore after sign-in
      await addUser(userNameFromEmail);
    } catch (error) {
      setErrorMessage(
        error.message || "Google sign-in failed. Please try again."
      );
    }
  };

  const checkUser = () => {
    if (!auth.currentUser) return;
    const exists = d.some(
      (user) => user.id === auth.currentUser.email.split("@")[0]
    );
    setExist(exists);
  };
  const addUser = async (userNameFromEmail) => {
    checkUser();
    if (!dbPresent) {
      console.warn("Database not available. User not added.");
      return;
    }

    try {
      if (exist) {
        console.warn("User already exists in Firestore.");
        return;
      }

      const userToAdd = {
        name: name || auth.currentUser?.displayName || "Anonymous User",
        email: auth.currentUser?.email || email,
        favorites: [],
      };
      const docRef = doc(db, "users", userNameFromEmail);
      await setDoc(docRef, userToAdd, { merge: true }); // Merge to avoid overwriting
      console.log("User added/updated successfully.");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.email.split("@")[0]);
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated && userName) {
      addUser();
    }
  }, [isAuthenticated, userName]);

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

      <div className="flex flex-col gap-y-3 w-72 items-center">
        <button
          className="bg-white p-3 rounded-lg font-bold w-full"
          onClick={signUp}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 p-3 rounded-lg font-bold flex items-center justify-center w-full"
          onClick={signInWithGoogle}
        >
          Sign In with Google
          <img src={googleImage} alt="Google" className="w-6 ml-2" />
        </button>
        <h1 className="text-white">
          Already have an account{" "}
          <Link to="/login" className="text-blue-500">
            login
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default SignUp;
