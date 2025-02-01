import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import FillFav from "./playerAssests/fillFav.png";
import playList from "./playerAssests/playList.svg";
import { motion } from "framer-motion";
function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:w-1/4 bg-zinc-800 rounded-r-xl lg:border-b-4 border-t-4 border-r-4 pt-5 border-green-600 hidden lg:block border-dashed">
      {/* Logo and Menu Button */}
      <div className="flex items-center justify-between p-4">
        <NavLink to="/">
          <img src={Logo} alt="App Logo" className="lg:w-44 w-20" />
        </NavLink>
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Sidebar Menu (Desktop and Mobile) */}
      <div
        className={`p-5 flex flex-col gap-y-6 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        } md:block hidden`}
      >
        <ul className="space-y-6">
          <motion.li whileHover={{ scale: 1.02 }}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-xl flex items-end gap-x-2 transition-colors ${
                  isActive ? "text-white" : "text-neutral-100/70"
                } hover:text-white`
              }
            >
              <span>
                <img
                  src={FillFav}
                  alt=""
                  className="inline w-7 
                "
                />
              </span>
              Favorites
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.02 }}>
            <NavLink
              to="/playlist"
              className={({ isActive }) =>
                `text-xl flex items-end gap-x-2 transition-colors ${
                  isActive ? "text-white" : "text-neutral-100/70"
                } hover:text-white`
              }
            >
              <span>
                <img
                  src={playList}
                  alt=""
                  className="inline w-7 
                "
                />
              </span>
              Playlists
            </NavLink>
          </motion.li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
