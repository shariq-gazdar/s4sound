import React, { useState, useEffect, useContext } from "react";
import Search from "./playerAssests/search.svg";
import Close from "./playerAssests/close.png";
import dummy from "../assets/google.png";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDocs, collection } from "firebase/firestore";
import dbContext from "../context/DbContext";

function Nav({
  setSearchTerm,
  setUser,
  setResult,
  searchTerm,
  setCount,
  setInvisible,
  invisible,
}) {
  const [userName, setUserName] = useState("");
  const [url, setUrl] = useState(dummy);
  const [mobUser, setMobUser] = useState(false);
  const [icon, setIcon] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.email.split("@")[0]);
      setUrl(auth.currentUser.photoURL || dummy); // Fallback to dummy if photoURL is null/undefined
    }
  }, [auth.currentUser]);
  const API_KEY = import.meta.env.VITE_YOUTUBESEARCH_APIKEY;
  const apiUpdate = () => {
    setIcon(!icon);
    setInvisible(true);
    setResult([]);
    if (searchTerm) {
      fetch(
        `  https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&videoCategoryId=10&key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResult(data.items);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("Failed to fetch results. Please try again.");
        });
    } else {
      alert("Please Enter A Song Name");
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    setUser(false);
    setCount(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      apiUpdate();
    }
  };
  const removeSearch = () => {
    setIcon(!icon);
    setInvisible(!invisible);
    setSearchTerm("");
  };

  return (
    <nav className="flex justify-center lg:justify-between p-5 text-white items-center gap-x-10 gap-y-5 lg:gap-y-0 flex-wrap-reverse lg:flex-nowrap">
      <div className="search relative">
        <input
          type="text"
          className="border-none hover:ring-2 hover:ring-green-600 focus:outline-none w-[20rem] lg:w-[25rem] rounded-2xl bg-gray-100/10 p-2 px-4"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        {icon ? (
          <img
            src={Close}
            alt="Close Icon"
            className="absolute top-2 right-3 cursor-pointer w-6"
            onClick={removeSearch}
          />
        ) : (
          <img
            src={Search}
            alt="Search Icon"
            className="absolute top-2 right-3 cursor-pointer"
            onClick={apiUpdate}
          />
        )}
      </div>
      <div className="flex w-full lg:gap-x-3 lg:justify-end justify-between items-center">
        <div
          className="relative"
          onMouseEnter={() => setMobUser(true)}
          onMouseLeave={() => setMobUser(false)}
        >
          <img
            src={url}
            alt="User Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          {mobUser && (
            <div className="absolute top-12 bg-neutral-800 text-white px-4 py-2 rounded-md">
              {userName}
            </div>
          )}
        </div>
        <button
          className="bg-green-600 p-2 ml-0 lg:ml-10 rounded-lg"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Nav;
