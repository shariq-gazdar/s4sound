import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
// import Player from "./Mainpage/Player";
import YouTubeAudioPlayer from "./YtAudioPlayer";

function Homepage({ setUser }) {
  return (
    <div className="flex">
      <SideBar />
      <Mainpage setUser={setUser} />
    </div>
  );
}

export default Homepage;
