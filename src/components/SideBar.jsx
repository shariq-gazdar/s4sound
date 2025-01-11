import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full md:w-1/4 bg-neutral-900 rounded-r-3xl lg:border-r-4 pt-5 border-green-600">
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
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-xl transition-colors ${
                  isActive ? "text-white" : "text-neutral-100/70"
                } hover:text-white`
              }
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                `text-xl transition-colors ${
                  isActive ? "text-white" : "text-neutral-100/70"
                } hover:text-white`
              }
            >
              Playlists
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Responsive Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col text-white p-5 space-y-6 gap-y-6">
          <ul className="space-y-6">
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `text-xl transition-colors ${
                    isActive ? "text-white" : "text-neutral-100/70"
                  } hover:text-white`
                }
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/playlists"
                className={({ isActive }) =>
                  `text-xl transition-colors ${
                    isActive ? "text-white" : "text-neutral-100/70"
                  } hover:text-white`
                }
              >
                Playlists
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SideBar;
