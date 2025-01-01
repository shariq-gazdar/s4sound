import React, { useState } from "react";
import Logo from "../assets/Logo.png";

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:w-1/4 bg-neutral-900 rounded-r-3xl lg:border-r-4 border-green-600 pt-5">
      {/* Logo and Menu Button */}
      <div className="flex items-center justify-between p-4">
        <img src={Logo} alt="App Logo" className="lg:w-44 w-20" />
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
        } md:block`}
      >
        <ul className="space-y-6">
          <li>
            <a
              href="#"
              className="text-neutral-100/70 hover:text-white transition-colors text-xl"
            >
              Artist
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-neutral-100/70 hover:text-white transition-colors text-xl"
            >
              Tracks
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-neutral-100/70 hover:text-white transition-colors text-xl"
            >
              Albums
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-neutral-100/70 hover:text-white transition-colors text-xl"
            >
              Import
            </a>
          </li>
        </ul>
      </div>

      {/* Responsive Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-800 text-white p-4 space-y-6">
          <ul className="space-y-6">
            <li>
              <a
                href="#"
                className="text-neutral-100/70 hover:text-white transition-colors text-xl"
              >
                Artist
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/70 hover:text-white transition-colors text-xl"
              >
                Tracks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/70 hover:text-white transition-colors text-xl"
              >
                Albums
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-100/70 hover:text-white transition-colors text-xl"
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
