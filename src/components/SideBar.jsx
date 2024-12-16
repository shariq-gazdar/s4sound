import React from "react";
import Logo from "../assets/Logo.png";
function SideBar() {
  return (
    <div className="bg-neutral-900 w-1/4 h-svh">
      <img src={Logo} alt="" className="w-44 p-2 mx-auto" />
      <div className="Menu p-5 ">
        <ul className="flex flex-col gap-y-10">
          <li>
            <a href="#" className="text-neutral-100 hover:text-neutral-300">
              Artist
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100 hover:text-neutral-300">
              Tracks
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100 hover:text-neutral-300">
              Albums
            </a>
          </li>
          <li>
            <a href="#" className="text-neutral-100 hover:text-neutral-300">
              Import
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
