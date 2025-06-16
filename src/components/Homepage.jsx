import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SideBar from "./SideBar";
import Mainpage from "./Mainpage";
import { auth, db } from "../config/firebase";
import Favorites from "./Favorites";
// import Player from "./Mainpage/Player";
import YouTubeAudioPlayer from "./YtAudioPlayer";
import DownRow from "./DownRow";
import MediaContextProvider from "../context/MediaContextProvider";

function Homepage({ setCount }) {
  return (
    <div className="flex">
      <SideBar />
      <Mainpage setCount={setCount} />
      <DownRow />
    </div>
  );
}

export default Homepage;
