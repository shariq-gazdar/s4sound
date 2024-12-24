import React, { useState } from "react";
import Search from "/Coding/Repos/s4sound/src/assets/search.svg";
function Nav(props) {
  const [search, getSearch] = useState("");
  const getSearchVal = () => {
    const searchInput = document.querySelector(".search input").value;
    // console.log(searchInput);
    getSearch(searchInput);
    props.getSearchTerm(searchInput);
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
          onClick={getSearchVal}
        />
      </div>

      <h1 className="font-bold">Shairq Gazdar</h1>
    </nav>
  );
}

export default Nav;
