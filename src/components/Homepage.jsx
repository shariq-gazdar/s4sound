import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
import Favorites from "./Favorites";
// import Player from "./Mainpage/Player";
import YouTubeAudioPlayer from "./YtAudioPlayer";

function Homepage({ setUser }) {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Mainpage setUser={setUser} />
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Homepage;
