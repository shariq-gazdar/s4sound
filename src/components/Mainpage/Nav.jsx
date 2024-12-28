import React, { useState } from "react";
import Search from "/Coding/Repos/s4sound/src/assets/search.svg";
import { auth } from "/Coding/Repos/s4sound/src/config/firebase";
import { signOut } from "firebase/auth";
function Nav({ setSearchTerm, setUser }) {
  const [searchVal, setSearchVal] = useState("");
  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    apiUpdating(e);
  };
  const handleSignOut = () => {
    signOut(auth);
    setUser(false);
  };
  const apiUpdating = (searchVal) => {
    console.log("Updating");
    fetch(`https://saavn.dev/api/search?query=${searchVal}`).then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
        });
      }
    );
  };
  return (
    <nav className="flex justify-center lg:justify-between p-5 text-white items-center gap-x-10 ">
      <div className="search relative">
        <input
          type="text"
          className="border-none hover:ring-2 hover:ring-green-600 focus:outline-none w-40 lg:w-80 rounded-2xl bg-gray-100/10 p-2 px-4"
          placeholder="Search"
        />
        <img
          src={Search}
          alt=""
          className="absolute top-2 right-3 cursor-pointer"
          onClick={handleSearchChange}
        />
      </div>
      <div className="flex gap-x-3 items-center">
        <img
          src={auth.currentUser.photoURL}
          alt=""
          className="w-10 rounded-full"
        />
        <h1 className="font-bold">{auth.currentUser.email}</h1>
        <button className="bg-green-600 p-2 rounded-lg" onClick={handleSignOut}>
          SignOut
        </button>
      </div>
    </nav>
  );
}

export default Nav;
