import React from "react";
import fav from "./playerAssests/favorite.png";
import home from "./playerAssests/home.png";
import playList from "./playerAssests/playList.svg";
import { Link, NavLink } from "react-router-dom";

function DownRow() {
  return (
    <div className="flex fixed bottom-0 h-16 justify-around w-full border-t lg:hidden">
      {/* Home Link */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center justify-center flex-col my-5 ${
            isActive ? "text-white opacity-100" : "text-gray-500 opacity-50"
          }`
        }
      >
        <img src={home} alt="Home" className="w-8" />
        <h1>Home</h1>
      </NavLink>

      {/* Divider */}
      {/* <div className="h-full w-px bg-gray-300"></div> */}

      {/* Favorites Link */}
      <NavLink
        to="/library"
        className={({ isActive }) =>
          `flex items-center justify-center flex-col my-5 ${
            isActive ? "text-white opacity-100" : "text-gray-500 opacity-50"
          }`
        }
      >
        <img src={playList} alt="Favorites" className="w-8" />
        <h1>Library </h1>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex items-center justify-center flex-col my-5 ${
            isActive ? "text-white opacity-100" : "text-gray-500 opacity-50"
          }`
        }
      >
        <img src={fav} alt="Favorites" className="w-8" />
        <h1>Favorites</h1>
      </NavLink>
    </div>
  );
}

export default DownRow;
