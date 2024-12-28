import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleImage from "../assets/google.png";
import { googleAuthProvider, auth } from "../config/firebase";
function SignUp({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const signUp = async () => {
    if (password == confirmPass) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setUser(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Passwords do not match!");
    }
  };
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
    console.log(auth.currentUser);
    setUser(true);
  };
  return (
    <div className="bg-neutral-900 flex justify-center items-center flex-col h-svh gap-y-5">
      <h1 className="text-white text-2xl font-extrabold">SignUp</h1>
      <input
        type="text"
        placeholder="Name"
        className="p-3 rounded-lg"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-lg"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        className="p-3 rounded-lg"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="confirm password"
        className="p-3 rounded-lg"
        onChange={(e) => {
          setConfirmPass(e.target.value);
        }}
      />
      <div className="flex flex-col gap-y-1">
        <button className="bg-white p-2 rounded-lg" onClick={signUp}>
          SignUp
        </button>
        <button
          className="bg-blue-400 p-2 rounded-lg flex items-center"
          onClick={signInWithGoogle}
        >
          SignIn With Google
          <img src={googleImage} alt="" className="w-10 " />
        </button>
      </div>
    </div>
  );
}

export default SignUp;
