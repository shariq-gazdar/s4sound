import React from "react";
import fav from "./playerAssests/favorite.png";
import home from "./playerAssests/home.png";
import { Link } from "react-router-dom";

function DownRow() {
  return (
    <div className="flex fixed bottom-0 h-14 justify-around w-full border-t lg:hidden">
      {/* Home Link */}
      <Link to="/" className="flex items-center justify-center">
        <img src={home} alt="Home" className="w-10 " />
      </Link>

      {/* Divider */}
      <div className="h-full w-px bg-gray-300"></div>

      {/* Favorites Link */}
      <Link to="/favorites" className="flex items-center justify-center">
        <img src={fav} alt="Favorites" className="w-10 " />
      </Link>
    </div>
  );
}

export default DownRow;
