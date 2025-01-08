import React, { useState } from "react";
import Search from "./playerAssests/search.svg";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
function Nav({ setSearchTerm, setUser, setResult, searchTerm }) {
  // console.log(auth.currentUser);

  const apiUpdate = () => {
    setResult([]);
    if (searchTerm) {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&videoCategoryId=10&key=AIzaSyDBFgCzwTkG7tOKIW-gm0PrN-y8TcJmQFc`
      ).then((res) => {
        res.json().then((data) => {
          console.log(data.items);
          setResult(data.items);
        });
      });
    } else {
      alert("Please Enter A Song Name");
    }
  };
  const handleSignOut = () => {
    signOut(auth);
    setUser(false);
  };

  return (
    <nav className="flex justify-center lg:justify-between p-5 text-white items-center gap-x-10 ">
      <div className="search relative">
        <input
          type="text"
          className="border-none hover:ring-2 hover:ring-green-600 focus:outline-none w-40 lg:w-80 rounded-2xl bg-gray-100/10 p-2 px-4"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={Search}
          alt=""
          className="absolute top-2 right-3 cursor-pointer"
          onClick={apiUpdate}
        />
      </div>
      <div className="flex gap-x-3 items-center">
        <img
          src={auth.currentUser.photoURL}
          alt=""
          className=" w-10 h-10 rounded-full"
        />
        <h1 className="font-bold">{auth.currentUser.email}</h1>
        <button
          className="bg-green-600 p-2 ml-10 rounded-lg"
          onClick={handleSignOut}
        >
          SignOut
        </button>
      </div>
    </nav>
  );
}

export default Nav;
