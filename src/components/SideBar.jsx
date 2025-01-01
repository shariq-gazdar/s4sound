import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:w-1/4   bg-neutral-900 rounded-r-3xl lg:border-r-2 border-green-900 pt-3 lg:pt-5">
      {/* Logo and Menu Button */}
      <div className="flex items-center lg:justify-between p-4 justify-left gap-x-10">
        <img src={Logo} alt="App Logo" className="lg:w-44 w-20" />
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`p-5 flex flex-col gap-y-10 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        } md:block hidden`}
      >
        <ul>
          <li>
            <a href="#" className="text-neutral-100/50 hover:text-neutral-300">
              Artist
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100/50 hover:text-neutral-300">
              Tracks
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100/50 hover:text-neutral-300">
              Albums
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100/50 hover:text-neutral-300">
              Import
            </a>
          </li>
        </ul>
      </div>

      {/* Responsive Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden  text-white p-4 space-y-4 bg-neutral-800 h-full">
          <ul>
            <li>
              <a
                href="#"
                className="text-neutral-100/50 hover:text-neutral-300"
              >
                Artist
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/50 hover:text-neutral-300"
              >
                Tracks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/50 hover:text-neutral-300"
              >
                Albums
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/50 hover:text-neutral-300"
              >
                Import
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SideBar;
