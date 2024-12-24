import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
import Player from "./Mainpage/Player";

function Homepage() {
  const [searchTerm, setSearchTerm] = useState(""); // Correctly use setSearchTerm
  console.log(searchTerm, "Homepage");

  return (
    <div className="flex">
      <SideBar />
      <Mainpage getSearch={setSearchTerm} />
      <Player />
    </div>
  );
}

export default Homepage;
