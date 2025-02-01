import React from "react";
import Sidebar from "./SideBar";
import DownRow from "./DownRow";
import PlayCards from "./PlayCards";

function Playlists() {
  return (
    <div className="flex h-svh">
      <Sidebar />
      <PlayCards />
      <DownRow />
    </div>
  );
}

export default Playlists;
