import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
import Player from "./Mainpage/Player";

function Homepage() {
  return (
    <div className="flex">
      <SideBar />
      <Mainpage />
      <Player />
    </div>
  );
}

export default Homepage;
